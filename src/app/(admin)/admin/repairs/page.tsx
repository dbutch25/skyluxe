"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import { Plus, Trash2 } from "lucide-react";

interface ImageItem { url: string; alt: string; }
interface ListSection { items: string[]; }

export default function RepairsAdminPage() {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/repairs").then(r => r.json()).then(d => { if (d) setForm(d); });
  }, []);

  const set = (key: string, val: unknown) => setForm(f => ({...f, [key]: val}));

  const save = async () => {
    setSaving(true);
    await fetch("/api/cms/repairs", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const images = (form.images as ImageItem[]) ?? [];
  const listSections = (form.listSections as ListSection[]) ?? [];

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-julius text-primary-950">Repairs & Maintenance</h1>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-julius text-primary-950 mb-4">Content</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Title</label>
            <input value={form.title as string ?? ""} onChange={e => set("title", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
          </div>
          {(["firstContent","secondContent","thirdContent"] as const).map(f => (
            <div key={f}>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat capitalize">{f.replace(/([A-Z])/g," $1")}</label>
              <textarea value={form[f] as string ?? ""} onChange={e => set(f, e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-julius text-primary-950 mb-4">First Image</h2>
        <ImageUpload value={form.firstImageUrl as string} onChange={v => set("firstImageUrl", v)} folder="skyluxe/repairs" />
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Alt Text</label>
          <input value={form.firstImageAlt as string ?? ""} onChange={e => set("firstImageAlt", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-julius text-primary-950">Gallery Images</h2>
          <button onClick={() => set("images", [...images, { url: "", alt: "" }])} className="flex items-center gap-1 text-xs text-secondary-700 font-montserrat">
            <Plus size={14} /> Add Image
          </button>
        </div>
        {images.map((img, i) => (
          <div key={i} className="border rounded-lg p-4 mb-3">
            <ImageUpload value={img.url} onChange={v => set("images", images.map((x, idx) => idx === i ? {...x, url: v} : x))} folder="skyluxe/repairs" />
            <div className="mt-2 flex items-center gap-2">
              <input value={img.alt} onChange={e => set("images", images.map((x, idx) => idx === i ? {...x, alt: e.target.value} : x))} placeholder="Alt text" className="flex-1 px-3 py-1.5 border rounded text-sm font-montserrat" />
              <button onClick={() => set("images", images.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-julius text-primary-950">Checklist Items</h2>
          <button onClick={() => set("listSections", [...listSections, { items: [""] }])} className="flex items-center gap-1 text-xs text-secondary-700 font-montserrat">
            <Plus size={14} /> Add Section
          </button>
        </div>
        {listSections.map((section, si) => (
          <div key={si} className="border rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-montserrat text-gray-500">Section {si + 1}</span>
              <button onClick={() => set("listSections", listSections.filter((_,idx) => idx !== si))} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-center gap-2 mb-2">
                <input value={item} onChange={e => set("listSections", listSections.map((s,idx) => idx===si ? {...s, items: s.items.map((x,i2) => i2===ii ? e.target.value : x)} : s))} className="flex-1 px-3 py-1.5 border rounded text-sm font-montserrat" />
                <button onClick={() => set("listSections", listSections.map((s,idx) => idx===si ? {...s, items: s.items.filter((_,i2) => i2!==ii)} : s))} className="text-red-400"><Trash2 size={12} /></button>
              </div>
            ))}
            <button onClick={() => set("listSections", listSections.map((s,idx) => idx===si ? {...s, items: [...s.items, ""]} : s))} className="text-xs text-secondary-600 font-montserrat flex items-center gap-1">
              <Plus size={12} /> Add item
            </button>
          </div>
        ))}
      </section>

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50">
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
