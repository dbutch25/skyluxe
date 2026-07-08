"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface ProjectPage {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: string[];
  order: number;
}

const CATEGORIES = ["ICI", "architectural cladding", "residential roofing", "waterproofing"];

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectPage[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", imageUrl: "", category: [] as string[], order: 0 });
  const [saving, setSaving] = useState(false);

  const load = () =>
    fetch("/api/cms/project-pages").then((r) => r.json()).then(setProjects);

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    setSaving(true);
    await fetch("/api/cms/project-pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    await load();
    setForm({ title: "", slug: "", imageUrl: "", category: [], order: 0 });
    setShowNew(false);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/cms/project-pages/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((x) => x.id !== id));
  };

  const toggleCategory = (cat: string) => {
    setForm((f) => ({
      ...f,
      category: f.category.includes(cat)
        ? f.category.filter((c) => c !== cat)
        : [...f.category, cat],
    }));
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
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 transition-colors"
        >
          <Plus size={16} /> New Project
        </button>
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
              <h3 className="font-julius text-primary-950 text-sm mb-1">{p.title}</h3>
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
                  href={`/projects/${p.slug}`}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-julius text-primary-950 mb-5">New Project</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-montserrat">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1 text-xs rounded-full border font-montserrat transition-colors ${
                        form.category.includes(cat)
                          ? "bg-gray-800 text-white border-primary-950"
                          : "border-gray-300 text-gray-600 hover:border-primary-950"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                />
              </div>
              <ImageUpload
                label="Thumbnail Image"
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
                folder="skyluxe/projects"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreate}
                disabled={saving || !form.title || !form.slug}
                className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create Project"}
              </button>
              <button
                onClick={() => setShowNew(false)}
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
