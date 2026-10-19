"use client";

/**
 * Editors for the flexible project-page blocks: facts, overview paragraphs,
 * highlight, "In detail" chapters, the feature video and overview photos. Declared at module
 * scope (like Fields.tsx) so focus survives re-renders.
 */

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { PhotoPicker, PhotoSlot } from "@/components/admin/ProjectPhotos";
import { AdminSection, Hint, TextField } from "@/components/admin/Fields";
import type { Chapter, Fact, Highlight, ProjectVideo } from "@/types";
import { OVERVIEW_NONE, type OverviewSlot, type ResolvedOverviewImages } from "@/lib/overview-layout";

const addBtn = "flex items-center gap-1 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat";
const input = "w-full px-3 py-1.5 border rounded text-sm font-montserrat";

const move = <T,>(list: T[], i: number, dir: -1 | 1): T[] => {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

function RowTools({ onUp, onDown, onRemove }: { onUp: () => void; onDown: () => void; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-1 text-gray-400">
      <button type="button" onClick={onUp} aria-label="Move up" className="hover:text-gray-700"><ChevronUp size={14} /></button>
      <button type="button" onClick={onDown} aria-label="Move down" className="hover:text-gray-700"><ChevronDown size={14} /></button>
      <button type="button" onClick={onRemove} aria-label="Remove" className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
    </div>
  );
}

/** A list of strings, one input/textarea per entry. */
export function StringListField({
  values,
  onChange,
  rows = 1,
  placeholder,
  addLabel = "Add",
}: {
  values: string[];
  onChange: (next: string[]) => void;
  rows?: number;
  placeholder?: string;
  addLabel?: string;
}) {
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-start gap-2">
          {rows > 1 ? (
            <textarea
              value={v}
              rows={rows}
              placeholder={placeholder}
              onChange={(e) => onChange(values.map((x, idx) => (idx === i ? e.target.value : x)))}
              className={`${input} resize-none`}
            />
          ) : (
            <input
              value={v}
              placeholder={placeholder}
              onChange={(e) => onChange(values.map((x, idx) => (idx === i ? e.target.value : x)))}
              className={input}
            />
          )}
          <RowTools
            onUp={() => onChange(move(values, i, -1))}
            onDown={() => onChange(move(values, i, 1))}
            onRemove={() => onChange(values.filter((_, idx) => idx !== i))}
          />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...values, ""])} className={addBtn}>
        <Plus size={12} /> {addLabel}
      </button>
    </div>
  );
}

// ─── Facts strip ──────────────────────────────────────────────────────────────

