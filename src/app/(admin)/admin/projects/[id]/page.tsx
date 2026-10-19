"use client";

/**
 * Project editor: one screen for both records behind a project.
 *
 *   ProjectPage → the listing card on /projects (+ hero image, breadcrumb, glance line)
 *   Project     → the detail page content at /projects/[slug]
 *
 * Sections follow the order of the public detail page so editors can map each
 * field to what they see on the site.
 */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PhotoLibrary, PhotoSlot, ProjectPhotosProvider } from "@/components/admin/ProjectPhotos";
import {
  AdminSection,
  ChecklistField,
  ChipsField,
  Hint,
  SaveBar,
  SelectField,
  TextField,
} from "@/components/admin/Fields";
import {
  PROJECT_CATEGORIES,
  PROJECT_SECTORS,
  PROJECT_SERVICES,
  PROJECT_SYSTEMS,
} from "@/lib/schemas";
import {
  ChaptersField,
  FactsField,
  FeatureVideoField,
  HighlightField,
  StringListField,
  OverviewImagesField,
  cleanChapters,
  cleanFacts,
  cleanHighlight,
  cleanStrings,
} from "@/components/admin/ProjectContentFields";
import { slugify, youtubeId } from "@/lib/utils";
import { pruneOverviewImages } from "@/lib/overview-layout";
import { planProjectPhotos } from "@/lib/project-photos";
import type { ListSection, Project, ProjectDetail } from "@/types";

const FOLDER = "skyluxe/projects";

// Must match the STAGES order in components/elements/SequenceSlider.tsx
const SEQUENCE_STAGES = ["Existing conditions", "Tear-off", "Assembly", "Sheet metal", "Complete"];

/** Card fields as the form holds them: numbers stay strings until save. */
interface CardForm {
  title: string;
  slug: string;
  imageUrl: string;
  category: string[];
  sector: string;
  service: string;
  systems: string[];
  year: string;
  city: string;
  latitude: string;
  longitude: string;
  published: boolean;
}

type DetailForm = Partial<ProjectDetail>;

const toCardForm = (p: Partial<Project>): CardForm => ({
  title: p.title ?? "",
  slug: p.slug ?? "",
  imageUrl: p.imageUrl ?? "",
  category: (p.category as string[] | undefined) ?? [],
  sector: p.sector ?? "",
  service: p.service ?? "",
  systems: p.systems ?? [],
  year: p.year?.toString() ?? "",
  city: p.city ?? "",
  latitude: p.latitude?.toString() ?? "",
  longitude: p.longitude?.toString() ?? "",
  published: p.published ?? false,
});

const blankToNull = (v: string | null | undefined) => (v && v.trim() !== "" ? v.trim() : null);
const toNumberOrNull = (v: string) => (v.trim() === "" ? null : Number(v));

/** Drop empty list items and groups left behind by "Add item" / "Add group". */
const cleanSections = (sections: ListSection[] | null | undefined): ListSection[] =>
  (sections ?? [])
    .map((s) => ({
      ...(s.title?.trim() ? { title: s.title.trim() } : {}),
      items: s.items.map((i) => i.trim()).filter(Boolean),
    }))
    .filter((s) => s.items.length > 0);

