/**
 * Overview section image layout, shared by the public page and the editor.
 *
 *   Lead paragraph
 *   [ full-width image ]                     ← "lead"
 *   Paragraph 1      | image                 ← "side-0"  (image right)
 *   image | Paragraph 2                      ← "side-1"  (image left)
 *   [ image ] [ image ]                      ← "pair-0-0", "pair-0-1" (after every 2 paragraphs)
 *   Paragraph 3 …                            (pattern repeats)
 *   [ full-width image ]                     ← "closing"
 *
 * Each slot is auto-filled from the On site gallery in reading order, unless the
 * editor picked an image for it (a URL) or turned it off ("none").
 * Gallery photos used here are left out of the On site section.
 */

export const OVERVIEW_NONE = "none";

export type OverviewSlotKind = "lead" | "side" | "pair" | "closing";

export interface OverviewSlot {
  id: string;
  kind: OverviewSlotKind;
  label: string;
}

/** The overview paragraphs the page shows (older records fall back to scope/challenge/solution). */
export function overviewParagraphs(detail: {
  overview?: string[] | null;
  scope?: string | null;
  challenge?: string | null;
  solution?: string | null;
} | null | undefined): string[] {
  const paragraphs = (detail?.overview ?? []).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length) return paragraphs;
  return [detail?.scope, detail?.challenge, detail?.solution].filter((p): p is string => !!p?.trim());
}

/** Every image slot for an overview with this many paragraphs, in reading order. */
export function overviewSlots(paragraphCount: number, hasLead: boolean): OverviewSlot[] {
  const slots: OverviewSlot[] = [];
  if (hasLead) slots.push({ id: "lead", kind: "lead", label: "Under the lead (full width)" });

  for (let i = 0; i < paragraphCount; i++) {
    slots.push({
      id: `side-${i}`,
      kind: "side",
      label: `Beside paragraph ${i + 1} (${i % 2 === 0 ? "right" : "left"})`,
    });
    if (i % 2 === 1) {
      const pair = (i - 1) / 2;
      slots.push({ id: `pair-${pair}-0`, kind: "pair", label: `Pair after paragraphs ${i}–${i + 1} (left)` });
      slots.push({ id: `pair-${pair}-1`, kind: "pair", label: `Pair after paragraphs ${i}–${i + 1} (right)` });
    }
  }

  if (paragraphCount > 0) slots.push({ id: "closing", kind: "closing", label: "End of overview (full width)" });
  return slots;
}

export interface ResolvedOverviewImages {
  /** Image per slot id; undefined = slot hidden. */
  bySlot: Record<string, string | undefined>;
  /** Whether each slot's image was chosen or auto-filled. */
  sourceBySlot: Record<string, "chosen" | "auto" | "none" | "empty">;
  /** Gallery images used by the overview (excluded from On site). */
  used: Set<string>;
}

export function resolveOverviewImages(
  slots: OverviewSlot[],
  overrides: Record<string, string> | null | undefined,
  gallery: string[]
): ResolvedOverviewImages {
  const chosen = overrides ?? {};
  const bySlot: ResolvedOverviewImages["bySlot"] = {};
  const sourceBySlot: ResolvedOverviewImages["sourceBySlot"] = {};
  const used = new Set<string>();

  // 1. Images picked in the editor
  for (const slot of slots) {
    const value = chosen[slot.id];
    if (value === OVERVIEW_NONE) {
      sourceBySlot[slot.id] = "none";
    } else if (value) {
      bySlot[slot.id] = value;
      sourceBySlot[slot.id] = "chosen";
      used.add(value);
    }
  }

  // 2. Everything else: next unused gallery photo, in reading order
  const queue = gallery.filter((src) => src && !used.has(src));
  for (const slot of slots) {
    if (sourceBySlot[slot.id]) continue;
    const next = queue.shift();
    if (next) {
      bySlot[slot.id] = next;
      sourceBySlot[slot.id] = "auto";
      used.add(next);
    } else {
      sourceBySlot[slot.id] = "empty";
    }
  }

  return { bySlot, sourceBySlot, used };
}

/** Drops picks for slots that no longer exist (e.g. after removing a paragraph). */
export function pruneOverviewImages(
  overrides: Record<string, string> | null | undefined,
  slots: OverviewSlot[]
): Record<string, string> | null {
  const ids = new Set(slots.map((s) => s.id));
  const kept = Object.fromEntries(Object.entries(overrides ?? {}).filter(([id, v]) => ids.has(id) && v));
  return Object.keys(kept).length ? kept : null;
}
