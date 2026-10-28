/**
 * Shared between the import API routes and the admin review screen.
 * No server-only imports here, so the client can use it too.
 */
import type { Chapter, Fact, Highlight, ListSection } from "@/types";

/** Where a draft value came from, shown as a badge on the review screen. */
export type FieldSource = "document" | "inferred" | "written" | "missing";

export interface DraftCard {
  title: string;
  slug: string;
  city: string;
  sector: string;
  services: string[]; // first = main service
  category: string[];
  systems: string[];
  year: string; // kept as a string while editing
}

export interface DraftDetail {
  subtitle: string;
  blurb: string; // Overview lead
  overview: string[];
  area: string;
  underConstruction: boolean;
  facts: Fact[];
  listSections: ListSection[]; // Scope of work
  highlight: Highlight | null;
  chapters: Chapter[];
  videoUrl: string;
}

export interface ImportDraft {
  fileName: string;
  card: DraftCard;
  detail: DraftDetail;
  sources: Record<string, FieldSource>;
  notes: string[];
}
