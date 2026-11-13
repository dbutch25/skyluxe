/**
 * Architectural Cladding page text: built-in defaults and how admin edits apply.
 * Shared by the public page and Admin → Architectural Cladding, so the admin
 * always starts from exactly what the page shows. An empty field falls back to
 * its default text.
 */

export interface CladdingFact {
  /** Large line, e.g. "In-House" (a dot is added after it on the page). */
  n: string;
  label: string;
  sub: string;
}

/** Page text stored in the Cladding.extras column. */
export interface CladdingExtras {
  heroEyebrow: string;
  facts: CladdingFact[];
  specialtiesEyebrow: string;
  specialtiesTitle: string;
  specialtiesIntro: string;
  /** YouTube video IDs: [0] after the specialties, [1] and [2] after the gallery. */
  videos: string[];
  galleryEyebrow: string;
  galleryTitle: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
}

export interface CladdingContent extends CladdingExtras {
  title: string;
  content: string;
  specialties: string[];
  partnersTitle: string;
  partnersIntro: string;
}

export const CLADDING_DEFAULTS: CladdingContent = {
  heroEyebrow: "Architectural Cladding",
  title: "Architectural Cladding",
  content:
    "Skyluxe Roofing and Sheet Metal has extensive expertise in a variety of cladding applications. Our large sheet metal shop is outfitted with state-of-the-art equipment to ensure high-quality results.",
  facts: [
    { n: "In-House", label: "Sheet Metal Shop", sub: "State-of-the-art equipment" },
    { n: "Custom", label: "Fabrication", sub: "Built to your elevation" },
    { n: "ACM · Zinc", label: "& Copper", sub: "Exotic metal expertise" },
    { n: "GTA", label: "Wide Service", sub: "ICI & residential" },
  ],
  specialtiesEyebrow: "What We Fabricate & Install",
  specialtiesTitle: "Cladding Systems We Specialize In",
  specialtiesIntro:
    "From standing seam and ACM to zinc, copper and exotic metal work, our sheet metal division fabricates and installs facade systems designed to your building’s exact requirements — for Industrial, Commercial, Institutional and Residential projects.",
  specialties: [
    "Standing Seam Panels",
    "Corrugated Siding",
    "Insulated Wall Panels (IMP Panels)",
    "Custom Sheet Metal Fabrication & Installation",
    "Wood Panels",
    "Zinc Panels",
    "Copper & Exotic Metal Work",
    "Aluminum Composite Panels (ACM Panels)",
    "Fibre Cement Panels",
    "Wood Siding",
    "Composite Siding",
    "Concrete Panels",
  ],
  videos: ["V-16shpld_8", "XaYfYRqX_EM", "s-0uXog0ZiQ"],
  galleryEyebrow: "Project Gallery",
  galleryTitle: "Cladding Projects Across the GTA",
  partnersTitle: "Partners",
  partnersIntro:
    "Our trusted partnerships with top manufacturers, architects, and designers ensure quality, innovation, and lasting value in every project. Collaborating closely with these industry experts allows us to bring cutting-edge materials and designs to life.",
  ctaEyebrow: "Architects · Builders · Developers",
  ctaTitle: "Planning a Facade or Cladding Project?",
  ctaText:
    "Send us your drawings and we’ll fabricate and install a cladding system to match. Free assessment, response within 24 hours, full GTA service.",
};

const text = (value: string | null | undefined, fallback: string) => value?.trim() || fallback;

/** What the page shows: saved text where present, defaults otherwise. */
export function resolveCladdingContent(data?: {
  title?: string | null;
  content?: string | null;
  listSections?: { items: string[] }[] | null;
  extraTitle?: string | null;
  extraContent?: string | null;
  extras?: Partial<CladdingExtras> | null;
} | null): CladdingContent {
  const d = CLADDING_DEFAULTS;
  const x = data?.extras ?? {};
  const specialties = (data?.listSections ?? []).flatMap((s) => s.items).map((i) => i.trim()).filter(Boolean);

  return {
    heroEyebrow: text(x.heroEyebrow, d.heroEyebrow),
    title: text(data?.title, d.title),
    content: text(data?.content, d.content),
    facts: d.facts.map((fact, i) => ({
      n: text(x.facts?.[i]?.n, fact.n),
      label: text(x.facts?.[i]?.label, fact.label),
      sub: text(x.facts?.[i]?.sub, fact.sub),
    })),
    specialtiesEyebrow: text(x.specialtiesEyebrow, d.specialtiesEyebrow),
    specialtiesTitle: text(x.specialtiesTitle, d.specialtiesTitle),
    specialtiesIntro: text(x.specialtiesIntro, d.specialtiesIntro),
    specialties: specialties.length ? specialties : d.specialties,
    // Videos can be cleared individually, so an empty slot stays empty once saved.
    videos: d.videos.map((id, i) => (x.videos ? (x.videos[i] ?? "").trim() : id)),
    galleryEyebrow: text(x.galleryEyebrow, d.galleryEyebrow),
    galleryTitle: text(x.galleryTitle, d.galleryTitle),
    partnersTitle: text(data?.extraTitle, d.partnersTitle),
    partnersIntro: text(data?.extraContent, d.partnersIntro),
    ctaEyebrow: text(x.ctaEyebrow, d.ctaEyebrow),
    ctaTitle: text(x.ctaTitle, d.ctaTitle),
    ctaText: text(x.ctaText, d.ctaText),
  };
}
