"use client";

/**
 * Architectural Cladding page editor, laid out in the same order as the page.
 * Every field starts with the text the page currently shows; clearing a field
 * brings back its default text.
 */

import { useEffect, useState } from "react";
import { AdminSection, GalleryField, Hint, SaveBar, TextField, type ImageItem } from "@/components/admin/Fields";
import { CLADDING_DEFAULTS, resolveCladdingContent, type CladdingContent } from "@/lib/cladding-content";
import { youtubeId } from "@/lib/utils";
import type { CladdingPage } from "@/types";

const FOLDER = "skyluxe/cladding";

export default function ArchitecturalCladdingAdminPage() {
  const [c, setC] = useState<CladdingContent | null>(null);
  const [specialtiesText, setSpecialtiesText] = useState("");
  const [gallery, setGallery] = useState<ImageItem[]>([]);
  const [manufacturers, setManufacturers] = useState<ImageItem[]>([]);
  const [architects, setArchitects] = useState<ImageItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cms/cladding")
      .then((r) => r.json())
      .then((d: CladdingPage | null) => {
        const content = resolveCladdingContent(d);
        setC(content);
        setSpecialtiesText(content.specialties.join("\n"));
        const images = (list?: { url: string; alt?: string | null }[]) =>
          (list ?? []).map((i) => ({ url: i.url, alt: i.alt ?? "" }));
        setGallery(images(d?.galleryImages));
        setManufacturers(images(d?.carouselMImages));
        setArchitects(images(d?.carouselADImages));
      });
  }, []);

  if (!c) return <div className="font-montserrat text-gray-500 text-sm">Loading...</div>;

  const set = <K extends keyof CladdingContent>(key: K, value: CladdingContent[K]) =>
    setC((prev) => (prev ? { ...prev, [key]: value } : prev));
  const setFact = (i: number, key: "n" | "label" | "sub", value: string) =>
    set("facts", c.facts.map((f, j) => (j === i ? { ...f, [key]: value } : f)));
  const setVideo = (i: number, value: string) => set("videos", c.videos.map((v, j) => (j === i ? value : v)));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const specialties = specialtiesText.split("\n").map((l) => l.trim()).filter(Boolean);
      const res = await fetch("/api/cms/cladding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: c.title.trim() || CLADDING_DEFAULTS.title,
          content: c.content.trim(),
          listSections: specialties.length ? [{ items: specialties }] : [],
          extraTitle: c.partnersTitle.trim(),
          extraContent: c.partnersIntro.trim(),
          galleryImages: gallery.filter((g) => g.url),
          carouselMImages: manufacturers.filter((g) => g.url),
          carouselADImages: architects.filter((g) => g.url),
          extras: {
            heroEyebrow: c.heroEyebrow.trim(),
            facts: c.facts.map((f) => ({ n: f.n.trim(), label: f.label.trim(), sub: f.sub.trim() })),
            specialtiesEyebrow: c.specialtiesEyebrow.trim(),
            specialtiesTitle: c.specialtiesTitle.trim(),
            specialtiesIntro: c.specialtiesIntro.trim(),
            videos: c.videos.map((v) => (v.trim() ? youtubeId(v) : "")),
            galleryEyebrow: c.galleryEyebrow.trim(),
            galleryTitle: c.galleryTitle.trim(),
            ctaEyebrow: c.ctaEyebrow.trim(),
            ctaTitle: c.ctaTitle.trim(),
            ctaText: c.ctaText.trim(),
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

  const videoField = (i: number, label: string) => (
    <div>
      <TextField label={label} value={c.videos[i] ?? ""} onChange={(v) => setVideo(i, v)} placeholder="Paste a YouTube link or video ID" />
      <Hint>Full links are converted to the video ID on save. Leave empty to hide this video.</Hint>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-julius text-primary-950">Architectural Cladding</h1>
        <p className="text-gray-500 font-montserrat text-sm mt-1">
          Sections appear in the same order as on the page. Each field shows the text the page currently displays;
          clearing a field brings back its default.
        </p>
      </div>

      <AdminSection title="Hero" help="The dark section at the top of the page.">
        <div className="space-y-4">
          <TextField label="Small line above the heading" value={c.heroEyebrow} onChange={(v) => set("heroEyebrow", v)} />
          <div>
            <TextField label="Heading" value={c.title} onChange={(v) => set("title", v)} />
            <Hint>A dot is added after the heading on the page.</Hint>
          </div>
          <TextField label="Intro" rows={3} value={c.content} onChange={(v) => set("content", v)} />
        </div>
      </AdminSection>

      <AdminSection title="Quick facts" help="The four boxes beside the heading. A dot is added after the large line.">
        <div className="grid gap-4 md:grid-cols-2">
          {c.facts.map((f, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <TextField label={`Box ${i + 1}: large line`} value={f.n} onChange={(v) => setFact(i, "n", v)} />
              <TextField label="Label" value={f.label} onChange={(v) => setFact(i, "label", v)} />
              <TextField label="Small text" value={f.sub} onChange={(v) => setFact(i, "sub", v)} />
            </div>
          ))}
        </div>
      </AdminSection>

      <AdminSection title="Specialties" help="The light section with the numbered list.">
        <div className="space-y-4">
          <TextField label="Small line above the heading" value={c.specialtiesEyebrow} onChange={(v) => set("specialtiesEyebrow", v)} />
          <TextField label="Heading" value={c.specialtiesTitle} onChange={(v) => set("specialtiesTitle", v)} />
          <TextField label="Paragraph" rows={3} value={c.specialtiesIntro} onChange={(v) => set("specialtiesIntro", v)} />
          <div>
            <TextField label="Specialties (one per line)" rows={10} value={specialtiesText} onChange={setSpecialtiesText} />
            <Hint>Numbered automatically on the page, in this order.</Hint>
          </div>
        </div>
      </AdminSection>

      <AdminSection title="Video 1" help="The full-width video after the specialties.">
        {videoField(0, "YouTube video")}
      </AdminSection>

      <AdminSection title="Project gallery" help="Shown as a slider. The whole section is hidden when there are no photos.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Small line above the heading" value={c.galleryEyebrow} onChange={(v) => set("galleryEyebrow", v)} />
          <TextField label="Heading" value={c.galleryTitle} onChange={(v) => set("galleryTitle", v)} />
        </div>
      </AdminSection>
      <GalleryField title="Project gallery photos" items={gallery} onChange={setGallery} folder={FOLDER} />

      <AdminSection title="Videos 2 & 3" help="Shown side by side after the gallery.">
        <div className="grid gap-4 md:grid-cols-2">
          {videoField(1, "Left video")}
          {videoField(2, "Right video")}
        </div>
      </AdminSection>

      <AdminSection title="Partners" help="The section with the two scrolling logo strips.">
        <div className="space-y-4">
          <TextField label="Small heading" value={c.partnersTitle} onChange={(v) => set("partnersTitle", v)} />
          <TextField label="Intro" rows={3} value={c.partnersIntro} onChange={(v) => set("partnersIntro", v)} />
        </div>
      </AdminSection>
      <GalleryField
        title="Manufacturer logos"
        items={manufacturers}
        onChange={setManufacturers}
        folder={FOLDER}
        help="The “Manufacturers” strip. Hidden when empty."
      />
      <GalleryField
        title="Architect & designer logos"
        items={architects}
        onChange={setArchitects}
        folder={FOLDER}
        help="The “Architects & Designers” strip. Hidden when empty."
      />

      <AdminSection title="Call to action" help="The blue section at the bottom of the page.">
        <div className="space-y-4">
          <TextField label="Small line above the heading" value={c.ctaEyebrow} onChange={(v) => set("ctaEyebrow", v)} />
          <TextField label="Heading" value={c.ctaTitle} onChange={(v) => set("ctaTitle", v)} />
          <TextField label="Text" rows={3} value={c.ctaText} onChange={(v) => set("ctaText", v)} />
        </div>
      </AdminSection>

      {error && (
        <p className="text-sm text-red-600 font-montserrat bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
      )}

      <SaveBar saving={saving} saved={saved} onSave={save} />
    </div>
  );
}
