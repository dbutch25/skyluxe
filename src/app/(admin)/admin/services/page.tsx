"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import SaveButton from "@/components/admin/SaveButton";
import { Plus, Trash2, Pencil, X } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  serviceLink: string;
  requestLink: string;
  mainImageUrl: string;
  category: string;
  order: number;
}

const CATEGORIES = ["ICI-roofing","architectural-cladding","residential-roofing","repairs","waterproofing"];
const empty: Omit<Service,"id"> = { title:"", description:"", serviceLink:"", requestLink:"", mainImageUrl:"", category:"ICI-roofing", order:0 };

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = () => fetch("/api/cms/services").then(r => r.json()).then(setServices);
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    await fetch(isNew ? "/api/cms/services" : `/api/cms/services/${editing.id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    await load();
    setSaving(false); setSaved(true);
    setTimeout(() => { setSaved(false); setEditing(null); }, 1000);
  };

  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/cms/services/${id}`, { method: "DELETE" });
    setServices(s => s.filter(x => x.id !== id));
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-julius text-primary-950">Service Slider</h1>
        <button onClick={() => setEditing(empty)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm hover:bg-primary-800 transition-colors">
          <Plus size={16} /> New Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
              {s.mainImageUrl ? <Image src={s.mainImageUrl} alt={s.title} fill className="object-cover" sizes="80px" /> : <div className="w-full h-full bg-gray-100" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-julius text-primary-950 text-sm">{s.title}</p>
              <p className="text-xs text-gray-400 font-montserrat truncate">{s.description}</p>
              <span className="text-xs bg-secondary-50 text-secondary-700 rounded-full px-2 py-0.5 font-montserrat">{s.category}</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(s)} className="p-2 text-gray-400 hover:text-primary-950 transition-colors"><Pencil size={16} /></button>
              <button onClick={() => del(s.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-julius text-primary-950">{editing.id ? "Edit Service" : "New Service"}</h2>
              <button onClick={() => setEditing(null)}><X size={20} className="text-gray-400" /></button>
            </div>

            <div className="space-y-4">
              {(["title","description","serviceLink","requestLink"] as const).map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat capitalize">{field.replace(/([A-Z])/g," $1")}</label>
                  <input value={(editing as Record<string, string>)[field] ?? ""} onChange={e => setEditing(v => ({...v, [field]: e.target.value}))} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Category</label>
                <select value={editing.category ?? "ICI-roofing"} onChange={e => setEditing(v => ({...v, category: e.target.value}))} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/-/g," ")}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Order</label>
                <input type="number" value={editing.order ?? 0} onChange={e => setEditing(v => ({...v, order: Number(e.target.value)}))} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
              </div>
              <ImageUpload label="Main Image" value={editing.mainImageUrl} onChange={v => setEditing(e => ({...e, mainImageUrl: v}))} folder="skyluxe/services" />
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium disabled:opacity-50">
                {saving ? "Saving..." : saved ? "Saved!" : "Save"}
              </button>
              <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-gray-300 rounded-lg font-montserrat text-sm text-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
