"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import SaveButton from "@/components/admin/SaveButton";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ListSection { title: string; items: string[]; }
interface ProjectDetail {
  id?: string;
  title?: string;
  slug?: string;
  backgroundVideoUrl?: string;
  fallbackImageUrl?: string;
  content?: string;
  mainImageUrl?: string;
  listSections?: ListSection[];
  extraContent?: string;
  extraImageUrl?: string;
  fullWidthImageUrl?: string;
  centeredText?: string;
  images?: string[];
  carouselImages?: string[];
  firstEmbed?: string;
  secondEmbed?: string;
  thirdEmbed?: string;
}

export default function ProjectDetailEditor() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<ProjectDetail>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load project page to get slug, then load project detail
    fetch(`/api/cms/project-pages/${id}`)
      .then((r) => r.json())
      .then(async (page) => {
        if (page?.projectId) {
          const detail = await fetch(`/api/cms/projects/${page.projectId}`).then((r) => r.json());
          setForm(detail);
        } else {
          setForm({ title: page?.title, slug: page?.slug });
        }
        setLoading(false);
      });
  }, [id]);

  const set = (key: keyof ProjectDetail, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const method = form.id ? "PATCH" : "POST";
    const url = form.id ? `/api/cms/projects/${form.id}` : "/api/cms/projects";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const saved = await res.json();
    if (!form.id) {
      // Link project to project page
      await fetch(`/api/cms/project-pages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: saved.id }),
      });
      setForm(saved);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addListSection = () =>
    set("listSections", [...(form.listSections ?? []), { title: "", items: [""] }]);

  const updateSection = (i: number, key: keyof ListSection, value: string | string[]) =>
    set("listSections", form.listSections?.map((s, idx) => idx === i ? { ...s, [key]: value } : s));

  const removeSection = (i: number) =>
    set("listSections", form.listSections?.filter((_, idx) => idx !== i));

  const addSectionItem = (i: number) =>
    updateSection(i, "items", [...(form.listSections?.[i].items ?? []), ""]);

  const updateSectionItem = (si: number, ii: number, val: string) =>
    set("listSections", form.listSections?.map((s, idx) =>
      idx === si ? { ...s, items: s.items.map((item, iidx) => iidx === ii ? val : item) } : s
    ));

  const removeSectionItem = (si: number, ii: number) =>
    set("listSections", form.listSections?.map((s, idx) =>
      idx === si ? { ...s, items: s.items.filter((_, iidx) => iidx !== ii) } : s
    ));

  if (loading) return <div className="font-montserrat text-gray-500 text-sm">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-julius text-primary-950">
            {form.title ?? "Project Detail"}
          </h1>
          <p className="text-gray-400 font-montserrat text-xs mt-1">/{form.slug}</p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Hero */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-julius text-primary-950 mb-4">Hero</h2>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload label="Background Video" value={form.backgroundVideoUrl} onChange={(v) => set("backgroundVideoUrl", v)} folder="skyluxe/videos" accept="video/*" />
            <ImageUpload label="Fallback Image" value={form.fallbackImageUrl} onChange={(v) => set("fallbackImageUrl", v)} folder="skyluxe/projects" />
          </div>
        </section>

        {/* Main content */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-julius text-primary-950 mb-4">Main Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Content</label>
              <textarea value={form.content ?? ""} onChange={(e) => set("content", e.target.value)} rows={5} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none" />
            </div>
            <ImageUpload label="Main Image" value={form.mainImageUrl} onChange={(v) => set("mainImageUrl", v)} folder="skyluxe/projects" />
          </div>
        </section>

        {/* List sections */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-julius text-primary-950">List Sections</h2>
            <button onClick={addListSection} className="flex items-center gap-1 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat">
              <Plus size={14} /> Add Section
            </button>
          </div>
          <div className="space-y-4">
            {form.listSections?.map((section, si) => (
              <div key={si} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <input value={section.title} onChange={(e) => updateSection(si, "title", e.target.value)} placeholder="Section title" className="flex-1 px-3 py-1.5 border rounded text-sm font-montserrat" />
                  <button onClick={() => removeSection(si)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                <div className="space-y-2 pl-3">
                  {section.items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-2">
                      <input value={item} onChange={(e) => updateSectionItem(si, ii, e.target.value)} placeholder="List item" className="flex-1 px-3 py-1.5 border rounded text-sm font-montserrat" />
                      <button onClick={() => removeSectionItem(si, ii)} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  ))}
                  <button onClick={() => addSectionItem(si)} className="text-xs text-secondary-600 hover:text-secondary-800 font-montserrat flex items-center gap-1 mt-1">
                    <Plus size={12} /> Add item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Extra content */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-julius text-primary-950 mb-4">Extra Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Extra Content</label>
              <textarea value={form.extraContent ?? ""} onChange={(e) => set("extraContent", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload label="Extra Image" value={form.extraImageUrl} onChange={(v) => set("extraImageUrl", v)} folder="skyluxe/projects" />
              <ImageUpload label="Full Width Image" value={form.fullWidthImageUrl} onChange={(v) => set("fullWidthImageUrl", v)} folder="skyluxe/projects" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Centered Text</label>
              <textarea value={form.centeredText ?? ""} onChange={(e) => set("centeredText", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none" />
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-julius text-primary-950 mb-4">Image Gallery</h2>
          <MultiImageUpload label="Side-by-side Images" values={form.images ?? []} onChange={(v) => set("images", v)} folder="skyluxe/projects" />
          <MultiImageUpload label="Carousel Images" values={form.carouselImages ?? []} onChange={(v) => set("carouselImages", v)} folder="skyluxe/projects" />
        </section>

        {/* YouTube embeds */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-julius text-primary-950 mb-4">YouTube Embeds</h2>
          <p className="text-xs text-gray-400 font-montserrat mb-4">Paste YouTube video IDs (e.g. dQw4w9WgXcQ)</p>
          <div className="grid grid-cols-3 gap-4">
            {(["firstEmbed", "secondEmbed", "thirdEmbed"] as const).map((key, i) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Embed {i + 1}</label>
                <input value={form[key] ?? ""} onChange={(e) => set(key, e.target.value)} placeholder="Video ID" className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat" />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
