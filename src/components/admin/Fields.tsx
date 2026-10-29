"use client";

/**
 * Shared admin editing fields.
 *
 * These components are declared at module scope (never inside another
 * component's render) so their internal state and focus are preserved across
 * re-renders. Each service-page admin composes these instead of re-declaring
 * inline field helpers, which keeps every editor consistent and avoids the
 * "components created during render" bug.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { ChevronLeft, ChevronRight, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { uploadPhotos, type UploadProgress } from "@/lib/photo-upload";

export interface ImageItem {
  url: string;
  alt: string;
}
export interface ListSection {
  title?: string;
  items: string[];
}

// ─── Section shell ────────────────────────────────────────────────────────────

export function AdminSection({
  title,
  action,
  help,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-julius text-primary-950">{title}</h2>
        {action}
      </div>
      {help && <p className="text-xs text-gray-400 font-montserrat mb-4">{help}</p>}
      {!help && <div className="mb-4" />}
      {children}
    </section>
  );
}

// ─── Text / textarea ──────────────────────────────────────────────────────────

export function TextField({
  label,
  value,
  onChange,
  rows = 1,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
        {label}
      </label>
      {rows > 1 ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
        />
      )}
    </div>
  );
}

// ─── Single image + alt ───────────────────────────────────────────────────────

export function ImageField({
  label,
  url,
  alt,
  onUrl,
  onAlt,
  folder,
}: {
  label: string;
  url: string;
  alt: string;
  onUrl: (v: string) => void;
  onAlt: (v: string) => void;
  folder: string;
}) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm font-julius text-primary-950 mb-2">{label}</p>
      <ImageUpload value={url} onChange={onUrl} folder={folder} />
      <input
        value={alt}
        onChange={(e) => onAlt(e.target.value)}
        placeholder="Alt text (describe the image for SEO & accessibility)"
        className="mt-2 w-full px-3 py-1.5 border rounded text-sm font-montserrat"
      />
    </div>
  );
}

// ─── Gallery of {url, alt} items ──────────────────────────────────────────────

/**
 * Gallery editor with bulk upload: drop or select many photos at once. Photos
 * are resized and stripped of location data in the browser, then uploaded
 * straight to Cloudflare (see lib/photo-upload.ts).
 */