export function FactsField({ facts, onChange }: { facts: Fact[]; onChange: (next: Fact[]) => void }) {
  const set = (i: number, patch: Partial<Fact>) => onChange(facts.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  return (
    <AdminSection
      title="Facts Strip"
      help="Label/value pairs under the hero, e.g. Architect → Dewson Architects, Warranty → 20-yr Soprema Platinum. City and Area are added automatically from their own fields."
      action={<button type="button" onClick={() => onChange([...facts, { label: "", value: "" }])} className={addBtn}><Plus size={14} /> Add fact</button>}
    >
      {facts.length === 0 && <p className="text-sm text-gray-400 font-montserrat py-3 text-center border border-dashed rounded-lg">No extra facts.</p>}
      <div className="space-y-2">
        {facts.map((f, i) => (
          <div key={i} className="grid grid-cols-[1fr_1.6fr_auto] items-center gap-2">
            <input value={f.label} onChange={(e) => set(i, { label: e.target.value })} placeholder="Label" className={input} />
            <input value={f.value} onChange={(e) => set(i, { value: e.target.value })} placeholder="Value" className={input} />
            <RowTools
              onUp={() => onChange(move(facts, i, -1))}
              onDown={() => onChange(move(facts, i, 1))}
              onRemove={() => onChange(facts.filter((_, idx) => idx !== i))}
            />
          </div>
        ))}
      </div>
    </AdminSection>
  );
}

// ─── Highlight ────────────────────────────────────────────────────────────────

export function HighlightField({
  value,
  onChange,
}: {
  value: Highlight | null | undefined;
  onChange: (next: Highlight | null) => void;
}) {
  const h = value ?? { label: "", title: "", body: "", imageUrl: "" };
  const set = (patch: Partial<Highlight>) => onChange({ ...h, ...patch });
  return (
    <AdminSection
      title="Highlight"
      help="Optional standout block: a signature element or a warranty. Hidden when the title is empty."
      action={value ? <button type="button" onClick={() => onChange(null)} className="text-xs text-red-500 font-montserrat">Clear</button> : undefined}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Eyebrow" value={h.label ?? ""} onChange={(v) => set({ label: v })} placeholder="Signature element" />
          <TextField label="Title" value={h.title} onChange={(v) => set({ title: v })} placeholder="Spectra colour-shifting panels" />
        </div>
        <TextField label="Text" rows={3} value={h.body ?? ""} onChange={(v) => set({ body: v })} />
        <PhotoSlot label="Image (optional)" value={h.imageUrl} onChange={(v) => set({ imageUrl: v })} />
      </div>
    </AdminSection>
  );
}

// ─── In detail chapters ───────────────────────────────────────────────────────

export function ChaptersField({
  chapters,
  onChange,
}: {
  chapters: Chapter[];
  onChange: (next: Chapter[]) => void;
}) {
  const set = (i: number, patch: Partial<Chapter>) => onChange(chapters.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  return (
    <AdminSection
      title="In Detail"
      help="Headed sections for longer write-ups. Images alternate left and right; a section without an image runs full width."
      action={<button type="button" onClick={() => onChange([...chapters, { title: "", body: [""], items: [] }])} className={addBtn}><Plus size={14} /> Add section</button>}
    >
      {chapters.length === 0 && <p className="text-sm text-gray-400 font-montserrat py-3 text-center border border-dashed rounded-lg">No sections. Short projects usually don&apos;t need any.</p>}
      <div className="space-y-4">
        {chapters.map((c, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-montserrat text-gray-500">Section {i + 1}</span>
              <RowTools
                onUp={() => onChange(move(chapters, i, -1))}
                onDown={() => onChange(move(chapters, i, 1))}
                onRemove={() => onChange(chapters.filter((_, idx) => idx !== i))}
              />
            </div>
            <TextField label="Heading" value={c.title} onChange={(v) => set(i, { title: v })} />
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Paragraphs</p>
              <StringListField rows={3} values={c.body ?? []} onChange={(v) => set(i, { body: v })} addLabel="Add paragraph" />
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">List (optional)</p>
              <StringListField values={c.items ?? []} onChange={(v) => set(i, { items: v })} addLabel="Add item" />
            </div>
            <PhotoSlot label="Image (optional)" value={c.imageUrl} onChange={(v) => set(i, { imageUrl: v })} />
          </div>
        ))}
      </div>
    </AdminSection>
  );
}

// ─── Feature video ────────────────────────────────────────────────────────────

export function FeatureVideoField({
  value,
  onChange,
}: {
  value: ProjectVideo | null | undefined;
  onChange: (next: ProjectVideo | null) => void;
}) {
  const v = value ?? { id: "", title: "", body: "", vertical: true };
  const set = (patch: Partial<ProjectVideo>) => onChange({ ...v, ...patch });
  return (
    <AdminSection title="Feature Video" help="An embedded YouTube video shown after the sequence. Separate from the drone walkthrough.">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TextField label="YouTube video" value={v.id} onChange={(x) => set({ id: x })} placeholder="Paste a YouTube link or video ID" />
            <Hint>Full links (including Shorts) are converted to the ID on save.</Hint>
          </div>
          <label className="flex items-center gap-2 text-sm font-montserrat text-gray-700 mt-6">
            <input type="checkbox" checked={v.vertical !== false} onChange={(e) => set({ vertical: e.target.checked })} />
            Vertical (Short)
          </label>
        </div>
        <TextField label="Heading" value={v.title ?? ""} onChange={(x) => set({ title: x })} />
        <TextField label="Text" rows={2} value={v.body ?? ""} onChange={(x) => set({ body: x })} />
      </div>
    </AdminSection>
  );
}

// ─── Cleaners used on save ────────────────────────────────────────────────────

const t = (s?: string | null) => (s ?? "").trim();

export const cleanStrings = (list?: string[] | null) => (list ?? []).map(t).filter(Boolean);

export const cleanFacts = (facts?: Fact[] | null): Fact[] =>
  (facts ?? []).map((f) => ({ label: t(f.label), value: t(f.value) })).filter((f) => f.label && f.value);

export const cleanChapters = (chapters?: Chapter[] | null): Chapter[] =>
  (chapters ?? [])
    .map((c) => ({
      title: t(c.title),
      body: cleanStrings(c.body),
      items: cleanStrings(c.items),
      ...(t(c.imageUrl) ? { imageUrl: t(c.imageUrl) } : {}),
    }))
    .filter((c) => c.title && (c.body.length || c.items.length));

export const cleanHighlight = (h?: Highlight | null): Highlight | null =>
  h && t(h.title)
    ? { title: t(h.title), ...(t(h.label) ? { label: t(h.label) } : {}), ...(t(h.body) ? { body: t(h.body) } : {}), ...(t(h.imageUrl) ? { imageUrl: t(h.imageUrl) } : {}) }
    : null;

// ─── Overview photos ──────────────────────────────────────────────────────────

const SOURCE_BADGE = {
  chosen: { label: "Chosen", className: "bg-gray-800 text-white" },
  auto: { label: "Auto", className: "bg-white/90 text-gray-700" },
  none: { label: "Off", className: "bg-white/90 text-gray-500" },
  empty: { label: "Empty", className: "bg-white/90 text-gray-500" },
} as const;

/**
 * One card per overview photo slot. Slots fill automatically from the project
 * photos in order; any slot can be given a specific photo or turned off.
 */
export function OverviewImagesField({
  slots,
  overrides,
  resolved,
  onChange,
}: {
  slots: OverviewSlot[];
  overrides: Record<string, string> | null | undefined;
  resolved: ResolvedOverviewImages;
  onChange: (next: Record<string, string>) => void;
}) {
  const [openSlot, setOpenSlot] = useState<string | null>(null);
  const { bySlot, sourceBySlot } = resolved;
  const active = slots.find((s) => s.id === openSlot);

  const set = (slotId: string, value: string | undefined) => {
    const next = { ...(overrides ?? {}) };
    if (value === undefined) delete next[slotId];
    else next[slotId] = value;
    onChange(next);
  };

  return (
    <AdminSection
      title="Overview Photos"
      help="Photos fill in automatically from Project Photos, in order. Click a slot to pick a specific photo, or turn it off. Slots follow paragraph positions, so reordering paragraphs keeps the photos where they are."
    >
      {slots.length === 0 ? (
        <Hint>Add a lead or overview paragraphs first.</Hint>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {slots.map((slot) => {
            const src = bySlot[slot.id];
            const source = sourceBySlot[slot.id];
            const badge = SOURCE_BADGE[source];
            return (
              <div key={slot.id} className="rounded-lg border border-gray-200 bg-white p-2">
                <button
                  type="button"
                  onClick={() => setOpenSlot(slot.id)}
                  className="relative block w-full aspect-4/3 overflow-hidden rounded bg-gray-100"
                  aria-label={`Choose photo: ${slot.label}`}
                >
                  {src ? (
                    <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-xs text-gray-400 font-montserrat">
                      {source === "none" ? "No photo" : "No photos left to fill this"}
                    </span>
                  )}
                  <span className={`absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide font-montserrat ${badge.className}`}>
                    {badge.label}
                  </span>
                </button>
                <p className="mt-1.5 text-xs text-gray-700 font-montserrat leading-snug">{slot.label}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-montserrat">
                  <button type="button" onClick={() => setOpenSlot(slot.id)} className="text-secondary-700 hover:text-secondary-900">
                    Choose
                  </button>
                  {(source === "chosen" || source === "none") && (
                    <button type="button" onClick={() => set(slot.id, undefined)} className="text-gray-500 hover:text-gray-700">
                      Use auto
                    </button>
                  )}
                  {source !== "none" && (
                    <button type="button" onClick={() => set(slot.id, OVERVIEW_NONE)} className="text-gray-500 hover:text-red-600">
                      No photo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {active && (
        <PhotoPicker
          title={`Overview photo: ${active.label}`}
          value={bySlot[active.id]}
          onSelect={(url) => set(active.id, url)}
          onClose={() => setOpenSlot(null)}
        />
      )}
    </AdminSection>
  );
}
