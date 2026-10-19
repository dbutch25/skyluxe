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

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    setSaving(true);
    await fetch("/api/cms/residential", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const str = (k: string) => (form[k] as string) ?? "";
  const gallery = (k: string) => (form[k] as ImageItem[]) ?? [];

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
          items={gallery(field)}
          onChange={(v) => set(field, v)}
          folder={FOLDER}
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

      <SaveBar saving={saving} saved={saved} onSave={save} />
    </div>
  );
}