export function GalleryField({
  title,
  items,
  onChange,
  folder,
  help,
  withAlt = true,
}: {
  title: string;
  items: ImageItem[];
  onChange: (next: ImageItem[]) => void;
  folder: string;
  help?: string;
  /** Show an alt-text box per image. Off where the database only stores URLs. */
  withAlt?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  // Uploads finish after other edits may have happened; append to the latest list.
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  const uploading = !!progress && progress.done < progress.total;

  const upload = async (files: File[]) => {
    if (!files.length || uploading) return;
    try {
      const urls = await uploadPhotos(files, { folder, onProgress: setProgress });
      if (urls.length) onChange([...itemsRef.current, ...urls.map((url) => ({ url, alt: "" }))]);
    } catch (err) {
      setProgress({ done: files.length, total: files.length, failed: [err instanceof Error ? err.message : "Upload failed"] });
    }
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <AdminSection title={title} help={help}>
      <div className="space-y-4">
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            upload(Array.from(e.dataTransfer.files));
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors ${
            dragging ? "border-secondary-500 bg-secondary-50" : "border-gray-300 bg-white hover:border-gray-400"
          } ${uploading ? "cursor-wait opacity-70" : ""}`}
        >
          <Upload size={18} className="mb-1.5 text-gray-400" />
          <p className="font-montserrat text-sm text-gray-700">Drop images here, or click to choose. Select as many as you like.</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,.heic,.heif"
            className="hidden"
            onChange={(e) => {
              upload(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
          />
        </div>

        {progress && progress.total > 0 && (
          <div className="space-y-1 font-montserrat text-xs">
            <p className={uploading ? "text-gray-600" : "text-green-700"}>
              {uploading ? (
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 size={12} className="animate-spin" /> Uploading {progress.done} of {progress.total}…
                </span>
              ) : (
                `Uploaded ${progress.total - progress.failed.length} of ${progress.total}. Remember to save.`
              )}
            </p>
            {progress.failed.length > 0 && <p className="text-red-600">Couldn&apos;t upload: {progress.failed.join(", ")}</p>}
          </div>
        )}

        {items.length === 0 ? (
          <p className="text-sm text-gray-400 font-montserrat text-center">No images yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((img, i) => (
              <div key={`${img.url}-${i}`} className="rounded-lg border border-gray-200 bg-white p-1.5">
                <div className="relative aspect-4/3 overflow-hidden rounded bg-gray-100">
                  {img.url ? (
                    <Image src={img.url} alt={img.alt} fill sizes="200px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 font-montserrat">Empty</span>
                  )}
                  <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 font-montserrat text-[10px] text-white">{i + 1}</span>
                </div>
                {withAlt && (
                  <input
                    value={img.alt}
                    onChange={(e) => onChange(items.map((x, idx) => (idx === i ? { ...x, alt: e.target.value } : x)))}
                    placeholder="Alt text"
                    className="mt-1.5 w-full px-2 py-1 border rounded text-xs font-montserrat"
                  />
                )}
                <div className="mt-1 flex items-center gap-1 text-gray-400">
                  <button type="button" onClick={() => move(i, -1)} aria-label="Move earlier" className="hover:text-gray-700">
                    <ChevronLeft size={14} />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} aria-label="Move later" className="hover:text-gray-700">
                    <ChevronRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                    aria-label="Remove image"
                    className="ml-auto text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminSection>
  );
}

// ─── Checklist (listSections) ─────────────────────────────────────────────────

export function ChecklistField({
  title,
  sections,
  onChange,
  help,
  withTitles = false,
}: {
  title: string;
  sections: ListSection[];
  onChange: (next: ListSection[]) => void;
  help?: string;
  withTitles?: boolean;
}) {
  const update = (fn: (s: ListSection[]) => ListSection[]) => onChange(fn(sections));

  return (
    <AdminSection
      title={title}
      help={help}
      action={
        <button
          onClick={() => onChange([...sections, { items: [""] }])}
          className="flex items-center gap-1 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat"
        >
          <Plus size={14} /> Add Group
        </button>
      }
    >
      {sections.length === 0 && (
        <p className="text-sm text-gray-400 font-montserrat py-4 text-center border border-dashed rounded-lg">
          No items yet — click “Add Group” to start the list.
        </p>
      )}
      <div className="space-y-3">
        {sections.map((section, si) => (
          <div key={si} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-montserrat text-gray-500">
                Group {si + 1}
              </span>
              <button
                onClick={() => update((s) => s.filter((_, idx) => idx !== si))}
                className="text-red-400 hover:text-red-600"
                aria-label="Remove group"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {withTitles && (
              <input
                value={section.title ?? ""}
                onChange={(e) =>
                  update((s) =>
                    s.map((x, idx) =>
                      idx === si ? { ...x, title: e.target.value } : x
                    )
                  )
                }
                placeholder="Group heading (optional)"
                className="w-full mb-2 px-3 py-1.5 border rounded text-sm font-montserrat"
              />
            )}

            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-center gap-2 mb-2">
                <input
                  value={item}
                  onChange={(e) =>
                    update((s) =>
                      s.map((x, idx) =>
                        idx === si
                          ? {
                              ...x,
                              items: x.items.map((v, i2) =>
                                i2 === ii ? e.target.value : v
                              ),
                            }
                          : x
                      )
                    )
                  }
                  placeholder="List item"
                  className="flex-1 px-3 py-1.5 border rounded text-sm font-montserrat"
                />
                <button
                  onClick={() =>
                    update((s) =>
                      s.map((x, idx) =>
                        idx === si
                          ? { ...x, items: x.items.filter((_, i2) => i2 !== ii) }
                          : x
                      )
                    )
                  }
                  className="text-red-400"
                  aria-label="Remove item"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update((s) =>
                  s.map((x, idx) =>
                    idx === si ? { ...x, items: [...x.items, ""] } : x
                  )
                )
              }
              className="text-xs text-secondary-600 hover:text-secondary-800 font-montserrat flex items-center gap-1 mt-1"
            >
              <Plus size={12} /> Add item
            </button>
          </div>
        ))}
      </div>
    </AdminSection>
  );
}

// ─── Advanced raw-JSON escape hatch ───────────────────────────────────────────

export function RawJsonField({
  form,
  setForm,
  open,
  onToggle,
}: {
  form: Record<string, unknown>;
  setForm: (v: Record<string, unknown>) => void;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 font-montserrat"
      >
        {open ? "Hide" : "Show"} advanced (raw JSON)
      </button>
      {open && (
        <textarea
          value={JSON.stringify(form, null, 2)}
          onChange={(e) => {
            try {
              setForm(JSON.parse(e.target.value));
            } catch {
              /* ignore invalid JSON while typing */
            }
          }}
          rows={20}
          className="mt-3 w-full px-3 py-2 border rounded-lg text-xs font-mono resize-none"
        />
      )}
    </section>
  );
}

// ─── Sticky save bar ──────────────────────────────────────────────────────────

export function SaveBar({
  saving,
  saved,
  onSave,
}: {
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="flex justify-end sticky bottom-4">
      <button
        onClick={onSave}
        disabled={saving}
        className="px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50 shadow-lg"
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

// ─── Select / chips / hint ────────────────────────────────────────────────────

export function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = "— none —",
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat bg-white"
      >
        <option value="">{placeholder}</option>
        {/* Keep an unexpected legacy value visible instead of silently blanking it */}
        {value && !options.includes(value) && <option value={value}>{value} (not in list)</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Multi-select rendered as toggle chips. */
export function ChipsField({
  label,
  options,
  values,
  onChange,
}: {
  label: string;
  options: readonly string[];
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (o: string) =>
    onChange(values.includes(o) ? values.filter((v) => v !== o) : [...values, o]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 font-montserrat">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            className={`px-3 py-1 text-xs rounded-full border font-montserrat transition-colors ${
              values.includes(o)
                ? "bg-gray-800 text-white border-primary-950"
                : "border-gray-300 text-gray-600 hover:border-primary-950"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-400 font-montserrat mt-1">{children}</p>;
}
