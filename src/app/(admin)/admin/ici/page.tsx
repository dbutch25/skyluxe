"use client";

import { useState, useEffect } from "react";
import {
  AdminSection,
  TextField,
  ImageField,
  GalleryField,
  ChecklistField,
  RawJsonField,
  SaveBar,
  type ImageItem,
  type ListSection,
} from "@/components/admin/Fields";

const FOLDER = "skyluxe/ici";

export default function ICIRoofingAdminPage() {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    fetch("/api/cms/ici")
      .then((r) => r.json())
      .then((d) => {
        if (d) setForm(d);
      });
  }, []);

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    setSaving(true);
    await fetch("/api/cms/ici", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const str = (k: string) => (form[k] as string) ?? "";
  const listSections = (form.listSections as ListSection[]) ?? [];
  const gallery = (form.galleryImages as ImageItem[]) ?? [];
  const manufacturers = (form.carouselMImages as ImageItem[]) ?? [];

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-julius text-primary-950">ICI Roofing</h1>

      <AdminSection title="Hero">
        <div className="space-y-4">
          <TextField
            label="Title"
            value={str("title")}
            onChange={(v) => set("title", v)}
            placeholder="ICI Roofing"
          />
          <TextField
            label="Intro Content"
            value={str("content")}
            onChange={(v) => set("content", v)}
            rows={3}
            placeholder="Short introduction shown in the hero section."
          />
        </div>
      </AdminSection>

      <AdminSection title="Feature Section 1">
        <div className="space-y-4">
          <TextField
            label="Heading"
            value={str("firstTitle")}
            onChange={(v) => set("firstTitle", v)}
          />
          <TextField
            label="Paragraph 1"
            value={str("firstContent")}
            onChange={(v) => set("firstContent", v)}
            rows={3}
          />
          <TextField
            label="Paragraph 2"
            value={str("secondContent")}
            onChange={(v) => set("secondContent", v)}
            rows={3}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageField
              label="First Image"
              url={str("firstImageUrl")}
              alt={str("firstImageAlt")}
              onUrl={(v) => set("firstImageUrl", v)}
              onAlt={(v) => set("firstImageAlt", v)}
              folder={FOLDER}
            />
            <ImageField
              label="Second Image"
              url={str("secondImageUrl")}
              alt={str("secondImageAlt")}
              onUrl={(v) => set("secondImageUrl", v)}
              onAlt={(v) => set("secondImageAlt", v)}
              folder={FOLDER}
            />
          </div>
        </div>
      </AdminSection>

      <AdminSection title="Technical Capabilities Section">
        <div className="space-y-4">
          <TextField
            label="Heading"
            value={str("secondTitle")}
            onChange={(v) => set("secondTitle", v)}
            placeholder="We Specialize In"
          />
          <TextField
            label="Intro Paragraph"
            value={str("thirdContent")}
            onChange={(v) => set("thirdContent", v)}
            rows={3}
          />
        </div>
      </AdminSection>

      <ChecklistField
        title="Systems We Specialize In"
        sections={listSections}
        onChange={(v) => set("listSections", v)}
        help="The numbered systems checklist. Each item becomes one entry."
      />

      <AdminSection title="Extra List Item">
        <TextField
          label="Additional item (appended to the checklist)"
          value={str("listItem")}
          onChange={(v) => set("listItem", v)}
        />
      </AdminSection>

      <GalleryField
        title="Project Gallery"
        items={gallery}
        onChange={(v) => set("galleryImages", v)}
        folder={FOLDER}
        help="Photos shown in the project gallery grid on the page."
      />

      <AdminSection title="Manufacturers">
        <TextField
          label="Section Title"
          value={str("extraTitle")}
          onChange={(v) => set("extraTitle", v)}
          placeholder="Trusted Manufacturers"
        />
      </AdminSection>

      <GalleryField
        title="Manufacturer Logos"
        items={manufacturers}
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