"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import { Plus, Trash2 } from "lucide-react";

export default function ArchitecturalCladdingAdminPage() {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/cladding").then(r=>r.json()).then(d => { if (d) setForm(d); });
  }, []);

  const set = (key: string, val: unknown) => setForm(f => ({...f, [key]: val}));

  const save = async () => {
    setSaving(true);
    await fetch("/api/cms/cladding", { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const TextField = ({ label, field, rows = 1 }: { label:string; field:string; rows?:number }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">{label}</label>
      {rows > 1 ? (
        <textarea value={form[field] as string ?? ""} onChange={e => set(field, e.target.value)} rows={rows} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none" />
      ) : (
        <input value={form[field] as string ?? ""} onChange={e => set(field, e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
      )}
    </div>
  );

  const ImageField = ({ label, urlKey, altKey, folder }: { label:string; urlKey:string; altKey:string; folder:string }) => (
    <div className="border rounded-lg p-4">
      <p className="text-sm font-julius text-primary-950 mb-2">{label}</p>
      <ImageUpload value={form[urlKey] as string} onChange={v => set(urlKey, v)} folder={folder} />
      <input value={form[altKey] as string ?? ""} onChange={e => set(altKey, e.target.value)} placeholder="Alt text" className="mt-2 w-full px-3 py-1.5 border rounded text-sm font-montserrat" />
    </div>
  );

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-julius text-primary-950">Architectural Cladding</h1>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-julius text-primary-950 mb-4">Content</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Title" field="title" />
          <TextField label="Content" field="content" rows={3} />
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-julius text-primary-950 mb-4">All Fields (JSON)</h2>
        <p className="text-xs text-gray-400 font-montserrat mb-3">Advanced: edit all fields as JSON</p>
        <textarea
          value={JSON.stringify(form, null, 2)}
          onChange={e => { try { setForm(JSON.parse(e.target.value)); } catch {} }}
          rows={20}
          className="w-full px-3 py-2 border rounded-lg text-xs font-mono resize-none"
        />
      </section>

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50">
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