/** fetch + readable error: surfaces which fields failed Zod validation. */
async function send<T>(url: string, method: "POST" | "PATCH", body: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const fields = Object.keys(data?.details?.fieldErrors ?? {});
    throw new Error(fields.length ? `Check these fields: ${fields.join(", ")}` : data?.error ?? "Save failed");
  }
  return data as T;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectEditor() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CardForm>(toCardForm({}));
  const [detail, setDetail] = useState<DetailForm>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const pageRes = await fetch(`/api/cms/project-pages/${id}`);
        if (!pageRes.ok) throw new Error("Project not found");
        const page: Project = await pageRes.json();
        setCard(toCardForm(page));

        if (page.projectId) {
          const detailRes = await fetch(`/api/cms/projects/${page.projectId}`);
          if (detailRes.ok) setDetail(await detailRes.json());
        }
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Could not load project");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const setC = <K extends keyof CardForm>(key: K, value: CardForm[K]) =>
    setCard((c) => ({ ...c, [key]: value }));
  const setD = <K extends keyof DetailForm>(key: K, value: DetailForm[K]) =>
    setDetail((d) => ({ ...d, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      // 1. Listing card
      await send(`/api/cms/project-pages/${id}`, "PATCH", {
        title: card.title.trim(),
        slug: slugify(card.slug),
        imageUrl: card.imageUrl,
        category: card.category,
        sector: card.sector || null,
        service: card.service || null,
        systems: card.systems,
        year: toNumberOrNull(card.year),
        city: blankToNull(card.city),
        latitude: toNumberOrNull(card.latitude),
        longitude: toNumberOrNull(card.longitude),
        published: card.published,
      });

      // 2. Detail page (title/slug mirrored from the card so they never drift)
      const plan = planProjectPhotos(card.imageUrl, detail);
      // Sequence: keep stages in order, skipping empty ones.
      const stages = (detail.carouselImages ?? [])
        .map((url, i) => ({ url, caption: (detail.sequenceCaptions?.[i] ?? "").trim() }))
        .filter((s) => !!s.url);
      const sections = cleanSections(detail.listSections);
      const payload = {
        ...detail,
        title: card.title.trim(),
        slug: slugify(card.slug),
        blurb: blankToNull(detail.blurb),
        area: blankToNull(detail.area),
        scope: blankToNull(detail.scope),
        challenge: blankToNull(detail.challenge),
        solution: blankToNull(detail.solution),
        listSections: sections,
        subtitle: blankToNull(detail.subtitle),
        overview: cleanStrings(detail.overview),
        facts: cleanFacts(detail.facts),
        highlight: cleanHighlight(detail.highlight),
        chapters: cleanChapters(detail.chapters),
        video: detail.video?.id?.trim() ? { ...detail.video, id: youtubeId(detail.video.id) } : null,
        carouselImages: stages.map((s) => s.url),
        sequenceCaptions: stages.map((s) => s.caption),
        overviewImages: pruneOverviewImages(detail.overviewImages, plan.overviewSlots),
        photos: plan.library,
        skipPhotos: (detail.skipPhotos ?? []).filter((u) => plan.library.includes(u)),
        underConstruction: !!detail.underConstruction,
        droneVideoId: detail.droneVideoId ? youtubeId(detail.droneVideoId) : null,
        droneDuration: blankToNull(detail.droneDuration),
      };

      if (detail.id) {
        const updated = await send<ProjectDetail>(`/api/cms/projects/${detail.id}`, "PATCH", payload);
        setDetail(updated);
      } else {
        const created = await send<ProjectDetail>("/api/cms/projects", "POST", payload);
        await send(`/api/cms/project-pages/${id}`, "PATCH", { projectId: created.id });
        setDetail(created);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="font-montserrat text-gray-500 text-sm">Loading...</div>;
  if (loadError) return <div className="font-montserrat text-red-600 text-sm">{loadError}</div>;

  const plan = planProjectPhotos(card.imageUrl, detail);
  const sequence = Array.from({ length: SEQUENCE_STAGES.length }, (_, i) => detail.carouselImages?.[i] ?? "");
  const sequenceHasGap = sequence.some((url, i) => !url && sequence.slice(i + 1).some(Boolean));

  const setStage = (i: number, url: string) => {
    const next = [...sequence];
    next[i] = url;
    setD("carouselImages", next);
  };

  /** Removes a photo from the library and clears it everywhere it was chosen. */
  const removePhoto = (url: string) => {
    setCard((c) => (c.imageUrl === url ? { ...c, imageUrl: "" } : c));
    setDetail((d) => ({
      ...d,
      photos: plan.library.filter((u) => u !== url),
      skipPhotos: (d.skipPhotos ?? []).filter((u) => u !== url),
      highlight: d.highlight?.imageUrl === url ? { ...d.highlight, imageUrl: undefined } : d.highlight,
      chapters: d.chapters?.map((c) => (c.imageUrl === url ? { ...c, imageUrl: undefined } : c)),
      carouselImages: d.carouselImages?.map((u) => (u === url ? "" : u)),
      droneImageUrl: d.droneImageUrl === url ? null : d.droneImageUrl,
      overviewImages: d.overviewImages
        ? Object.fromEntries(Object.entries(d.overviewImages).filter(([, v]) => v !== url))
        : d.overviewImages,
    }));
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-julius text-primary-950 truncate">{card.title || "Project"}</h1>
          <p className="text-gray-400 font-montserrat text-xs mt-1">/projects/{card.slug}</p>
        </div>
        <Link
          href={`/projects/preview/${id}`}
          target="_blank"
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 font-montserrat"
        >
          <ExternalLink size={12} /> Preview
        </Link>
        <label className="flex items-center gap-2 cursor-pointer select-none font-montserrat text-sm">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={card.published}
            onChange={(e) => setC("published", e.target.checked)}
          />
          <span className="relative h-5 w-9 rounded-full bg-gray-300 transition-colors peer-checked:bg-green-600 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
          <span className={card.published ? "text-green-700" : "text-gray-500"}>
            {card.published ? "Published" : "Draft"}
          </span>
        </label>
      </div>

      {card.published && !card.imageUrl && (
        <p className="mb-6 text-sm text-amber-700 font-montserrat bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
          This project is set to published but has no thumbnail, so its card on /projects will be blank. Add one below.
        </p>
      )}
      {!card.published && (
        <p className="mb-6 text-sm text-gray-600 font-montserrat bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          Draft: hidden from the public site. Use Preview to check it, then switch to Published and save.
        </p>
      )}

      <ProjectPhotosProvider
        library={plan.library}
        skipped={detail.skipPhotos ?? []}
        usage={plan.usage}
        folder={FOLDER}
        onLibraryChange={(next) => setD("photos", next)}
        onSkippedChange={(next) => setD("skipPhotos", next)}
        onRemove={removePhoto}
      >
      <div className="space-y-6">
        <PhotoLibrary />

        {/* ── Listing card ── */}
        <AdminSection
          title="Listing Card"
          help="Shown on /projects, the homepage map and related projects. The thumbnail is also the hero image on the detail page."
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Title" value={card.title} onChange={(v) => setC("title", v)} />
              <div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <TextField label="Slug" value={card.slug} onChange={(v) => setC("slug", v.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-{2,}/g, "-"))} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setC("slug", slugify(card.title))}
                    className="px-3 py-2 border rounded-lg text-xs font-montserrat text-gray-600 hover:bg-gray-50"
                  >
                    From title
                  </button>
                </div>
                <Hint>Changing the slug changes the page URL. Old links will stop working.</Hint>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <SelectField label="Sector" value={card.sector} options={PROJECT_SECTORS} onChange={(v) => setC("sector", v)} />
              <SelectField label="Service" value={card.service} options={PROJECT_SERVICES} onChange={(v) => setC("service", v)} />
              <TextField label="Year completed" value={card.year} onChange={(v) => setC("year", v.replace(/\D/g, "").slice(0, 4))} placeholder="2025" />
            </div>
            <Hint>Service drives the filter chips on /projects and the related projects. Service and city also form the &quot;At a glance&quot; line.</Hint>

            <div>
              <ChipsField label="Categories" options={PROJECT_CATEGORIES} values={card.category} onChange={(v) => setC("category", v)} />
              <Hint>The first category selected appears in the breadcrumb above the title.</Hint>
            </div>

            <ChipsField label="Roof systems" options={PROJECT_SYSTEMS} values={card.systems} onChange={(v) => setC("systems", v)} />

            <div className="grid grid-cols-3 gap-4">
              <TextField label="City / Area" value={card.city} onChange={(v) => setC("city", v)} placeholder="Vaughan" />
              <TextField label="Latitude" value={card.latitude} onChange={(v) => setC("latitude", v)} placeholder="43.84" />
              <TextField label="Longitude" value={card.longitude} onChange={(v) => setC("longitude", v)} placeholder="-79.50" />
            </div>
            <Hint>Coordinates place a pin on the homepage map. Leave blank to keep the project off the map. For homes, a nearby intersection is safer than the exact address.</Hint>

            <PhotoSlot label="Thumbnail / Hero image" value={card.imageUrl} onChange={(v) => setC("imageUrl", v)} hint="Shown on /projects and as the large photo at the top of the page." />
          </div>
        </AdminSection>

        {/* ── Hero + write-up ── */}
        <AdminSection title="Hero" help="The title comes from the listing card.">
          <div className="space-y-4">
            <TextField label="Subtitle" value={detail.subtitle ?? ""} onChange={(v) => setD("subtitle", v)} placeholder="Luxury roofing & Passive House building envelope" />
            <label className="flex items-center gap-2 text-sm font-montserrat text-gray-700">
              <input type="checkbox" checked={!!detail.underConstruction} onChange={(e) => setD("underConstruction", e.target.checked)} />
              Under construction (shows a tag in the hero)
            </label>
          </div>
        </AdminSection>

        <FactsField facts={detail.facts ?? []} onChange={(v) => setD("facts", v)} />

        <AdminSection title="Overview" help="Lead paragraph, then any further paragraphs.">
          <div className="space-y-4">
            <div>
              <TextField label="Lead" rows={3} value={detail.blurb ?? ""} onChange={(v) => setD("blurb", v)} />
              <Hint>The large first paragraph. Also used as the page&apos;s search description.</Hint>
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">More paragraphs</p>
              <StringListField rows={4} values={detail.overview ?? []} onChange={(v) => setD("overview", v)} addLabel="Add paragraph" />
            </div>
            <div>
              <TextField label="Area" value={detail.area ?? ""} onChange={(v) => setD("area", v)} placeholder="48,000 sq ft" />
              <Hint>Shown in the &quot;At a glance&quot; box between city and service.</Hint>
            </div>
            {(detail.scope || detail.challenge || detail.solution) && !detail.overview?.length && (
              <Hint>This project still uses the old Scope / Challenge / What we did fields. They show as Overview paragraphs until you add paragraphs above.</Hint>
            )}
          </div>
        </AdminSection>

        <OverviewImagesField
          slots={plan.overviewSlots}
          overrides={detail.overviewImages}
          resolved={plan.overview}
          onChange={(v) => setD("overviewImages", v)}
        />

        {/* ── Systems installed ── */}
        <ChecklistField
          title="Scope of Work"
          help='One group per trade or assembly, e.g. "Roofing" and "Architectural cladding". Empty items are removed on save.'
          sections={detail.listSections ?? []}
          onChange={(v) => setD("listSections", v)}
          withTitles
        />

        <HighlightField value={detail.highlight} onChange={(v) => setD("highlight", v)} />

        <ChaptersField chapters={detail.chapters ?? []} onChange={(v) => setD("chapters", v)} />

        {/* ── On site gallery (automatic) ── */}
        <AdminSection
          title="On Site Gallery"
          help="Filled automatically: every project photo not used anywhere else, in Project Photos order. To leave one out, use the eye button in Project Photos. The first photo is displayed tall."
        >
          {plan.onSite.length === 0 ? (
            <Hint>No photos left over. The On site section is hidden until there are some.</Hint>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {plan.onSite.map((url) => (
                <div key={url} className="relative aspect-4/3 overflow-hidden rounded bg-gray-100">
                  <Image src={url} alt="" fill sizes="140px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </AdminSection>

        {/* ── Sequence ── */}
        <AdminSection title="Sequence" help="One photo per stage of the job. The section appears once any stage has a photo.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SEQUENCE_STAGES.map((stage, i) => (
              <div key={stage} className="space-y-2">
                <PhotoSlot label={`${i + 1}. ${stage}`} value={sequence[i]} onChange={(v) => setStage(i, v)} />
                {sequence[i] && (
                  <TextField
                    label="Caption"
                    value={detail.sequenceCaptions?.[i] ?? ""}
                    onChange={(v) => {
                      const next = Array.from({ length: SEQUENCE_STAGES.length }, (_, j) => detail.sequenceCaptions?.[j] ?? "");
                      next[i] = v;
                      setD("sequenceCaptions", next);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {sequenceHasGap && (
            <p className="text-xs text-amber-600 font-montserrat mt-3">
              Some stages are empty. On save, the later photos move up to fill the gaps, so stage names may not match. Fill the stages in order to avoid this.
            </p>
          )}
        </AdminSection>

        {/* ── Drone ── */}
        <AdminSection title="Drone Walkthrough" help="The section only appears when a poster image is set.">
          <div className="space-y-4">
            <PhotoSlot label="Poster image" value={detail.droneImageUrl} onChange={(v) => setD("droneImageUrl", v || null)} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <TextField
                  label="YouTube video"
                  value={detail.droneVideoId ?? ""}
                  onChange={(v) => setD("droneVideoId", v)}
                  placeholder="Paste a YouTube link or video ID"
                />
                <Hint>Full links are converted to the video ID on save.</Hint>
              </div>
              <TextField label="Duration" value={detail.droneDuration ?? ""} onChange={(v) => setD("droneDuration", v)} placeholder="2:14" />
            </div>
          </div>
        </AdminSection>

        <FeatureVideoField value={detail.video} onChange={(v) => setD("video", v)} />

        {error && (
          <p className="text-sm text-red-600 font-montserrat bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
        )}

        <SaveBar saving={saving} saved={saved} onSave={handleSave} />
      </div>
      </ProjectPhotosProvider>
    </div>
  );
}
