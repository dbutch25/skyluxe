"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, ExternalLink, Pencil, FileUp } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { ChipsField } from "@/components/admin/Fields";
import {
  PROJECT_CATEGORIES,
  PROJECT_SECTORS,
  PROJECT_SERVICES,
  PROJECT_SYSTEMS,
} from "@/lib/schemas";
import { slugify } from "@/lib/utils";
import type { Project as ProjectPage } from "@/types";

const EMPTY_FORM = {
  title: "",
  slug: "",
  imageUrl: "",
  category: [] as string[],
  sector: "",
  service: "",
  systems: [] as string[],
  year: "",
  city: "",
  latitude: "",
  longitude: "",
  order: 0,
};

/** "" → null, anything else → number (NaN is caught by the API's validation). */
const toNumberOrNull = (v: string) => (v.trim() === "" ? null : Number(v));

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectPage[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () =>
    fetch("/api/cms/project-pages").then((r) => r.json()).then(setProjects);

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      sector: form.sector || null,
      service: form.service || null,
      year: toNumberOrNull(form.year),
      city: form.city.trim() || null,
      latitude: toNumberOrNull(form.latitude),
      longitude: toNumberOrNull(form.longitude),
    };
    try {
      const res = await fetch("/api/cms/project-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const fields = Object.keys(body?.details?.fieldErrors ?? {});
        throw new Error(
          fields.length ? `Check these fields: ${fields.join(", ")}` : body?.error ?? "Could not create project"
        );
      }
      await load();
      setForm(EMPTY_FORM);
      setShowNew(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? Its listing card and detail page are both removed. This can't be undone.")) return;
    const res = await fetch(`/api/cms/project-pages/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Couldn't delete the project. Refresh the page and try again.");
      return;
    }
    setProjects((p) => p.filter((x) => x.id !== id));
  };


  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-julius text-primary-950">Projects</h1>
          <p className="text-gray-500 font-montserrat text-sm mt-1">
            Manage portfolio listings and project detail pages
          </p>
        </div>
        <div className="flex gap-2">
        <Link
          href="/admin/projects/import"
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-montserrat text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <FileUp size={16} /> Import from documents
        </Link>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 transition-colors"
        >
          <Plus size={16} /> New Project
        </button>
        </div>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="relative h-40">
              {p.imageUrl ? (
                <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="300px" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-montserrat">No image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-julius text-primary-950 text-sm">{p.title}</h3>
                {!p.published && (
                  <span className="shrink-0 text-[10px] font-montserrat font-semibold uppercase tracking-wide rounded px-1.5 py-0.5 bg-gray-100 text-gray-500">
                    Draft
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-montserrat mb-2">{p.slug}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.category?.map((c) => (
                  <span key={c} className="text-xs bg-secondary-50 text-secondary-700 rounded-full px-2 py-0.5 font-montserrat">
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="flex items-center gap-1 text-xs text-primary-950 hover:text-secondary-600 font-montserrat transition-colors"
                >
                  <Pencil size={12} /> Edit Detail
                </Link>
                <Link
                  href={`/projects/preview/${p.id}`}
                  target="_blank"
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 font-montserrat transition-colors"
                >
                  <ExternalLink size={12} /> Preview
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New project modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-julius text-primary-950 mb-5">New Project</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                />
              </div>
              <ChipsField
                label="Categories"
                options={PROJECT_CATEGORIES}
                values={form.category}
                onChange={(v) => setForm((f) => ({ ...f, category: v }))}
              />
              <ChipsField
                label="Roof systems"
                options={PROJECT_SYSTEMS}
                values={form.systems}
                onChange={(v) => setForm((f) => ({ ...f, systems: v }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Service <span className="text-gray-400 font-normal">(drives the filter chips on /projects)</span>
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat bg-white"
                >
                  <option value="">— none —</option>
                  {PROJECT_SERVICES.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Sector</label>
                  <select
                    value={form.sector}
                    onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat bg-white"
                  >
                    <option value="">—</option>
                    {PROJECT_SECTORS.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Year</label>
                  <input
                    value={form.year}
                    onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                    placeholder="2025"
                    inputMode="numeric"
                    className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">City / Area</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  placeholder="e.g. Toronto, Mississauga, Vaughan"
                  className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Map Location <span className="text-gray-400 font-normal">(optional — pin on the homepage GTA map)</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={form.latitude}
                    onChange={(e) => setForm((f) => ({ ...f, latitude: e.target.value }))}
                    placeholder="Latitude (43.65)"
                    inputMode="decimal"
                    className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                  />
                  <input
                    value={form.longitude}
                    onChange={(e) => setForm((f) => ({ ...f, longitude: e.target.value }))}
                    placeholder="Longitude (-79.38)"
                    inputMode="decimal"
                    className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                  />
                </div>
                <p className="text-xs text-gray-400 font-montserrat mt-1">
                  Tip: right-click a spot in Google Maps and click the coordinates to copy them. Leave blank to keep this project off the map.
                </p>
              </div>
              <ImageUpload
                label="Thumbnail Image"
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
                folder="skyluxe/projects"
              />
            </div>

            <p className="mt-4 text-xs text-gray-400 font-montserrat">
              New projects start as drafts. Publish them from the editor once the photos are in.
            </p>

            {error && (
              <p className="mt-4 text-sm text-red-600 font-montserrat">{error}</p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreate}
                disabled={saving || !form.title || !form.slug}
                className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create Project"}
              </button>
              <button
                onClick={() => { setShowNew(false); setError(""); }}
                className="px-4 py-2.5 border border-gray-300 rounded-lg font-montserrat text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}