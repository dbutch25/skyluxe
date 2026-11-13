/**
 * Waterproofing page text: built-in defaults and how admin edits apply.
 * Shared by the public page and Admin → Waterproofing so both show the same thing.
 */

export interface WaterproofingSystem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  /** Photos shown beside the system (slider). Empty = the drawn diagram. */
  gallery: { url: string; alt: string }[];
}

/** What Admin → Waterproofing saves per system (stored in accordionItems, by position). */
export interface WaterproofingSystemEdit {
  accordionTitle: string;
  accordionContent: string;
  subtitle?: string;
  tags?: string[];
  gallery?: { url: string; alt?: string }[];
}

export const WATERPROOFING_DESCRIPTION =
  "Skyluxe Waterproofing specializes in all building envelope restoration and below & above grade waterproofing systems. Led by Ben Serino — who pioneered the blindside waterproofing market in the GTA — our division brings over 20 years of hands-on expertise to every project.";

export const WATERPROOFING_SYSTEMS: WaterproofingSystem[] = [
  {
    id: "foundation",
    num: "01",
    title: "Foundation Waterproofing",
    subtitle: "Below-Grade Systems",
    content:
      "We specialize in providing below grade waterproofing systems for Conventional, Blindside and Tanked systems. These assemblies can be installed in various ways from Torch Applied, Self-Adhered, Liquid Applied, Trowel Applied and Spray Applied.",
    tags: ["Conventional", "Blindside", "Tanked", "Torch Applied", "Self-Adhered", "Liquid Applied"],
    gallery: [],
  },
  {
    id: "hot-rubber",
    num: "02",
    title: "Hot Applied Membrane",
    subtitle: "Hot Rubber Systems",
    content:
      "Hot rubber is commonly used for waterproofing roofs, plaza decks and other flat surfaces. It can be applied to both new and existing structures making it a versatile option for a variety of construction and renovation projects. Provides seamless, monolithic coverage with excellent adhesion.",
    tags: ["Plaza Decks", "Roof Decks", "Podium Slabs", "New Construction", "Renovation"],
    gallery: [],
  },
  {
    id: "traffic",
    num: "03",
    title: "Traffic Topping",
    subtitle: "Vehicular & Pedestrian",
    content:
      "Traffic toppings are a type of flooring material designed to withstand heavy foot and vehicular traffic. Commonly used in parking garages, loading docks, warehouses, roofs and roads where durability and resistance to wear and tear are important considerations.",
    tags: ["Polyurethane", "Epoxy", "Cementitious", "PMMA / PUMA", "Parking Garages", "Loading Docks"],
    gallery: [],
  },
  {
    id: "sealer",
    num: "04",
    title: "Sealer",
    subtitle: "Surface Protection",
    content:
      "Application of sealer on surfaces such as slabs on grade, balconies and service rooms. Penetrating silane/siloxane sealers provide deep protection against water, de-icing salts, and contaminants without altering surface appearance.",
    tags: ["Slabs on Grade", "Balconies", "Service Rooms", "Penetrating", "Film-Forming"],
    gallery: [],
  },
  {
    id: "cementitious",
    num: "05",
    title: "Cementitious Applications",
    subtitle: "Rigid Waterproofing",
    content:
      "Cementitious waterproofing for stormwater tanks, elevator pits, and sump pits. Ideal for negative-side waterproofing applications where access to the positive side is not available. Can be applied to wet surfaces and allows substrate to breathe.",
    tags: ["Stormwater Tanks", "Elevator Pits", "Sump Pits", "Negative-Side"],
    gallery: [],
  },
  {
    id: "leak",
    num: "06",
    title: "Leak Injections & Repairs",
    subtitle: "Emergency & Remedial",
    content:
      "Leak repairs on new or existing foundations. We identify and fix water infiltration issues using Polyurethane/Epoxy Injections, Cementitious coating, and cement/chemical grouting depending on conditions. Rapid response for active leaks.",
    tags: ["Polyurethane Injection", "Epoxy Injection", "Cementitious Coating", "Chemical Grouting"],
    gallery: [],
  },
];

/** The six systems as the page shows them: saved edits where present, defaults otherwise. */
export function mergeWaterproofingSystems(edits?: WaterproofingSystemEdit[] | null): WaterproofingSystem[] {
  return WATERPROOFING_SYSTEMS.map((system, i) => {
    const e = edits?.[i];
    if (!e) return system;
    return {
      ...system,
      gallery: (e.gallery ?? []).filter((g) => g.url).map((g) => ({ url: g.url, alt: g.alt ?? "" })),
      title: e.accordionTitle?.trim() || system.title,
      content: e.accordionContent?.trim() || system.content,
      subtitle: e.subtitle?.trim() || system.subtitle,
      tags: e.tags?.length ? e.tags : system.tags,
    };
  });
}
