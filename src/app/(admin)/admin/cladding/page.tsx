"use client";

import { useState, useEffect } from "react";
import {
  AdminSection,
  TextField,
  GalleryField,
  ChecklistField,
  RawJsonField,
  SaveBar,
  type ImageItem,
  type ListSection,
} from "@/components/admin/Fields";

const FOLDER = "skyluxe/cladding";

export default function ArchitecturalCladdingAdminPage() {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    fetch("/api/cms/cladding")
      .then((r) => r.json())
      .then((d) => {
        if (d) setForm(d);
      });
  }, []);

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    setSaving(true);
    await fetch("/api/cms/cladding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const listSections = (form.listSections as ListSection[]) ?? [];
  const gallery = (form.galleryImages as ImageItem[]) ?? [];
  const manufacturers = (form.carouselMImages as ImageItem[]) ?? [];
  const architects = (form.carouselADImages as ImageItem[]) ?? [];

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-julius text-primary-950">
        Architectural Cladding
      </h1>

      <AdminSection title="Content">
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(form.title as string) ?? ""}
            onChange={(v) => set("title", v)}
            placeholder="Architectural Cladding"
          />
          <TextField
            label="Intro Content"
            value={(form.content as string) ?? ""}
            onChange={(v) => set("content", v)}
            rows={3}
            placeholder="Short introduction shown in the hero section."
          />
        </div>
      </AdminSection>

      <ChecklistField
        title="Specialties"
        sections={listSections}
        onChange={(v) => set("listSections", v)}
        help="The numbered “what we fabricate & install” list on the page."
      />

      <GalleryField
        title="Project Gallery"
        items={gallery}
        onChange={(v) => set("galleryImages", v)}
        folder={FOLDER}
        help="Photos shown in the project gallery grid on the page."
      />

      <AdminSection title="Partners">
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(form.extraTitle as string) ?? ""}
            onChange={(v) => set("extraTitle", v)}
            placeholder="Partners"
          />
          <TextField
            label="Section Intro"
            value={(form.extraContent as string) ?? ""}
            onChange={(v) => set("extraContent", v)}
            rows={3}
            placeholder="Short intro for the partners section."
          />
        </div>
      </AdminSection>

      <GalleryField
        title="Manufacturer Logos"
        items={manufacturers}
        onChange={(v) => set("carouselMImages", v)}
        folder={FOLDER}
        help="Logos shown in the scrolling Manufacturers marquee."
      />

      <GalleryField
        title="Architect & Designer Logos"
        items={architects}
        onChange={(v) => set("carouselADImages", v)}
        folder={FOLDER}
        help="Logos shown in the scrolling Architects & Designers marquee."
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