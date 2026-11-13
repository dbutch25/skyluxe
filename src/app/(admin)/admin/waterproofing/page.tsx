"use client";

/**
 * Waterproofing page editor. Laid out in the same order as the page:
 * intro, the six systems, project gallery, manufacturer logos.
 * Fields start with what the page currently shows, so editing a field
 * changes exactly that text.
 */

import { useEffect, useState } from "react";
import { AdminSection, GalleryField, Hint, SaveBar, TextField, type ImageItem } from "@/components/admin/Fields";
import {
  mergeWaterproofingSystems,
  WATERPROOFING_DESCRIPTION,
  type WaterproofingSystem,
} from "@/lib/waterproofing-content";
import type { WaterproofingPage } from "@/types";

export default function WaterproofingAdminPage() {
  const [description, setDescription] = useState("");
  const [systems, setSystems] = useState<WaterproofingSystem[]>([]);
  const [tagText, setTagText] = useState<string[]>([]);
  const [gallery, setGallery] = useState<ImageItem[]>([]);
  const [logos, setLogos] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cms/waterproofing")
      .then((r) => r.json())
      .then((d: WaterproofingPage | null) => {
        const merged = mergeWaterproofingSystems(d?.accordionItems);
        setDescription(d?.description?.trim() || WATERPROOFING_DESCRIPTION);
        setSystems(merged);
        setTagText(merged.map((s) => s.tags.join(", ")));
        setGallery((d?.gallery ?? []).map((g) => ({ url: g.url, alt: g.galleryAlt ?? "" })));
        setLogos((d?.manufacturersGallery ?? []).map((m) => ({ url: m.url, alt: m.manufacturerAlt ?? "" })));
      })
      .finally(() => setLoading(false));
  }, []);

  const setSystem = (i: number, patch: Partial<WaterproofingSystem>) =>
    setSystems((list) => list.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/cms/waterproofing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Waterproofing", // required by the database; the page heading is fixed
          description: description.trim(),
          accordionItems: systems.map((s, i) => ({
            accordionTitle: s.title.trim(),
            accordionContent: s.content.trim(),
            subtitle: s.subtitle.trim(),
            tags: tagText[i].split(",").map((t) => t.trim()).filter(Boolean),
            gallery: s.gallery.filter((g) => g.url),
          })),
          gallery: gallery.filter((g) => g.url).map((g) => ({ url: g.url, galleryAlt: g.alt })),
          manufacturersGallery: logos.filter((l) => l.url).map((l) => ({ url: l.url, manufacturerAlt: l.alt })),
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

  if (loading) return <div className="font-montserrat text-gray-500 text-sm">Loading...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-julius text-primary-950">Waterproofing</h1>
        <p className="text-gray-500 font-montserrat text-sm mt-1">
          Sections appear in the same order as on the page. Each field shows the text the page currently displays.
        </p>
      </div>

      <AdminSection title="Intro" help="The paragraph under the “Waterproofing.” heading at the top of the page.">
        <TextField label="Description" rows={4} value={description} onChange={setDescription} />
      </AdminSection>

      {systems.map((s, i) => (
        <div key={s.id} className="space-y-3">
        <AdminSection title={`${s.num} · ${s.title || "System"}`}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Title" value={s.title} onChange={(v) => setSystem(i, { title: v })} />
              <TextField label="Subtitle (small line above the title)" value={s.subtitle} onChange={(v) => setSystem(i, { subtitle: v })} />
            </div>
            <TextField label="Description" rows={4} value={s.content} onChange={(v) => setSystem(i, { content: v })} />
            <div>
              <TextField
                label="Tags"
                value={tagText[i] ?? ""}
                onChange={(v) => setTagText((list) => list.map((t, j) => (j === i ? v : t)))}
              />
              <Hint>Separate tags with commas. They show as small labels under the description.</Hint>
            </div>
          </div>
        </AdminSection>
        <GalleryField
          title={`${s.num} · Photos beside this system`}
          items={s.gallery}
          onChange={(v) => setSystem(i, { gallery: v })}
          folder="skyluxe/waterproofing"
          help="Shown as a slider beside the text. With no photos, the section shows its drawn diagram instead."
        />
        </div>
      ))}

      <GalleryField
        title="Waterproofing Projects Gallery"
        items={gallery}
        onChange={setGallery}
        folder="skyluxe/waterproofing"
        help="Shown as a slider under the systems. The section is hidden when empty."
      />

      <GalleryField
        title="Manufacturer Logos"
        items={logos}
        onChange={setLogos}
        folder="skyluxe/manufacturers"
        help="The scrolling logo strip. The section is hidden when empty."
      />

      {error && (
        <p className="text-sm text-red-600 font-montserrat bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
      )}

      <SaveBar saving={saving} saved={saved} onSave={save} />
    </div>
  );
}
