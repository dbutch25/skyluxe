"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Pencil, X, ExternalLink } from "lucide-react";

interface Career { id: string; title: string; location: string; jobType: string; applyUrl: string; active: boolean; order: number; }
const empty: Omit<Career,"id"> = { title:"", location:"Etobicoke, ON", jobType:"Full Time", applyUrl:"", active:true, order:0 };

export default function CareersAdminPage() {
  const [items, setItems] = useState<Career[]>([]);
  const [editing, setEditing] = useState<Partial<Career> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/cms/careers").then(r=>r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    await fetch(isNew ? "/api/cms/careers" : `/api/cms/careers/${editing.id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    await load();
    setSaving(false);
    setTimeout(() => setEditing(null), 500);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this listing?")) return;
    await fetch(`/api/cms/careers/${id}`, { method: "DELETE" });
    setItems(c => c.filter(x => x.id !== id));
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-julius text-primary-950">Careers</h1>
        <button onClick={() => setEditing(empty)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm hover:bg-primary-800">
          <Plus size={16} /> New Listing
        </button>
      </div>

      <div className="space-y-3">
        {items.map(c => (
          <div key={c.id} className={`bg-white rounded-xl border shadow-sm p-4 flex items-center gap-4 ${!c.active ? "opacity-50" : "border-gray-100"}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-julius text-primary-950 text-sm">{c.title}</p>
                {!c.active && <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-montserrat">Inactive</span>}
              </div>
              <p className="text-xs text-gray-400 font-montserrat">{c.location} · {c.jobType}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <a href={c.applyUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-secondary-600"><ExternalLink size={15} /></a>
              <button onClick={() => setEditing(c)} className="p-2 text-gray-400 hover:text-primary-950"><Pencil size={15} /></button>
              <button onClick={() => del(c.id)} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-julius text-primary-950">{editing.id ? "Edit" : "New"} Listing</h2>
              <button onClick={() => setEditing(null)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: "title", label: "Job Title" },
                { key: "location", label: "Location" },
                { key: "jobType", label: "Job Type" },
                { key: "applyUrl", label: "Apply URL" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">{label}</label>
                  <input value={(editing as Record<string,string>)[key] ?? ""} onChange={e => setEditing(v => ({...v, [key]: e.target.value}))} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Order</label>
                <input type="number" value={editing.order ?? 0} onChange={e => setEditing(v => ({...v, order: Number(e.target.value)}))} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" checked={editing.active ?? true} onChange={e => setEditing(v => ({...v, active: e.target.checked}))} />
                <label htmlFor="active" className="text-sm font-montserrat text-gray-700">Active listing</label>
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
