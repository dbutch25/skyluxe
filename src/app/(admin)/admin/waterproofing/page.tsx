"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2 } from "lucide-react";

interface AccordionItem { accordionTitle: string; accordionContent: string; }
interface GalleryItem { url: string; galleryAlt: string; }

export default function WaterproofingAdminPage() {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/waterproofing").then(r=>r.json()).then(d => { if (d) setForm(d); });
  }, []);

  const set = (key: string, val: unknown) => setForm(f => ({...f, [key]: val}));
  const accordion = (form.accordionItems as AccordionItem[]) ?? [];
  const gallery = (form.gallery as GalleryItem[]) ?? [];
  const manufacturers = (form.manufacturersGallery as GalleryItem[]) ?? [];

  const save = async () => {
    setSaving(true);
    await fetch("/api/cms/waterproofing", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-julius text-primary-950">Waterproofing</h1>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-julius text-primary-950 mb-4">Main Content</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Title</label>
            <input value={form.title as string ?? ""} onChange={e => set("title", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Description</label>
            <textarea value={form.description as string ?? ""} onChange={e => set("description", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none" />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-julius text-primary-950">Accordion Items</h2>
          <button onClick={() => set("accordionItems", [...accordion, {accordionTitle:"", accordionContent:""}])} className="flex items-center gap-1 text-xs text-secondary-700 font-montserrat"><Plus size={14}/> Add</button>
        </div>
        {accordion.map((item, i) => (
          <div key={i} className="border rounded-lg p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <input value={item.accordionTitle} onChange={e => set("accordionItems", accordion.map((x,idx)=>idx===i?{...x,accordionTitle:e.target.value}:x))} placeholder="Title" className="flex-1 px-3 py-1.5 border rounded text-sm font-montserrat" />
              <button onClick={() => set("accordionItems", accordion.filter((_,idx)=>idx!==i))} className="text-red-400"><Trash2 size={14}/></button>
            </div>
            <textarea value={item.accordionContent} onChange={e => set("accordionItems", accordion.map((x,idx)=>idx===i?{...x,accordionContent:e.target.value}:x))} placeholder="Content" rows={2} className="w-full px-3 py-1.5 border rounded text-sm font-montserrat resize-none" />
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-julius text-primary-950">Gallery</h2>
          <button onClick={() => set("gallery", [...gallery, {url:"",galleryAlt:""}])} className="flex items-center gap-1 text-xs text-secondary-700 font-montserrat"><Plus size={14}/> Add</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {gallery.map((img, i) => (
            <div key={i} className="border rounded-lg p-3">
              <ImageUpload value={img.url} onChange={v => set("gallery", gallery.map((x,idx)=>idx===i?{...x,url:v}:x))} folder="skyluxe/waterproofing" />
              <input value={img.galleryAlt} onChange={e => set("gallery", gallery.map((x,idx)=>idx===i?{...x,galleryAlt:e.target.value}:x))} placeholder="Alt text" className="mt-2 w-full px-2 py-1 border rounded text-xs font-montserrat" />
              <button onClick={() => set("gallery", gallery.filter((_,idx)=>idx!==i))} className="mt-1 text-red-400 text-xs font-montserrat flex items-center gap-1"><Trash2 size={11}/> Remove</button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-julius text-primary-950">Manufacturer Logos</h2>
          <button onClick={() => set("manufacturersGallery", [...manufacturers, {url:"",manufacturerAlt:""}])} className="flex items-center gap-1 text-xs text-secondary-700 font-montserrat"><Plus size={14}/> Add</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {manufacturers.map((img, i) => (
            <div key={i} className="border rounded-lg p-2">
              <ImageUpload value={img.url} onChange={v => set("manufacturersGallery", manufacturers.map((x,idx)=>idx===i?{...x,url:v}:x))} folder="skyluxe/manufacturers" />
              <button onClick={() => set("manufacturersGallery", manufacturers.filter((_,idx)=>idx!==i))} className="mt-1 text-red-400 text-xs font-montserrat flex items-center gap-1"><Trash2 size={11}/> Remove</button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50">
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
