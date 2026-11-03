"use client";

/**
 * Navigation → Services dropdown.
 * Per service: the one-line description and its 2 featured items
 * (photo, title, link, materials). Saved changes show on every page straight away.
 */

import { useEffect, useState } from "react";
import { AdminSection, Hint, SaveBar, TextField } from "@/components/admin/Fields";
import { PhotoSlot, ProjectPhotosProvider } from "@/components/admin/ProjectPhotos";
import {
  NAV_MATERIALS_PER_ITEM,
  toNavMenuContent,
  type NavItem,
  type NavService,
} from "@/lib/nav-menu";

const FOLDER = "skyluxe/navigation";

const isValidLink = (v: string) => v.trim() === "" || v.trim().startsWith("/") || /^https?:\/\//.test(v.trim());

export default function NavigationAdminPage() {
  const [services, setServices] = useState<NavService[] | null>(null);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cms/nav-menu")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setServices)
      .catch(() => setLoadError("Couldn't load the navigation. Refresh to try again."));
  }, []);

  if (loadError) return <div className="font-montserrat text-red-600 text-sm">{loadError}</div>;
  if (!services) return <div className="font-montserrat text-gray-500 text-sm">Loading...</div>;

  const setDescription = (si: number, description: string) =>
    setServices((list) => list!.map((s, i) => (i === si ? { ...s, description } : s)));

  const setItem = (si: number, ii: number, patch: Partial<NavItem>) =>
    setServices((list) =>
      list!.map((s, i) =>
        i === si ? { ...s, items: s.items.map((it, j) => (j === ii ? { ...it, ...patch } : it)) } : s
      )
    );

  const setMaterial = (si: number, ii: number, mi: number, value: string) => {
    const materials = Array.from({ length: NAV_MATERIALS_PER_ITEM }, (_, k) => services[si].items[ii].materials[k] ?? "");
    materials[mi] = value;
    setItem(si, ii, { materials });
  };

  // Picker library: every photo used in the dropdown, plus anything uploaded here.
  const usage = new Map<string, string[]>();
  services.forEach((s) =>
    s.items.forEach((it, i) => {
      if (!it.imageUrl) return;
      usage.set(it.imageUrl, [...(usage.get(it.imageUrl) ?? []), `${s.label}: ${it.title || `item ${i + 1}`}`]);
    })
  );
  const library = [...new Set([...usage.keys(), ...uploaded])];

  const badLinks = services.flatMap((s) => s.items.filter((it) => !isValidLink(it.href)).map((it) => `${s.label}: ${it.title || "untitled"}`));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/cms/nav-menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: toNavMenuContent(services) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error === "Validation failed" ? "Some fields aren't valid. Check the links." : data?.error ?? "Save failed");
      }
      setServices(await res.json());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-julius text-primary-950">Navigation</h1>
        <p className="text-gray-500 font-montserrat text-sm mt-1">
          The Services dropdown in the main menu. Each service shows a short description and 2 featured items.
        </p>
      </div>

      <ProjectPhotosProvider
        library={library}
        skipped={[]}
        usage={usage}
        folder={FOLDER}
        onLibraryChange={(next) => setUploaded(next.filter((u) => !usage.has(u)))}
        onSkippedChange={() => {}}
        onRemove={() => {}}
      >
        <div className="space-y-6">
          {services.map((service, si) => (
            <AdminSection key={service.id} title={service.label} help={`Service page: ${service.href}`}>
              <div className="space-y-5">
                <TextField
                  label="Description"
                  value={service.description}
                  onChange={(v) => setDescription(si, v)}
                  placeholder="One line under the service name"
                />

                <div className="grid gap-5 md:grid-cols-2">
                  {service.items.map((item, ii) => (
                    <div key={ii} className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <p className="font-montserrat text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Featured item {ii + 1}
                      </p>
                      <PhotoSlot label="Photo" value={item.imageUrl} onChange={(v) => setItem(si, ii, { imageUrl: v })} />
                      <TextField label="Title" value={item.title} onChange={(v) => setItem(si, ii, { title: v })} />
                      <div>
                        <TextField
                          label="Link"
                          value={item.href}
                          onChange={(v) => setItem(si, ii, { href: v })}
                          placeholder="/projects/28-broadleaf"
                        />
                        {isValidLink(item.href) ? (
                          <Hint>A page on this site (starting with /) or a full https:// address. Leave empty for no link.</Hint>
                        ) : (
                          <p className="mt-1 text-xs text-red-600 font-montserrat">
                            Start with / for a page on this site, or https:// for another website.
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="mb-1 font-montserrat text-sm font-medium text-gray-700">Materials</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Array.from({ length: NAV_MATERIALS_PER_ITEM }, (_, mi) => (
                            <input
                              key={mi}
                              value={item.materials[mi] ?? ""}
                              onChange={(e) => setMaterial(si, ii, mi, e.target.value)}
                              placeholder={`Material ${mi + 1}`}
                              className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat bg-white"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Hint>Items without a title are hidden in the dropdown.</Hint>
              </div>
            </AdminSection>
          ))}

          {badLinks.length > 0 && (
            <p className="text-sm text-amber-700 font-montserrat bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
              Fix these links before saving: {badLinks.join(", ")}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600 font-montserrat bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
          )}

          <SaveBar saving={saving} saved={saved} onSave={save} />
        </div>
      </ProjectPhotosProvider>
    </div>
  );
}
