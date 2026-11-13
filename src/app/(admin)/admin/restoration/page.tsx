"use client";

/**
 * Restoration page editor, laid out in the same order as the page.
 * Every field starts with the text the page currently shows; clearing a field
 * brings back its default (except the optional second heading lines and the
 * second intro paragraph, which can be left empty to hide them).
 */

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { AdminSection, GalleryField, Hint, ImageField, SaveBar, TextField, type ImageItem } from "@/components/admin/Fields";
import {
  resolveRestorationContent,
  type RestorationContent,
  type RestorationFaq,
  type RestorationItem,
} from "@/lib/restoration-content";
import type { RestorationPage } from "@/types";

const FOLDER = "skyluxe/restoration";

type TextKey = {
  [K in keyof RestorationContent]: RestorationContent[K] extends string ? K : never;
}[keyof RestorationContent];

export default function RestorationAdminPage() {
  const [c, setC] = useState<RestorationContent | null>(null);
  const [checklistText, setChecklistText] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [heroImageAlt, setHeroImageAlt] = useState("");
  const [gallery, setGallery] = useState<ImageItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cms/restoration")
      .then((r) => r.json())
      .then((d: RestorationPage | null) => {
        const content = resolveRestorationContent(d);
        setC(content);
        setChecklistText(content.checklist.join("\n"));
        setHeroImageUrl(d?.heroImageUrl ?? "");
        setHeroImageAlt(d?.heroImageAlt ?? "");
        setGallery((d?.galleryImages ?? []).map((i) => ({ url: i.url, alt: i.alt ?? "" })));
      });
  }, []);

  if (!c) return <div className="font-montserrat text-gray-500 text-sm">Loading...</div>;

  const set = <K extends keyof RestorationContent>(key: K, value: RestorationContent[K]) =>
    setC((prev) => (prev ? { ...prev, [key]: value } : prev));
  const field = (key: TextKey, label: string, rows?: number, hint?: string) => (
    <div>
      <TextField label={label} rows={rows} value={c[key]} onChange={(v) => set(key, v)} />
      {hint && <Hint>{hint}</Hint>}
    </div>
  );
  const setListItem = (key: "capabilities" | "process", i: number, patch: Partial<RestorationItem>) =>
    set(key, c[key].map((item, j) => (j === i ? { ...item, ...patch } : item)));
  const setFaq = (i: number, patch: Partial<RestorationFaq>) =>
    set("faqs", c.faqs.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  const moveFaq = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= c.faqs.length) return;
    const next = [...c.faqs];
    [next[i], next[j]] = [next[j], next[i]];
    set("faqs", next);
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const { introText, ...extras } = c;
      const res = await fetch("/api/cms/restoration", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Restoration", // required by the database; the page heading is the Hero heading below
          introText: introText.trim(),
          heroImageUrl,
          heroImageAlt: heroImageAlt.trim(),
          galleryImages: gallery.filter((g) => g.url),
          extras: {
            ...extras,
            checklist: checklistText.split("\n").map((l) => l.trim()).filter(Boolean),
            faqs: c.faqs.filter((f) => f.title.trim() && f.content.trim()),
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const fields = Object.keys(data?.details?.fieldErrors ?? {});
        throw new Error(fields.length ? `Save failed. Check: ${fields.join(", ")}` : data?.error ?? "Save failed");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const ACCENT_HINT = "Shown in colour on a second line. Leave empty for a one-line heading.";

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-julius text-primary-950">Restoration</h1>
        <p className="text-gray-500 font-montserrat text-sm mt-1">
          Sections appear in the same order as on the page. Each field shows the text the page currently displays;
          clearing a field brings back its default.
        </p>
      </div>

      <AdminSection title="1. Hero" help="The large photo at the top of the page.">
        <div className="space-y-4">
          {field("heroEyebrow", "Small line above the heading")}
          <div className="grid gap-4 md:grid-cols-2">
            {field("heroTitle", "Heading")}
            {field("heroAccent", "Heading, second line", undefined, ACCENT_HINT)}
          </div>
          {field("heroText", "Text", 2)}
          <ImageField
            label="Hero photo"
            url={heroImageUrl}
            alt={heroImageAlt}
            onUrl={setHeroImageUrl}
            onAlt={setHeroImageAlt}
            folder={FOLDER}
          />
        </div>
      </AdminSection>

      <AdminSection title="2. What is restoration" help="The light section under the hero, with the four stat boxes.">
        <div className="space-y-4">
          {field("introEyebrow", "Small line above the heading")}
          <div className="grid gap-4 md:grid-cols-2">
            {field("introTitle", "Heading")}
            {field("introAccent", "Heading, second line", undefined, ACCENT_HINT)}
          </div>
          {field("introText", "First paragraph", 4)}
          {field("introText2", "Second paragraph", 4, "Leave empty to show only the first paragraph.")}
          <div className="grid gap-4 md:grid-cols-2">
            {c.stats.map((s, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <TextField
                  label={`Stat ${i + 1}: large text`}
                  value={s.stat}
                  onChange={(v) => set("stats", c.stats.map((x, j) => (j === i ? { ...x, stat: v } : x)))}
                />
                <TextField
                  label="Label"
                  value={s.label}
                  onChange={(v) => set("stats", c.stats.map((x, j) => (j === i ? { ...x, label: v } : x)))}
                />
                <TextField
                  label="Small text"
                  value={s.sub}
                  onChange={(v) => set("stats", c.stats.map((x, j) => (j === i ? { ...x, sub: v } : x)))}
                />
              </div>
            ))}
          </div>
        </div>
      </AdminSection>

      <AdminSection title="3. Capabilities" help="The six cards. Each card keeps its drawn icon.">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {field("capabilitiesEyebrow", "Small line above the heading")}
            {field("capabilitiesTitle", "Heading")}
          </div>
          {c.capabilities.map((cap, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <TextField label={`Card ${i + 1}: title`} value={cap.title} onChange={(v) => setListItem("capabilities", i, { title: v })} />
              <TextField label="Description" rows={3} value={cap.description} onChange={(v) => setListItem("capabilities", i, { description: v })} />
            </div>
          ))}
        </div>
      </AdminSection>

      <AdminSection title="4. Full scope" help="The dark section with the checklist.">
        <div className="space-y-4">
          {field("scopeEyebrow", "Small line above the heading")}
          <div className="grid gap-4 md:grid-cols-2">
            {field("scopeTitle", "Heading")}
            {field("scopeAccent", "Heading, second line", undefined, ACCENT_HINT)}
          </div>
          {field("scopeText", "Text", 3)}
          <div>
            <TextField label="Checklist (one per line)" rows={12} value={checklistText} onChange={setChecklistText} />
            <Hint>Each line becomes a ticked item, shown in two columns.</Hint>
          </div>
        </div>
      </AdminSection>

      <AdminSection title="5. Process" help="The five numbered steps. Numbers are added automatically.">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {field("processEyebrow", "Small line above the heading")}
            {field("processTitle", "Heading")}
          </div>
          {c.process.map((step, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <TextField label={`Step ${String(i + 1).padStart(2, "0")}: title`} value={step.title} onChange={(v) => setListItem("process", i, { title: v })} />
              <TextField label="Description" rows={3} value={step.description} onChange={(v) => setListItem("process", i, { description: v })} />
            </div>
          ))}
        </div>
      </AdminSection>

      <AdminSection title="6. Gallery" help="Shown as a slider. The whole section is hidden when there are no photos.">
        <div className="grid gap-4 md:grid-cols-2">
          {field("galleryEyebrow", "Small line above the heading")}
          {field("galleryTitle", "Heading")}
        </div>
      </AdminSection>
      <GalleryField title="Gallery photos" items={gallery} onChange={setGallery} folder={FOLDER} />

      <AdminSection title="7. FAQs" help="Questions and answers. Also given to Google as FAQ data. The section is hidden when there are none.">
        <div className="space-y-4">
          {field("faqEyebrow", "Small line above the heading")}
          <div className="grid gap-4 md:grid-cols-2">
            {field("faqTitle", "Heading")}
            {field("faqAccent", "Heading, second line", undefined, ACCENT_HINT)}
          </div>
          {field("faqText", "Text", 2)}
          {c.faqs.map((f, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center justify-between">
                <p className="font-montserrat text-xs font-semibold uppercase tracking-wide text-gray-500">Question {i + 1}</p>
                <div className="flex items-center gap-2 text-gray-400">
                  <button type="button" onClick={() => moveFaq(i, -1)} aria-label="Move up" className="hover:text-gray-700"><ChevronUp size={16} /></button>
                  <button type="button" onClick={() => moveFaq(i, 1)} aria-label="Move down" className="hover:text-gray-700"><ChevronDown size={16} /></button>
                  <button type="button" onClick={() => set("faqs", c.faqs.filter((_, j) => j !== i))} aria-label="Remove question" className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
              <TextField label="Question" value={f.title} onChange={(v) => setFaq(i, { title: v })} />
              <TextField label="Answer" rows={4} value={f.content} onChange={(v) => setFaq(i, { content: v })} />
            </div>
          ))}
          <button
            type="button"
            onClick={() => set("faqs", [...c.faqs, { title: "", content: "" }])}
            className="flex items-center gap-1.5 text-sm text-secondary-700 hover:text-secondary-900 font-montserrat"
          >
            <Plus size={14} /> Add question
          </button>
        </div>
      </AdminSection>

      <AdminSection title="8. Call to action" help="The blue section at the bottom of the page.">
        <div className="space-y-4">
          {field("ctaEyebrow", "Small line above the heading")}
          <div className="grid gap-4 md:grid-cols-2">
            {field("ctaTitle", "Heading")}
            {field("ctaAccent", "Heading, second line", undefined, "Leave empty for a one-line heading.")}
          </div>
          {field("ctaText", "Text", 3)}
        </div>
      </AdminSection>

      {error && (
        <p className="text-sm text-red-600 font-montserrat bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
      )}

      <SaveBar saving={saving} saved={saved} onSave={save} />
    </div>
  );
}
