"use client";

/**
 * Admin editor for the homepage "What We Do" section (ServicesGrid.tsx).
 * Each service is one full-width row on the homepage, shown in list order.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  categoryLabel,
  DEFAULT_SERVICES,
  SERVICE_CATEGORIES,
  serviceImage,
  servicePoints,
} from "@/lib/service-defaults";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2, Pencil, X, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  serviceLink: string;
  requestLink: string;
  mainImageUrl: string;
  category: string;
  points: string[];
  order: number;
}


const MAX_POINTS = 8;
const MAX_DESCRIPTION = 1000;

const empty: Omit<Service, "id"> = {
  title: "",
  description: "",
  serviceLink: "",
  requestLink: "/quote",
  mainImageUrl: "",
  category: "ICI-roofing",
  points: [],
  order: 0,
};


export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const load = () =>
    fetch("/api/cms/services")
      .then((r) => r.json())
      .then((data: Service[]) =>
        setServices(data.map((s) => ({ ...s, points: s.points ?? [] })))
      );

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setError(null);
    setEditing({ ...empty, order: services.length });
  };

  const openEdit = (s: Service) => {
    setError(null);
    setEditing({ ...s, points: [...(s.points ?? [])] });
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError(null);

    const isNew = !editing.id;
    // Send only editable fields; drop blank bullet points
    const body = {
      title: editing.title ?? "",
      description: editing.description ?? "",
      serviceLink: editing.serviceLink ?? "",
      requestLink: editing.requestLink ?? "",
      mainImageUrl: editing.mainImageUrl ?? "",
      category: editing.category ?? "ICI-roofing",
      points: (editing.points ?? []).map((p) => p.trim()).filter(Boolean),
      order: editing.order ?? 0,
    };

    const res = await fetch(isNew ? "/api/cms/services" : `/api/cms/services/${editing.id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      setSaving(false);
      setError(
        res.status === 400
          ? "Some fields are missing or invalid. Title, description and both links are required."
          : "Could not save. Please try again."
      );
      return;
    }

    await load();
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setEditing(null);
    }, 1000);
  };

  /** Saves the built-in defaults as real services so they can be edited. */
  const addDefaults = async () => {
    setSeeding(true);
    try {
      for (const [i, d] of DEFAULT_SERVICES.entries()) {
        await fetch("/api/cms/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: d.title,
            description: d.description,
            serviceLink: d.serviceLink,
            requestLink: d.requestLink,
            mainImageUrl: "",
            category: d.category,
            points: servicePoints(d).points,
            order: i,
          }),
        });
      }
      await load();
    } finally {
      setSeeding(false);
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this service from the homepage?")) return;
    await fetch(`/api/cms/services/${id}`, { method: "DELETE" });
    setServices((s) => s.filter((x) => x.id !== id));
  };

  // Swap with the neighbour, then save the new positions (0, 1, 2…)
  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= services.length) return;

    const next = [...services];
    [next[index], next[target]] = [next[target], next[index]];
    const renumbered = next.map((s, i) => ({ ...s, order: i }));
    // Only save rows whose position actually changed
    const changed = renumbered.filter(
      (s) => s.order !== services.find((o) => o.id === s.id)?.order
    );

    setServices(renumbered);
    setReordering(true);
    await Promise.all(
      changed.map((s) =>
        fetch(`/api/cms/services/${s.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: s.order }),
        })
      )
    );
    setReordering(false);
  };

  // ─── Bullet point helpers ─────────────────────────────────────────────────
  const points = editing?.points ?? [];
  const setPoints = (next: string[]) => setEditing((v) => ({ ...v, points: next }));

  return (
    <div className="max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-julius text-primary-950">Homepage Services</h1>
          <p className="text-sm text-gray-500 font-montserrat mt-1">
            The &ldquo;What We Do&rdquo; section on the homepage. Each service is shown as a
            full-width row in the order below.
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm hover:bg-primary-800 transition-colors shrink-0"
        >
          <Plus size={16} /> New Service
        </button>
      </div>

      <Link
        href="/"
        target="_blank"
        className="inline-flex items-center gap-1.5 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat mb-6"
      >
        View on homepage <ExternalLink size={12} />
      </Link>

      <div className="space-y-3">
        {services.map((s, i) => (
          <div
            key={s.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
          >
            <span className="font-julius text-2xl text-secondary-200 w-8 text-center shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* The photo the homepage actually shows (own, or the category default) */}
            <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
              <Image src={serviceImage(s).url} alt={s.title} fill className="object-cover" sizes="96px" />
              {serviceImage(s).isDefault && (
                <span className="absolute bottom-0 inset-x-0 bg-black/55 text-[9px] text-white font-montserrat text-center py-0.5">
                  Default photo
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-julius text-primary-950 text-sm">{s.title}</p>
              <p className="text-xs text-gray-400 font-montserrat truncate">{s.description}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs bg-secondary-50 text-secondary-700 rounded-full px-2 py-0.5 font-montserrat">
                  {categoryLabel(s.category)}
                </span>
                <span className="text-xs text-gray-400 font-montserrat">
                  {servicePoints(s).points.length}
                  {servicePoints(s).isDefault ? " default" : ""} bullet point
                  {servicePoints(s).points.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0 || reordering}
                className="p-2 text-gray-400 hover:text-primary-950 disabled:opacity-30 transition-colors"
                aria-label={`Move ${s.title} up`}
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === services.length - 1 || reordering}
                className="p-2 text-gray-400 hover:text-primary-950 disabled:opacity-30 transition-colors"
                aria-label={`Move ${s.title} down`}
              >
                <ArrowDown size={16} />
              </button>
              <button
                onClick={() => openEdit(s)}
                className="p-2 text-gray-400 hover:text-primary-950 transition-colors"
                aria-label={`Edit ${s.title}`}
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => del(s.id)}
                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                aria-label={`Delete ${s.title}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 p-8 text-center font-montserrat">
            <p className="text-sm text-gray-500">
              No services saved yet, so the homepage is showing its {DEFAULT_SERVICES.length} built-in default services.
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Add them here to edit them. Adding even one service replaces all the defaults on the homepage.
            </p>
            <button
              onClick={addDefaults}
              disabled={seeding}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg text-sm hover:bg-primary-800 transition-colors disabled:opacity-50"
            >
              <Plus size={16} /> {seeding ? "Adding…" : `Add the ${DEFAULT_SERVICES.length} default services`}
            </button>
          </div>
        )}
      </div>

      {/* ─── Edit modal ─────────────────────────────────────────────────────── */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-julius text-primary-950">
                {editing.id ? "Edit Service" : "New Service"}
              </h2>
              <button onClick={() => setEditing(null)} aria-label="Close">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Title</label>
                  <input
                    value={editing.title ?? ""}
                    onChange={(e) => setEditing((v) => ({ ...v, title: e.target.value }))}
                    placeholder="e.g. ICI Roofing"
                    className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Category</label>
                  <select
                    value={editing.category ?? "ICI-roofing"}
                    onChange={(e) => setEditing((v) => ({ ...v, category: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                  >
                    {SERVICE_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 font-montserrat mt-1">
                    Sets the icon and the badge on the image.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Description</label>
                <textarea
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing((v) => ({ ...v, description: e.target.value }))}
                  rows={5}
                  maxLength={MAX_DESCRIPTION}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat resize-none"
                />
                <p className="text-xs text-gray-400 font-montserrat text-right">
                  {(editing.description ?? "").length}/{MAX_DESCRIPTION}
                </p>
              </div>

              {/* Bullet points */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700 font-montserrat">
                    Bullet points
                  </label>
                  <span className="text-xs text-gray-400 font-montserrat">
                    {points.length}/{MAX_POINTS}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-montserrat mb-2">
                  Short highlights shown under the description. Leave empty to use the default list for the category.
                </p>
                {points.length === 0 && (
                  <div className="mb-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                    <p className="text-xs text-gray-500 font-montserrat mb-1">The homepage will show these defaults:</p>
                    <ul className="list-disc pl-4 text-xs text-gray-500 font-montserrat space-y-0.5">
                      {servicePoints({ points: [], category: editing.category ?? "ICI-roofing" }).points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setPoints([...servicePoints({ points: [], category: editing.category ?? "ICI-roofing" }).points])}
                      className="mt-2 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat"
                    >
                      Edit these
                    </button>
                  </div>
                )}
                <div className="space-y-2">
                  {points.map((point, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-600 shrink-0" />
                      <input
                        value={point}
                        maxLength={120}
                        onChange={(e) =>
                          setPoints(points.map((p, j) => (j === i ? e.target.value : p)))
                        }
                        placeholder="e.g. 24/7 emergency leak response"
                        className="flex-1 px-3 py-2 border rounded-lg text-sm font-montserrat"
                      />
                      <button
                        onClick={() => setPoints(points.filter((_, j) => j !== i))}
                        className="p-2 text-red-400 hover:text-red-600"
                        aria-label="Remove bullet point"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                {points.length < MAX_POINTS && (
                  <button
                    onClick={() => setPoints([...points, ""])}
                    className="mt-2 flex items-center gap-1.5 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat"
                  >
                    <Plus size={14} /> Add bullet point
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                    &ldquo;Learn More&rdquo; link
                  </label>
                  <input
                    value={editing.serviceLink ?? ""}
                    onChange={(e) => setEditing((v) => ({ ...v, serviceLink: e.target.value }))}
                    placeholder="/ICI"
                    className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                    &ldquo;Request Quote&rdquo; link
                  </label>
                  <input
                    value={editing.requestLink ?? ""}
                    onChange={(e) => setEditing((v) => ({ ...v, requestLink: e.target.value }))}
                    placeholder="/quote"
                    className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Image (optional)"
                  value={editing.mainImageUrl}
                  onChange={(v) => setEditing((e) => ({ ...e, mainImageUrl: v }))}
                  folder="skyluxe/services"
                />
                <p className="text-xs text-gray-400 font-montserrat mt-1">
                  Fills half the row on desktop. Landscape works best. If empty, a default image for the category is used.
                </p>
                {editing.mainImageUrl && (
                  <button
                    onClick={() => setEditing((e) => ({ ...e, mainImageUrl: "" }))}
                    className="mt-1 text-xs text-red-500 hover:text-red-700 font-montserrat"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600 font-montserrat bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium disabled:opacity-50"
              >
                {saving ? "Saving..." : saved ? "Saved!" : "Save"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg font-montserrat text-sm text-gray-600"
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
