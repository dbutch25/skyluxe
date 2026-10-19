/**
 * Where each of a project's photos ends up on its page.
 * Shared by the public page and the editor so both always agree.
 *
 * 1. Photos chosen for a slot (hero, highlight, In detail, sequence, drone
 *    poster, any overview slot set by hand) are placed first.
 * 2. Overview slots left on "auto" take the next unused library photos, in
 *    library order. Photos marked "don't use automatically" are skipped.
 * 3. Every library photo still unused goes to the On site gallery.
 */
import type { ProjectDetail } from "@/types";
import {
  overviewParagraphs,
  overviewSlots,
  resolveOverviewImages,
  type OverviewSlot,
  type ResolvedOverviewImages,
} from "@/lib/overview-layout";

export interface PhotoPlan {
  /** The project's photo library. */
  library: string[];
  skipped: Set<string>;
  paragraphs: string[];
  overviewSlots: OverviewSlot[];
  overview: ResolvedOverviewImages;
  /** Photos shown in the On site section, in library order. */
  onSite: string[];
  /** Where each photo appears, for "used in" labels in the editor. */
  usage: Map<string, string[]>;
}

export function planProjectPhotos(
  thumbnail: string | null | undefined,
  detail: Partial<ProjectDetail> | null | undefined
): PhotoPlan {
  const d = detail ?? {};
  // Older records (before the photo library existed) fall back to their gallery.
  const library = (d.photos ?? d.images ?? []).filter(Boolean);
  const skipped = new Set(d.skipPhotos ?? []);
  const usage = new Map<string, string[]>();
  const mark = (url: string | null | undefined, label: string) => {
    if (!url) return;
    usage.set(url, [...(usage.get(url) ?? []), label]);
  };

  // 1. Chosen by hand
  mark(thumbnail, "Hero / thumbnail");
  mark(d.highlight?.imageUrl, "Highlight");
  (d.chapters ?? []).forEach((c, i) => mark(c.imageUrl, `In detail: ${c.title?.trim() || `section ${i + 1}`}`));
  (d.carouselImages ?? []).forEach((url, i) => mark(url, `Sequence stage ${i + 1}`));
  mark(d.droneImageUrl, "Drone poster");

  const paragraphs = overviewParagraphs(d);
  const slots = overviewSlots(paragraphs.length, !!d.blurb?.trim());
  const picks = d.overviewImages ?? {};
  for (const slot of slots) {
    const pick = picks[slot.id];
    if (pick && pick !== "none") mark(pick, `Overview: ${slot.label}`);
  }

  // 2. Overview auto-fill from what's left
  const pool = library.filter((url) => !usage.has(url) && !skipped.has(url));
  const overview = resolveOverviewImages(slots, picks, pool);
  for (const slot of slots) {
    if (overview.sourceBySlot[slot.id] === "auto") mark(overview.bySlot[slot.id], `Overview: ${slot.label}`);
  }

  // 3. The rest
  const onSite = pool.filter((url) => !overview.used.has(url));
  onSite.forEach((url) => mark(url, "On site gallery"));

  return { library, skipped, paragraphs, overviewSlots: slots, overview, onSite, usage };
}
