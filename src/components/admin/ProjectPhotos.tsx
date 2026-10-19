"use client";

/**
 * Per-project photo library for the project editor.
 *
 *   <ProjectPhotosProvider>  shares the library with every field below it
 *   <PhotoLibrary />         bulk upload, order, "don't use automatically", remove
 *   <PhotoSlot />            any single-image field: pick from the library
 *   <PhotoPicker />          the picker dialog itself (also used by Overview Photos)
 */

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, EyeOff, Eye, ImagePlus, Loader2, Trash2, Upload, X } from "lucide-react";
import { AdminSection, Hint } from "@/components/admin/Fields";
import { uploadPhotos, type UploadProgress } from "@/lib/photo-upload";

// ─── Context ──────────────────────────────────────────────────────────────────

interface ProjectPhotosValue {
  library: string[];
  usage: Map<string, string[]>;
  skipped: Set<string>;
  progress: UploadProgress | null;
  /** Uploads files, adds them to the end of the library, returns their URLs. */
  upload: (files: File[]) => Promise<string[]>;
  setLibrary: (next: string[]) => void;
  setSkipped: (next: string[]) => void;
  remove: (url: string) => void;
}

const ProjectPhotosContext = createContext<ProjectPhotosValue | null>(null);

function useProjectPhotos() {
  const ctx = useContext(ProjectPhotosContext);
  if (!ctx) throw new Error("Photo fields must be inside <ProjectPhotosProvider>");
  return ctx;
}

