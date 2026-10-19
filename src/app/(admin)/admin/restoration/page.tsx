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

const FOLDER = "skyluxe/restoration";

export default function RestorationAdminPage() {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    fetch("/api/cms/restoration")
      .then((r) => r.json())
      .then((d) => {
        if (d) setForm(d);
      });
  }, []);

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    setSaving(true);
    await fetch("/api/cms/restoration", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const str = (k: string) => (form[k] as string) ?? "";
  const gallery = (form.galleryImages as ImageItem[]) ?? [];

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-julius text-primary-950">Restoration</h1>

      <AdminSection title="Content">
        <div className="space-y-4">
          <TextField
            label="Title"
            value={str("title")}
            onChange={(v) => set("title", v)}
            placeholder="Restoration"
          />
          <TextField
            label="Intro Text"
            value={str("introText")}
            onChange={(v) => set("introText", v)}
            rows={4}
            placeholder="Short introduction shown near the top of the page."
          />
        </div>
      </AdminSection>

      <AdminSection title="Hero Image">
        <ImageField
          label="Hero Image"
          url={str("heroImageUrl")}
          alt={str("heroImageAlt")}
          onUrl={(v) => set("heroImageUrl", v)}
          onAlt={(v) => set("heroImageAlt", v)}
          folder={FOLDER}
        />
      </AdminSection>

      <GalleryField
        title="Project Gallery"
        items={gallery}
        onChange={(v) => set("galleryImages", v)}
        folder={FOLDER}
        help="Photos shown in the restoration project gallery."
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