"use client";

import { useState, useEffect } from "react";
import {
  AdminSection,
  TextField,
  ImageField,
  GalleryField,
  RawJsonField,
  SaveBar,
  type ImageItem,
} from "@/components/admin/Fields";

const FOLDER = "skyluxe/residential";

// Per-system galleries rendered on the residential page
const SYSTEM_GALLERIES: { field: string; label: string }[] = [
  { field: "residentialImages", label: "Overview / Flat Roofing" },
  { field: "asphaltImages", label: "Asphalt Shingles" },
  { field: "cedarImages", label: "Cedar" },
  { field: "metalsImages", label: "Metals & Copper" },
  { field: "guttersImages", label: "Gutters" },
  { field: "naturalImages", label: "Natural Slate" },
  { field: "syntheticImages", label: "Synthetic" },
];

export default function ResidentialAdminPage() {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    fetch("/api/cms/residential")
      .then((r) => r.json())
      .then((d) => {
        if (d) setForm(d);
      });
  }, []);

  const [error, setError] = useState("");

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/cms/residential", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Save failed. Nothing was changed; try again.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const str = (k: string) => (form[k] as string) ?? "";
  const gallery = (k: string) => (form[k] as ImageItem[]) ?? [];

  // The system galleries are stored as plain lists of image URLs, while the
  // gallery editor works with { url, alt } items. Convert both ways.
  const urlGallery = (k: string): ImageItem[] =>
    ((form[k] as unknown[]) ?? [])
      .map((x) => (typeof x === "string" ? x : (x as ImageItem)?.url ?? ""))
      .filter(Boolean)
      .map((url) => ({ url, alt: "" }));
  const setUrlGallery = (k: string, items: ImageItem[]) =>
    set(k, items.map((i) => i.url).filter(Boolean));

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-julius text-primary-950">
        Residential Roofing
      </h1>

      <AdminSection title="Content">
        <TextField
          label="Title"
          value={str("title")}
          onChange={(v) => set("title", v)}
          placeholder="Residential Roofing"
        />
      </AdminSection>

      <AdminSection title="Background / Hero Image">
        <ImageField
          label="Background Image"
          url={str("backgroundImageUrl")}
          alt={str("backgroundImageAlt")}
          onUrl={(v) => set("backgroundImageUrl", v)}
          onAlt={(v) => set("backgroundImageAlt", v)}
          folder={FOLDER}
        />
      </AdminSection>

      {SYSTEM_GALLERIES.map(({ field, label }) => (
        <GalleryField
          key={field}
          title={`${label} — Gallery`}
          items={urlGallery(field)}
          onChange={(v) => setUrlGallery(field, v)}
          folder={FOLDER}
          withAlt={false}
          help="Shown as a slider on the page; visitors can click a photo to view it full screen."
        />
      ))}

      <GalleryField
        title="Manufacturer Logos"
        items={gallery("carouselMImages")}
        onChange={(v) => set("carouselMImages", v)}
        folder={FOLDER}
        help="Logos shown in the scrolling Manufacturers marquee."
      />

      <RawJsonField
        form={form}
        setForm={setForm}
        open={showJson}
        onToggle={() => setShowJson((v) => !v)}
      />

      {error && (
        <p className="text-sm text-red-600 font-montserrat bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
      )}

      <SaveBar saving={saving} saved={saved} onSave={save} />
    </div>
  );
}