export function ProjectPhotosProvider({
  library,
  skipped,
  usage,
  folder,
  onLibraryChange,
  onSkippedChange,
  onRemove,
  children,
}: {
  library: string[];
  skipped: string[];
  usage: Map<string, string[]>;
  folder?: string;
  onLibraryChange: (next: string[]) => void;
  onSkippedChange: (next: string[]) => void;
  /** Removes a photo from the library and from every field that uses it. */
  onRemove: (url: string) => void;
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  // Uploads finish after re-renders; read the latest library when they do.
  const libraryRef = useRef(library);
  useEffect(() => {
    libraryRef.current = library;
  }, [library]);

  const upload = async (files: File[]) => {
    try {
      const urls = await uploadPhotos(files, { folder, onProgress: setProgress });
      if (urls.length) {
        const current = libraryRef.current;
        onLibraryChange([...current, ...urls.filter((u) => !current.includes(u))]);
      }
      return urls;
    } catch (err) {
      setProgress((p) => ({ done: p?.done ?? 0, total: p?.total ?? files.length, failed: [err instanceof Error ? err.message : "Upload failed"] }));
      return [];
    }
  };

  return (
    <ProjectPhotosContext.Provider
      value={{
        library,
        usage,
        skipped: new Set(skipped),
        progress,
        upload,
        setLibrary: onLibraryChange,
        setSkipped: onSkippedChange,
        remove: onRemove,
      }}
    >
      {children}
    </ProjectPhotosContext.Provider>
  );
}

// ─── Shared bits ──────────────────────────────────────────────────────────────

function UploadStatus({ progress }: { progress: UploadProgress | null }) {
  if (!progress || progress.total === 0) return null;
  const running = progress.done < progress.total;
  return (
    <div className="space-y-1 font-montserrat text-xs">
      <p className={running ? "text-gray-600" : "text-green-700"}>
        {running ? (
          <span className="inline-flex items-center gap-1.5">
            <Loader2 size={12} className="animate-spin" /> Uploading {progress.done} of {progress.total}…
          </span>
        ) : (
          `Uploaded ${progress.total - progress.failed.length} of ${progress.total}`
        )}
      </p>
      {progress.failed.length > 0 && (
        <p className="text-red-600">Couldn&apos;t upload: {progress.failed.join(", ")}</p>
      )}
    </div>
  );
}

function UsageLine({ labels }: { labels?: string[] }) {
  if (!labels?.length) return <span className="text-gray-400">Not used</span>;
  return (
    <span className="text-gray-600" title={labels.join("\n")}>
      {labels[0]}
      {labels.length > 1 && ` +${labels.length - 1}`}
    </span>
  );
}

// ─── Library ──────────────────────────────────────────────────────────────────

export function PhotoLibrary() {
  const { library, usage, skipped, progress, upload, setLibrary, setSkipped, remove } = useProjectPhotos();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const uploading = !!progress && progress.done < progress.total;

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= library.length) return;
    const next = [...library];
    [next[i], next[j]] = [next[j], next[i]];
    setLibrary(next);
  };

  const toggleSkip = (url: string) =>
    setSkipped(skipped.has(url) ? [...skipped].filter((u) => u !== url) : [...skipped, url]);

  const handleRemove = (url: string) => {
    const used = (usage.get(url) ?? []).filter((l) => l !== "On site gallery");
    const message = used.length
      ? `This photo is used in: ${used.join(", ")}.\n\nRemove it from the project? It will be cleared from those places too.`
      : "Remove this photo from the project?";
    if (confirm(message)) remove(url);
  };

  return (
    <AdminSection
      title="Project Photos"
      help="Upload all the photos for this project here, then choose them for each image on the page. Overview photos fill in automatically in this order, and whatever isn't used anywhere shows in the On site gallery."
    >
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
            if (!uploading) upload(Array.from(e.dataTransfer.files));
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
            dragging ? "border-secondary-500 bg-secondary-50" : "border-gray-300 bg-white hover:border-gray-400"
          } ${uploading ? "cursor-wait opacity-70" : ""}`}
        >
          <Upload size={22} className="mb-2 text-gray-400" />
          <p className="font-montserrat text-sm text-gray-700">Drop photos here, or click to choose. You can select many at once.</p>
          <p className="mt-1 font-montserrat text-xs text-gray-400">
            Location and camera data are removed and large photos are resized before upload.
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,.heic,.heif"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) upload(Array.from(e.target.files));
              e.target.value = "";
            }}
          />
        </div>

        <UploadStatus progress={progress} />

        {library.length === 0 ? (
          <Hint>No photos yet.</Hint>
        ) : (
          <>
            <p className="font-montserrat text-xs text-gray-500">
              {library.length} photo{library.length === 1 ? "" : "s"}. Arrows change the order; <EyeOff size={11} className="inline" /> keeps a photo
              out of automatic placement (you can still choose it for any image).
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {library.map((url, i) => {
                const isSkipped = skipped.has(url);
                return (
                  <div key={url} className="rounded-lg border border-gray-200 bg-white p-1.5">
                    <div className={`relative aspect-4/3 overflow-hidden rounded bg-gray-100 ${isSkipped ? "opacity-40" : ""}`}>
                      <Image src={url} alt="" fill sizes="200px" className="object-cover" />
                      <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 font-montserrat text-[10px] text-white">{i + 1}</span>
                    </div>
                    <p className="mt-1 truncate font-montserrat text-[11px]">
                      {isSkipped && !usage.get(url)?.length ? <span className="text-gray-400">Not used automatically</span> : <UsageLine labels={usage.get(url)} />}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-gray-400">
                      <button type="button" onClick={() => move(i, -1)} aria-label="Move earlier" className="hover:text-gray-700"><ChevronLeft size={14} /></button>
                      <button type="button" onClick={() => move(i, 1)} aria-label="Move later" className="hover:text-gray-700"><ChevronRight size={14} /></button>
                      <button
                        type="button"
                        onClick={() => toggleSkip(url)}
                        aria-label={isSkipped ? "Use automatically" : "Don't use automatically"}
                        title={isSkipped ? "Use automatically" : "Don't use automatically"}
                        className="ml-auto hover:text-gray-700"
                      >
                        {isSkipped ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button type="button" onClick={() => handleRemove(url)} aria-label="Remove photo" className="text-red-400 hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </AdminSection>
  );
}

// ─── Picker ───────────────────────────────────────────────────────────────────

export function PhotoPicker({
  title,
  value,
  onSelect,
  onClose,
}: {
  title: string;
  value?: string | null;
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const { library, usage, progress, upload } = useProjectPhotos();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploading = !!progress && progress.done < progress.total;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
          <h2 className="font-montserrat text-base font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 font-montserrat text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <ImagePlus size={14} /> Upload more
            </button>
            <button type="button" onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,.heic,.heif"
            className="hidden"
            onChange={async (e) => {
              const files = Array.from(e.target.files ?? []);
              e.target.value = "";
              const urls = await upload(files);
              // One new photo: assume it's the one they want here.
              if (urls.length === 1) {
                onSelect(urls[0]);
                onClose();
              }
            }}
          />
        </div>

        <div className="overflow-y-auto p-5">
          <UploadStatus progress={progress} />
          {library.length === 0 ? (
            <Hint>This project has no photos yet. Use Upload more, or add them in Project Photos.</Hint>
          ) : (
            <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {library.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => {
                    onSelect(url);
                    onClose();
                  }}
                  className={`group rounded-lg border-2 p-1 text-left ${value === url ? "border-gray-800" : "border-transparent hover:border-gray-300"}`}
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded bg-gray-100">
                    <Image src={url} alt="" fill sizes="180px" className="object-cover" />
                  </div>
                  <p className="mt-1 truncate font-montserrat text-[11px]">
                    <UsageLine labels={usage.get(url)} />
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Single image field ───────────────────────────────────────────────────────

export function PhotoSlot({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value?: string | null;
  onChange: (url: string) => void;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  // Outside a project editor (e.g. the import review screen) there's no photo
  // library yet, so photo fields are simply left out.
  const hasLibrary = useContext(ProjectPhotosContext) !== null;
  if (!hasLibrary) return null;

  return (
    <div>
      <p className="mb-1 block font-montserrat text-sm font-medium text-gray-700">{label}</p>
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-4/3 w-40 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 hover:border-gray-400"
          aria-label={`Choose photo: ${label}`}
        >
          {value ? (
            <Image src={value} alt="" fill sizes="160px" className="object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-montserrat text-xs text-gray-400">Choose photo</span>
          )}
        </button>
        <div className="flex flex-col gap-1 pt-1 font-montserrat text-xs">
          <button type="button" onClick={() => setOpen(true)} className="text-left text-secondary-700 hover:text-secondary-900">
            {value ? "Change" : "Choose from project photos"}
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} className="text-left text-gray-500 hover:text-red-600">
              Remove
            </button>
          )}
          {hint && <p className="max-w-xs text-gray-400">{hint}</p>}
        </div>
      </div>
      {open && <PhotoPicker title={label} value={value} onSelect={onChange} onClose={() => setOpen(false)} />}
    </div>
  );
}
