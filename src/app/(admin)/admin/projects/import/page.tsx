"use client";

/**
 * Import projects from .docx summaries (one project per document).
 *
 *   1. Files are read in the browser (mammoth) → only text is uploaded.
 *   2. /api/cms/project-import turns each into a draft (nothing saved yet).
 *   3. The admin reviews/edits each draft, then saves it.
 *   4. /api/cms/project-import/save creates the listing card + detail page.
 *
 * Photos aren't part of the import; after saving, each project links to its
 * editor to add the thumbnail, gallery and sequence images.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import {
  AdminSection,
  ChecklistField,
  ChipsField,
  Hint,
  SelectField,
  TextField,
} from "@/components/admin/Fields";
import {
  PROJECT_CATEGORIES,
  PROJECT_SECTORS,
  PROJECT_SERVICES,
  PROJECT_SYSTEMS,
} from "@/lib/schemas";
import {
  ChaptersField,
  FactsField,
  StringListField,
  cleanChapters,
  cleanFacts,
  cleanHighlight,
  cleanStrings,
} from "@/components/admin/ProjectContentFields";
import { slugify, youtubeId } from "@/lib/utils";
import { readDocx } from "@/lib/project-import/read-docx";
import type { DraftCard, DraftDetail, FieldSource, ImportDraft } from "@/lib/project-import/types";

const CONCURRENCY = 3;

type Status = "reading" | "extracting" | "ready" | "saving" | "saved" | "error";

interface ImportItem {
  key: string;
  fileName: string;
  status: Status;
  error?: string;
  draft?: ImportDraft;
  edited: string[]; // fields the admin has changed
  open: boolean;
  savedPageId?: string;
  savedSlug?: string;
}

const STATUS_LABEL: Record<Status, string> = {
  reading: "Reading document…",
  extracting: "Extracting details…",
  ready: "Ready to review",
  saving: "Saving…",
  saved: "Saved as draft",
  error: "Failed",
};

// ─── Badges ───────────────────────────────────────────────────────────────────

const BADGE: Record<FieldSource | "edited", { label: string; className: string; title: string }> = {
  document: { label: "From doc", className: "bg-green-50 text-green-700", title: "Taken directly from the document" },
  inferred: { label: "Inferred", className: "bg-blue-50 text-blue-700", title: "Chosen from your option lists based on the document" },
  written: { label: "AI-written", className: "bg-amber-50 text-amber-700", title: "Written from the document. Read it before saving." },
  missing: { label: "Not in doc", className: "bg-gray-100 text-gray-500", title: "The document doesn't mention this" },
  edited: { label: "Edited", className: "bg-gray-800 text-white", title: "You changed this value" },
};

function SourceBadge({ kind }: { kind: FieldSource | "edited" }) {
  const b = BADGE[kind];
  return (
    <span title={b.title} className={`text-[10px] font-montserrat font-semibold uppercase tracking-wide rounded px-1.5 py-0.5 ${b.className}`}>
      {b.label}
    </span>
  );
}

/** Puts the field's source badge on its label line. */
function Sourced({ kind, children }: { kind?: FieldSource | "edited"; children: React.ReactNode }) {
  return (
    <div className="relative">
      {kind && (
        <div className="absolute right-0 top-0">
          <SourceBadge kind={kind} />
        </div>
      )}
      {children}
    </div>
  );
}

// ─── Review form for one draft ────────────────────────────────────────────────

