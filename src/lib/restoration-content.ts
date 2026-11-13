/**
 * Restoration page text: built-in defaults and how admin edits apply.
 * Shared by the public page and Admin → Restoration, so the admin always starts
 * from exactly what the page shows. An empty field falls back to its default.
 *
 * Headings with a coloured second line are split into `…Title` and `…Accent`.
 */

export interface RestorationStat { stat: string; label: string; sub: string }
export interface RestorationItem { title: string; description: string }
export interface RestorationFaq { title: string; content: string }

/** Page text stored in the Restoration.extras column. */
export interface RestorationExtras {
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  introEyebrow: string;
  introTitle: string;
  introAccent: string;
  introText2: string;
  stats: RestorationStat[];
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  /** Six cards; each keeps its drawn icon by position. */
  capabilities: RestorationItem[];
  scopeEyebrow: string;
  scopeTitle: string;
  scopeAccent: string;
  scopeText: string;
  checklist: string[];
  processEyebrow: string;
  processTitle: string;
  /** Five steps, numbered automatically. */
  process: RestorationItem[];
  galleryEyebrow: string;
  galleryTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  faqAccent: string;
  faqText: string;
  faqs: RestorationFaq[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaAccent: string;
  ctaText: string;
}

export interface RestorationContent extends RestorationExtras {
  /** Intro paragraph (stored in the introText column). */
  introText: string;
}

export const RESTORATION_DEFAULTS: RestorationContent = {
  heroEyebrow: "Building Envelope Services",
  heroTitle: "Restoration.",
  heroAccent: "Renewed Performance.",
  heroText: "Masonry repair, facade renewal, sealant systems, and heritage restoration — across the Greater Toronto Area.",
  introEyebrow: "What Is Restoration",
  introTitle: "When Buildings Age,",
  introAccent: "We Restore Them.",
  introText: "Buildings deteriorate. Mortar erodes, sealants fail, facades stain, and flashings corrode. Left unaddressed, what starts as minor weathering becomes major structural damage and costly interior repairs. Skyluxe provides comprehensive building envelope restoration — halting deterioration, renewing performance, and extending the life of your building for decades.",
  introText2:
    "Our restoration division works on everything from post-war masonry apartment buildings and 1970s concrete office towers to heritage-designated churches and modern curtain wall systems. We bring the same standards and project management discipline to every job regardless of size.",
  stats: [
    { stat: "20+", label: "Years of combined experience", sub: "Across the team" },
    { stat: "10yr", label: "Workmanship warranty", sub: "On coating systems" },
    { stat: "24/7", label: "Emergency response", sub: "For active leaks" },
    { stat: "GTA", label: "Service area", sub: "Mississauga to Toronto" },
  ],
  capabilitiesEyebrow: "What We Restore",
  capabilitiesTitle: "Six Core Capabilities.",
  capabilities: [
    { title: "Masonry Repair & Repointing", description: "Deteriorated mortar joints allow water to penetrate the wall assembly causing structural damage and interior leaks. We cut and repoint joints with mortar matched to the original in composition, colour, and texture — critical for heritage buildings." },
    { title: "Caulking & Sealant Replacement", description: "Failed sealants at window perimeters, expansion joints, curtain wall interfaces, and through-wall penetrations are a leading cause of water intrusion. We remove all deteriorated material and apply high-performance sealants rated for the specific substrate and movement joint." },
    { title: "Facade Cleaning & Coating Systems", description: "Staining, biological growth, and weathering affect both appearance and material integrity. We use low-pressure washing, chemical cleaning, and anti-carbonation or silane/siloxane penetrating coatings to protect and renew concrete, brick, and stone facades." },
    { title: "Spandrel Panel Repair", description: "Glass spandrel panels and their perimeter sealants are a critical point in curtain wall systems. We repair or replace failed sealant, address condensation damage, and restore both the weather seal and the thermal performance of the assembly." },
    { title: "Through-Wall Flashing", description: "Corroded or improperly installed through-wall flashings are a primary source of water penetration at shelf angles, lintels, and copings. We remove masonry, replace deteriorated flashings with stainless or copper systems, and rebuild the wall assembly." },
    { title: "Heritage & Modern Buildings", description: "From Victorian-era masonry to 1970s concrete curtain walls, each era presents unique restoration challenges. Our team matches historic materials, understands heritage designation requirements, and works with building owners and heritage consultants throughout the process." },
  ],
  scopeEyebrow: "Full Scope",
  scopeTitle: "Every Repair Type",
  scopeAccent: "We Handle.",
  scopeText:
    "Our restoration crews are trained in all aspects of building envelope repair. Whether your project needs one trade or a full multi-system restoration, we self-perform the work with our own certified teams.",
  checklist: [
    "Mortar joint raking and repointing",
    "Expansion and control joint replacement",
    "Window perimeter sealant replacement",
    "Curtain wall sealant restoration",
    "Spandrel panel perimeter sealing",
    "Through-wall flashing replacement",
    "Shelf angle and lintel restoration",
    "Brick and stone crack injection",
    "Concrete crack repair and patching",
    "Anti-carbonation coating application",
    "Silane/siloxane penetrating sealers",
    "Biocide treatment and facade cleaning",
    "Coping cap replacement and sealing",
    "Parapet wall reconstruction",
    "Sealant injection and cavity drain systems",
  ],
  processEyebrow: "How It Works",
  processTitle: "Our Process.",
  process: [
    { title: "Condition Assessment", description: "We inspect the facade using both visual survey and probing — identifying cracks, failed sealants, delamination, moisture infiltration, and corrosion. Where needed, we use borescopes or infrared scanning." },
    { title: "Scope & Specification", description: "We prepare a detailed scope of work with material specifications, repair methods, and staging. For heritage buildings we coordinate with conservation architects to ensure compliance." },
    { title: "Mobilization", description: "Swing stage, mast climber, or scaffold is installed. Perimeter protection and pedestrian hoarding are set up. Site safety plan submitted." },
    { title: "Restoration Work", description: "All work is executed per specification — crack injection, joint raking and repointing, caulking removal and replacement, flashing installation, and coating application." },
    { title: "Quality & Sign-off", description: "Final inspection with the client and building manager. We document all completed repairs with photographs and issue a written warranty for our workmanship." },
  ],
  galleryEyebrow: "Our Work",
  galleryTitle: "Restoration Projects.",
  faqEyebrow: "FAQs",
  faqTitle: "Common Questions",
  faqAccent: "About Restoration.",
  faqText: "Not sure if your building needs restoration work? Here are the questions we get asked most often.",
  faqs: [
    { title: "How do I know if my building needs restoration?", content: "Common signs include visible cracks in masonry or caulking joints, water stains on interior walls or ceilings near windows, spalling brick or concrete, rust staining from embedded steel, and biological growth on the facade. A condition assessment by our team will identify the extent of deterioration and what needs to be addressed." },
    { title: "What is the difference between restoration and waterproofing?", content: "Waterproofing refers to membrane systems applied to below-grade or horizontal surfaces (foundations, plaza decks) to prevent water penetration. Restoration focuses on the above-grade building envelope — repairing existing materials like masonry, cladding, and sealant joints that have deteriorated over time. Many restoration projects include waterproofing elements as part of the scope." },
    { title: "Can you work on heritage-designated buildings?", content: "Yes. Heritage restoration requires matching original materials and methods — specific mortar mixes, compatible sealants, and repair approaches that preserve the character of the building. We work with building owners, heritage consultants, and municipal heritage offices to ensure all work meets approval requirements." },
    { title: "How long does a facade restoration project take?", content: "Timelines vary significantly based on building height, extent of deterioration, and staging requirements. A typical mid-rise restoration project ranges from 4–12 weeks on site. We provide a detailed schedule at project award and maintain daily communication with the building manager throughout." },
    { title: "Do you offer warranties on restoration work?", content: "Yes. We provide written workmanship warranties on all restoration work. The warranty period depends on the scope — typically 2–5 years for sealant replacement and repointing, and up to 10 years for coating systems depending on the product specified." },
  ],
  ctaEyebrow: "Ready to restore?",
  ctaTitle: "Book a Free",
  ctaAccent: "Condition Assessment.",
  ctaText:
    "We’ll inspect your building, identify what needs attention, and provide a detailed scope and proposal — with no obligation.",
};

const text = (value: string | null | undefined, fallback: string) => value?.trim() || fallback;
const lines = (list: string[] | null | undefined) => (list ?? []).map((l) => l.trim()).filter(Boolean);

/** What the page shows: saved text where present, defaults otherwise. */
export function resolveRestorationContent(data?: {
  introText?: string | null;
  extras?: Partial<RestorationExtras> | null;
} | null): RestorationContent {
  const d = RESTORATION_DEFAULTS;
  const x = data?.extras ?? {};
  const pick = (key: keyof RestorationExtras) => text(x[key] as string | undefined, d[key] as string);
  const checklist = lines(x.checklist);
  const faqs = (x.faqs ?? []).filter((f) => f.title?.trim() && f.content?.trim());

  return {
    heroEyebrow: pick("heroEyebrow"),
    heroTitle: pick("heroTitle"),
    heroAccent: x.heroAccent !== undefined ? x.heroAccent.trim() : d.heroAccent,
    heroText: pick("heroText"),
    introEyebrow: pick("introEyebrow"),
    introTitle: pick("introTitle"),
    introAccent: x.introAccent !== undefined ? x.introAccent.trim() : d.introAccent,
    introText: text(data?.introText, d.introText),
    introText2: x.introText2 !== undefined ? x.introText2.trim() : d.introText2,
    stats: d.stats.map((s, i) => ({
      stat: text(x.stats?.[i]?.stat, s.stat),
      label: text(x.stats?.[i]?.label, s.label),
      sub: text(x.stats?.[i]?.sub, s.sub),
    })),
    capabilitiesEyebrow: pick("capabilitiesEyebrow"),
    capabilitiesTitle: pick("capabilitiesTitle"),
    capabilities: d.capabilities.map((c, i) => ({
      title: text(x.capabilities?.[i]?.title, c.title),
      description: text(x.capabilities?.[i]?.description, c.description),
    })),
    scopeEyebrow: pick("scopeEyebrow"),
    scopeTitle: pick("scopeTitle"),
    scopeAccent: x.scopeAccent !== undefined ? x.scopeAccent.trim() : d.scopeAccent,
    scopeText: pick("scopeText"),
    checklist: checklist.length ? checklist : d.checklist,
    processEyebrow: pick("processEyebrow"),
    processTitle: pick("processTitle"),
    process: d.process.map((p, i) => ({
      title: text(x.process?.[i]?.title, p.title),
      description: text(x.process?.[i]?.description, p.description),
    })),
    galleryEyebrow: pick("galleryEyebrow"),
    galleryTitle: pick("galleryTitle"),
    faqEyebrow: pick("faqEyebrow"),
    faqTitle: pick("faqTitle"),
    faqAccent: x.faqAccent !== undefined ? x.faqAccent.trim() : d.faqAccent,
    faqText: pick("faqText"),
    faqs: x.faqs ? faqs : d.faqs,
    ctaEyebrow: pick("ctaEyebrow"),
    ctaTitle: pick("ctaTitle"),
    ctaAccent: x.ctaAccent !== undefined ? x.ctaAccent.trim() : d.ctaAccent,
    ctaText: pick("ctaText"),
  };
}
