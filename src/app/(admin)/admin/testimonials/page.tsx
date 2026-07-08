"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SaveButton from "@/components/admin/SaveButton";
import { Plus, Trash2, Pencil, X } from "lucide-react";

interface Testimonial { id: string; quote: string; name: string; imgUrl: string; order: number; }
const empty: Omit<Testimonial,"id"> = { quote:"", name:"", imgUrl:"", order:0 };

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/cms/testimonials").then(r=>r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    await fetch(isNew ? "/api/cms/testimonials" : `/api/cms/testimonials/${editing.id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    await load();
    setSaving(false);
    setTimeout(() => setEditing(null), 500);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/cms/testimonials/${id}`, { method: "DELETE" });
    setItems(t => t.filter(x => x.id !== id));
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-julius text-primary-950">Testimonials</h1>
        <button onClick={() => setEditing(empty)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm hover:bg-primary-800">
          <Plus size={16} /> New Testimonial
        </button>
      </div>

      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4">
            {t.imgUrl && <img src={t.imgUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-julius text-primary-950 text-sm mb-1">{t.name}</p>
              <p className="text-xs text-gray-500 font-montserrat line-clamp-2">{t.quote}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(t)} className="p-2 text-gray-400 hover:text-primary-950"><Pencil size={15} /></button>
              <button onClick={() => del(t.id)} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-julius text-primary-950">{editing.id ? "Edit" : "New"} Testimonial</h2>
              <button onClick={() => setEditing(null)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Name</label>
                <input value={editing.name ?? ""} onChange={e => setEditing(v => ({...v, name: e.target.value}))} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Quote</label>
                <textarea value={editing.quote ?? ""} onChange={e => setEditing(v => ({...v, quote: e.target.value}))} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Avatar URL (Google review image)</label>
                <input value={editing.imgUrl ?? ""} onChange={e => setEditing(v => ({...v, imgUrl: e.target.value}))} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" placeholder="https://lh3.googleusercontent.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Order</label>
                <input type="number" value={editing.order ?? 0} onChange={e => setEditing(v => ({...v, order: Number(e.target.value)}))} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-gray-300 rounded-lg font-montserrat text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
