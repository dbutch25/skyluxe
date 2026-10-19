"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Trash2, Plus } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  isFeatured: boolean;
  order: number;
}

export default function HomeAdminPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLabel, setVideoLabel] = useState("");
  const [aboutContent, setAboutContent] = useState<object | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [newGallery, setNewGallery] = useState({ title: "", slug: "", imageUrl: "", isFeatured: false, order: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/cms/home-video").then((r) => r.json()),
      fetch("/api/cms/about").then((r) => r.json()),
      fetch("/api/cms/home-gallery").then((r) => r.json()),
    ]).then(([video, about, gal]) => {
      if (video) { setVideoUrl(video.videoUrl ?? ""); setVideoLabel(video.videoLabel ?? ""); }
      if (about) setAboutContent(about.content);
      setGallery(gal ?? []);
    });
  }, []);

  const saveSection = async (section: string, body: object) => {
    setSaving((s) => ({ ...s, [section]: true }));
    const method = section === "gallery-new" ? "POST" : "PUT";
    const url = section === "gallery-new" ? "/api/cms/home-gallery" : `/api/cms/${section}`;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving((s) => ({ ...s, [section]: false }));
    setSaved((s) => ({ ...s, [section]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [section]: false })), 2000);
  };

  const deleteGalleryItem = async (id: string) => {
    await fetch(`/api/cms/home-gallery/${id}`, { method: "DELETE" });
    setGallery((g) => g.filter((i) => i.id !== id));
  };

  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl font-julius text-primary-950">Home Page</h1>

      {/* ── Home Video ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-julius text-primary-950 mb-4">Hero Video</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Video Label</label>
            <input
              value={videoLabel}
              onChange={(e) => setVideoLabel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
              placeholder="e.g. Homepage Hero"
            />
          </div>
          <ImageUpload
            label="Video File"
            value={videoUrl}
            onChange={setVideoUrl}
            folder="skyluxe/videos"
            accept="video/*"
          />
          <button
            type="button"
            onClick={() => saveSection("home-video", { videoUrl, videoLabel })}
            disabled={saving["home-video"] ?? false}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-50"
          >
            {saving["home-video"] ? "Saving..." : saved["home-video"] ? "Saved!" : "Save Video"}
          </button>
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-julius text-primary-950 mb-4">About Us (Home Section)</h2>
        <RichTextEditor
          label="Content"
          value={aboutContent}
          onChange={setAboutContent}
        />
        <div className="mt-4">
          <button
            type="button"
            onClick={() => saveSection("about", { content: aboutContent })}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 transition-colors"
          >
            {saving["about"] ? "Saving..." : saved["about"] ? "Saved!" : "Save About Content"}
          </button>
        </div>
      </section>

      {/* ── Home Gallery ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-julius text-primary-950 mb-4">Home Gallery</h2>

        {/* Existing items */}
        <div className="space-y-3 mb-6">
          {gallery.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="relative w-16 h-16 rounded overflow-hidden shrink-0">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-montserrat text-sm font-medium truncate">{item.title}</p>
                <p className="font-montserrat text-xs text-gray-400">{item.slug}</p>
                {item.isFeatured && (
                  <span className="text-xs bg-secondary-100 text-secondary-700 rounded-full px-2 py-0.5">Featured</span>
                )}
              </div>
              <button
                onClick={() => deleteGalleryItem(item.id)}
                className="text-red-400 hover:text-red-600 transition-colors shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Add new */}
        <div className="border-t pt-6">
          <h3 className="font-julius text-primary-950 text-sm mb-4">Add Gallery Item</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Title</label>
              <input
                value={newGallery.title}
                onChange={(e) => setNewGallery((n) => ({ ...n, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Slug</label>
              <input
                value={newGallery.slug}
                onChange={(e) => setNewGallery((n) => ({ ...n, slug: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Order</label>
              <input
                type="number"
                value={newGallery.order}
                onChange={(e) => setNewGallery((n) => ({ ...n, order: Number(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={newGallery.isFeatured}
                onChange={(e) => setNewGallery((n) => ({ ...n, isFeatured: e.target.checked }))}
              />
              <label htmlFor="featured" className="text-sm font-montserrat text-gray-700">Featured (large panel)</label>
            </div>
          </div>
          <ImageUpload
            label="Image"
            value={newGallery.imageUrl}
            onChange={(url) => setNewGallery((n) => ({ ...n, imageUrl: url }))}
            folder="skyluxe/gallery"
          />
          <button
            type="button"
            onClick={async () => {
              await saveSection("gallery-new", newGallery);
              const res = await fetch("/api/cms/home-gallery");
              setGallery(await res.json());
              setNewGallery({ title: "", slug: "", imageUrl: "", isFeatured: false, order: 0 });
            }}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-secondary-700 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-secondary-800 transition-colors"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
      </section>
    </div>
  );
}