function DraftForm({
  item,
  onCard,
  onDetail,
}: {
  item: ImportItem;
  onCard: <K extends keyof DraftCard>(key: K, value: DraftCard[K]) => void;
  onDetail: <K extends keyof DraftDetail>(key: K, value: DraftDetail[K]) => void;
}) {
  const draft = item.draft!;
  const { card, detail } = draft;
  const kind = (field: string): FieldSource | "edited" | undefined =>
    item.edited.includes(field) ? "edited" : draft.sources[field];

  return (
    <div className="space-y-6">
      {draft.notes.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-medium text-amber-800 font-montserrat mb-1">
            <AlertTriangle size={14} /> Notes from the import
          </p>
          <ul className="list-disc pl-5 text-sm text-amber-800 font-montserrat space-y-0.5">
            {draft.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <AdminSection title="Listing Card">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Sourced kind={kind("title")}>
              <TextField label="Title" value={card.title} onChange={(v) => onCard("title", v)} />
            </Sourced>
            <div>
              <TextField
                label="Slug"
                value={card.slug}
                onChange={(v) => onCard("slug", v.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-{2,}/g, "-"))}
              />
              <Hint>/projects/{card.slug || "…"}</Hint>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Sourced kind={kind("city")}>
              <TextField label="City / Area" value={card.city} onChange={(v) => onCard("city", v)} />
            </Sourced>
            <Sourced kind={kind("sector")}>
              <SelectField label="Sector" value={card.sector} options={PROJECT_SECTORS} onChange={(v) => onCard("sector", v)} />
            </Sourced>
            <Sourced kind={kind("year")}>
              <TextField
                label="Year"
                value={card.year}
                onChange={(v) => onCard("year", v.replace(/\D/g, "").slice(0, 4))}
                placeholder="2025"
              />
            </Sourced>
          </div>

          <Sourced kind={kind("services")}>
            <ChipsField label="Services (first selected = main service)" options={PROJECT_SERVICES} values={card.services} onChange={(v) => onCard("services", v)} />
          </Sourced>
          <Sourced kind={kind("category")}>
            <ChipsField label="Categories" options={PROJECT_CATEGORIES} values={card.category} onChange={(v) => onCard("category", v)} />
          </Sourced>
          <Sourced kind={kind("systems")}>
            <ChipsField label="Roof systems" options={PROJECT_SYSTEMS} values={card.systems} onChange={(v) => onCard("systems", v)} />
          </Sourced>
        </div>
      </AdminSection>

      <AdminSection title="Hero & Overview" help="AI-written fields are based only on the document, but read them before saving.">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Sourced kind={kind("subtitle")}>
              <TextField label="Subtitle" value={detail.subtitle} onChange={(v) => onDetail("subtitle", v)} />
            </Sourced>
            <Sourced kind={kind("area")}>
              <TextField label="Area" value={detail.area} onChange={(v) => onDetail("area", v)} placeholder="48,000 sq ft" />
            </Sourced>
          </div>
          <Sourced kind={kind("underConstruction")}>
            <label className="flex items-center gap-2 text-sm font-montserrat text-gray-700">
              <input type="checkbox" checked={detail.underConstruction} onChange={(e) => onDetail("underConstruction", e.target.checked)} />
              Under construction
            </label>
          </Sourced>
          <Sourced kind={kind("blurb")}>
            <TextField label="Overview lead" rows={3} value={detail.blurb} onChange={(v) => onDetail("blurb", v)} />
          </Sourced>
          <Sourced kind={kind("overview")}>
            <p className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">More paragraphs</p>
            <StringListField rows={4} values={detail.overview} onChange={(v) => onDetail("overview", v)} addLabel="Add paragraph" />
          </Sourced>
          <Sourced kind={kind("videoUrl")}>
            <TextField label="Feature video (YouTube)" value={detail.videoUrl} onChange={(v) => onDetail("videoUrl", v)} />
          </Sourced>
        </div>
      </AdminSection>

      <Sourced kind={kind("facts")}>
        <FactsField facts={detail.facts} onChange={(v) => onDetail("facts", v)} />
      </Sourced>

      {detail.highlight && (
        <Sourced kind={kind("highlight")}>
          <AdminSection title="Highlight" action={<button type="button" onClick={() => onDetail("highlight", null)} className="text-xs text-red-500 font-montserrat">Remove</button>}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Eyebrow" value={detail.highlight.label ?? ""} onChange={(v) => onDetail("highlight", { ...detail.highlight!, label: v })} />
                <TextField label="Title" value={detail.highlight.title} onChange={(v) => onDetail("highlight", { ...detail.highlight!, title: v })} />
              </div>
              <TextField label="Text" rows={3} value={detail.highlight.body ?? ""} onChange={(v) => onDetail("highlight", { ...detail.highlight!, body: v })} />
            </div>
          </AdminSection>
        </Sourced>
      )}

      <Sourced kind={kind("chapters")}>
        <ChaptersField chapters={detail.chapters} onChange={(v) => onDetail("chapters", v)} />
      </Sourced>

      <Sourced kind={kind("listSections")}>
        <ChecklistField
          title="Scope of Work"
          help="Copied from the document's scope lists."
          sections={detail.listSections}
          onChange={(v) => onDetail("listSections", v)}
          withTitles
        />
      </Sourced>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const blankToNull = (v: string) => (v.trim() === "" ? null : v.trim());

async function readError(res: Response, fallback: string) {
  const data = await res.json().catch(() => ({}));
  const fields = Object.keys(data?.details?.fieldErrors ?? {});
  return fields.length ? `Check these fields: ${fields.join(", ")}` : data?.error ?? fallback;
}

export default function ProjectImportPage() {
  const [items, setItems] = useState<ImportItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const patch = (key: string, update: Partial<ImportItem> | ((i: ImportItem) => Partial<ImportItem>)) =>
    setItems((list) =>
      list.map((i) => (i.key === key ? { ...i, ...(typeof update === "function" ? update(i) : update) } : i))
    );

  // ── Extraction ──

  const processFile = async (key: string, file: File) => {
    try {
      const html = await readDocx(file);
      if (!html) throw new Error("No text found in this document");
      patch(key, { status: "extracting" });

      const res = await fetch("/api/cms/project-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, html }),
      });
      if (!res.ok) throw new Error(await readError(res, "Import failed"));
      const draft: ImportDraft = await res.json();
      patch(key, { status: "ready", draft });
    } catch (err) {
      patch(key, { status: "error", error: err instanceof Error ? err.message : "Import failed" });
    }
  };

  const addFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const files = Array.from(fileList);
    const isFirstBatch = items.length === 0;

    const newItems: ImportItem[] = files.map((f, i) => {
      const isDocx = /\.docx$/i.test(f.name);
      return {
        key: `${Date.now()}-${i}-${f.name}`,
        fileName: f.name,
        status: isDocx ? "reading" : "error",
        error: isDocx
          ? undefined
          : /\.doc$/i.test(f.name)
            ? "Old .doc format. Open it in Word and use Save As → .docx, then import again."
            : "Only .docx files can be imported.",
        edited: [],
        open: isFirstBatch && i === 0,
      };
    });
    setItems((list) => [...list, ...newItems]);

    // Small worker pool so a big batch doesn't fire every request at once.
    const queue = newItems
      .map((item, i) => ({ item, file: files[i] }))
      .filter(({ item }) => item.status === "reading");
    const worker = async () => {
      for (let job = queue.shift(); job; job = queue.shift()) {
        await processFile(job.item.key, job.file);
      }
    };
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, queue.length) }, worker));
  };

  // ── Editing ──

  const editCard = (key: string) =>
    <K extends keyof DraftCard>(field: K, value: DraftCard[K]) =>
      patch(key, (i) => ({
        draft: { ...i.draft!, card: { ...i.draft!.card, [field]: value } },
        edited: i.edited.includes(field) ? i.edited : [...i.edited, field],
      }));

  const editDetail = (key: string) =>
    <K extends keyof DraftDetail>(field: K, value: DraftDetail[K]) =>
      patch(key, (i) => ({
        draft: { ...i.draft!, detail: { ...i.draft!.detail, [field]: value } },
        edited: i.edited.includes(field) ? i.edited : [...i.edited, field],
      }));

  // ── Saving ──

  const save = async (item: ImportItem) => {
    if (!item.draft) return;
    const { card, detail } = item.draft;
    patch(item.key, { status: "saving", error: undefined });
    try {
      const res = await fetch("/api/cms/project-import/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card: {
            title: card.title.trim(),
            slug: slugify(card.slug),
            category: card.category,
            systems: card.systems,
            sector: card.sector || null,
            services: card.services,
            year: card.year ? Number(card.year) : null,
            city: blankToNull(card.city),
          },
          detail: {
            subtitle: blankToNull(detail.subtitle),
            blurb: blankToNull(detail.blurb),
            overview: cleanStrings(detail.overview),
            area: blankToNull(detail.area),
            underConstruction: detail.underConstruction,
            facts: cleanFacts(detail.facts),
            highlight: cleanHighlight(detail.highlight),
            chapters: cleanChapters(detail.chapters),
            video: detail.videoUrl.trim() ? { id: youtubeId(detail.videoUrl), vertical: /shorts\//.test(detail.videoUrl) } : null,
            listSections: detail.listSections
              .map((s) => ({
                ...(s.title?.trim() ? { title: s.title.trim() } : {}),
                items: s.items.map((x) => x.trim()).filter(Boolean),
              }))
              .filter((s) => s.items.length > 0),
          },
        }),
      });
      if (!res.ok) throw new Error(await readError(res, "Save failed"));
      const saved: { id: string; slug: string } = await res.json();
      patch(item.key, { status: "saved", open: false, savedPageId: saved.id, savedSlug: saved.slug });
    } catch (err) {
      patch(item.key, { status: "ready", open: true, error: err instanceof Error ? err.message : "Save failed" });
    }
  };

  const ready = items.filter((i) => i.status === "ready");
  const busy = items.some((i) => i.status === "reading" || i.status === "extracting" || i.status === "saving");

  const saveAll = async () => {
    // One at a time so slug clashes inside the batch are reported clearly.
    for (const item of ready) await save(item);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-julius text-primary-950">Import Projects</h1>
          <p className="text-gray-500 font-montserrat text-sm mt-1">
            One .docx summary per project. Review each draft, then save. Saved projects stay as drafts until you add photos and publish them in the editor.
          </p>
        </div>
        {ready.length > 1 && (
          <button
            onClick={saveAll}
            disabled={busy}
            className="px-4 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50"
          >
            Save all ready ({ready.length})
          </button>
        )}
      </div>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragging ? "border-secondary-500 bg-secondary-50" : "border-gray-300 bg-white hover:border-gray-400"
        }`}
      >
        <Upload size={24} className="text-gray-400 mb-2" />
        <p className="font-montserrat text-sm text-gray-700">Drop .docx files here, or click to choose</p>
        <p className="font-montserrat text-xs text-gray-400 mt-1">Each document becomes one project. You can add more at any time.</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => {
          const working = item.status === "reading" || item.status === "extracting" || item.status === "saving";
          return (
            <div key={item.key} className="rounded-xl border border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3 px-4 py-3">
                {working ? (
                  <Loader2 size={16} className="animate-spin text-gray-400" />
                ) : item.status === "saved" ? (
                  <CheckCircle2 size={16} className="text-green-600" />
                ) : item.status === "error" ? (
                  <AlertTriangle size={16} className="text-red-500" />
                ) : (
                  <FileText size={16} className="text-gray-500" />
                )}

                <button
                  type="button"
                  disabled={!item.draft || item.status === "saved"}
                  onClick={() => patch(item.key, (i) => ({ open: !i.open }))}
                  className="flex flex-1 min-w-0 items-center gap-2 text-left disabled:cursor-default"
                >
                  <span className="truncate font-montserrat text-sm font-medium text-gray-800">
                    {item.draft?.card.title ?? item.fileName}
                  </span>
                  {item.draft && <span className="truncate font-montserrat text-xs text-gray-400">{item.fileName}</span>}
                  {item.draft && item.status !== "saved" && (
                    <ChevronDown size={14} className={`shrink-0 text-gray-400 transition-transform ${item.open ? "rotate-180" : ""}`} />
                  )}
                </button>

                <span className="shrink-0 font-montserrat text-xs text-gray-500">{STATUS_LABEL[item.status]}</span>

                {item.status === "saved" && item.savedPageId && (
                  <>
                    <Link href={`/admin/projects/${item.savedPageId}`} className="shrink-0 font-montserrat text-xs font-medium text-secondary-700 hover:text-secondary-900">
                      Add photos →
                    </Link>
                    <Link href={`/projects/preview/${item.savedPageId}`} target="_blank" className="shrink-0 font-montserrat text-xs text-gray-400 hover:text-gray-600">
                      Preview
                    </Link>
                  </>
                )}

                {(item.status === "ready" || item.status === "error") && (
                  <button
                    onClick={() => setItems((list) => list.filter((i) => i.key !== item.key))}
                    className="shrink-0 text-gray-400 hover:text-red-500"
                    aria-label="Discard"
                    title="Discard"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {item.error && (
                <p className="mx-4 mb-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 font-montserrat text-sm text-red-600">
                  {item.error}
                </p>
              )}

              {item.draft && item.open && item.status !== "saved" && (
                <div className="border-t border-gray-200 p-4 space-y-4">
                  <DraftForm item={item} onCard={editCard(item.key)} onDetail={editDetail(item.key)} />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => save(item)}
                      disabled={item.status === "saving" || !item.draft.card.title.trim() || !slugify(item.draft.card.slug)}
                      className="px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50"
                    >
                      {item.status === "saving" ? "Saving…" : "Save project"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
