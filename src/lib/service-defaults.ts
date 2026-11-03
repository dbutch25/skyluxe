/**
 * Homepage "What We Do" services: categories and built-in defaults.
 * Shared by the homepage (ServicesGrid) and Admin → Homepage Services, so the
 * admin always shows what the homepage will actually display.
 */
import { images } from "@/constants";
import type { Service } from "@/types";

export const SERVICE_CATEGORIES = [
  { value: "ICI-roofing", label: "ICI Roofing" },
  { value: "residential-roofing", label: "Residential Roofing" },
  { value: "architectural-cladding", label: "Architectural Cladding" },
  { value: "waterproofing", label: "Waterproofing" },
  { value: "repairs", label: "Repairs & Maintenance" },
  { value: "restoration", label: "Restoration" },
] as const;

export const categoryLabel = (value: string) =>
  SERVICE_CATEGORIES.find((c) => c.value === value)?.label ?? value.replace(/-/g, " ");

/** Shown on the homepage only while no services have been added in the admin. */
export const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    title: "ICI Roofing",
    description:
      "Skyluxe is a full-service ICI roofing contractor serving property managers, institutions, general contractors, and building owners across the GTA. We specialize in roof replacements, new construction, and maintenance, delivering every project within budget.",
    serviceLink: "/ICI",
    requestLink: "/quote",
    mainImageUrl: "",
    category: "ICI-roofing",
    order: 0,
  },
  {
    id: "2",
    title: "Residential Roofing",
    description:
      "Your home deserves the same level of care we bring to our largest commercial projects. We install and replace all major residential roofing systems, from architectural shingles and natural slate to standing seam metal, backed by our GAF Golden Pledge warranty.",
    serviceLink: "/residential-roofing",
    requestLink: "/quote",
    mainImageUrl: "",
    category: "residential-roofing",
    order: 1,
  },
  {
    id: "3",
    title: "Architectural Cladding",
    description:
      "Transform your building envelope with custom cladding systems. Skyluxe designs and installs ACM panels, zinc, copper, and standing seam facades trusted by architects and developers across the GTA, we combine striking aesthetics with superior weather performance.",
    serviceLink: "/architectural-cladding",
    requestLink: "/quote",
    mainImageUrl: "",
    category: "architectural-cladding",
    order: 2,
  },
  {
    id: "4",
    title: "Waterproofing",
    description:
      "Water intrusion is one of the most damaging issues a building can face. Our waterproofing division handles everything from below-grade foundation systems and blindside applications to plaza decks, parkade coatings, and complete building envelope restoration.",
    serviceLink: "/waterproofing",
    requestLink: "/quote",
    mainImageUrl: "",
    category: "waterproofing",
    order: 3,
  },
  {
    id: "5",
    title: "Repairs & Maintenance",
    description:
      "Don't wait for a small leak to become a major problem. Skyluxe offers 24/7 emergency repair response alongside comprehensive preventative maintenance programs. Our certified technicians diagnose issues fast using infrared moisture testing and restore your roof to peak performance.",
    serviceLink: "/repairs",
    requestLink: "/quote",
    mainImageUrl: "",
    category: "repairs",
    order: 4,
  },
   {
    id: "6",
    title: "Restoration",
    description:
      "Mortar erodes, sealants fail, and flashings corrode when left unaddressed, minor weathering becomes major structural damage. Our restoration division delivers complete building envelope restoration, from masonry repointing and caulking replacement to facade cleaning and coating systems, on everything from heritage churches to modern curtain wall towers.",
    serviceLink: "/restoration",
    requestLink: "/quote",
    mainImageUrl: "",
    category: "restoration",
    order: 5,
  },
];

/** Bullet points used when a service has none of its own. */
export const DEFAULT_SERVICE_POINTS: Record<string, string[]> = {
  "ICI-roofing": [
    "SBS, TPO, EPDM & BUR systems",
    "New construction & reroof replacement",
    "GAF Master Elite certified",
    "Project management from assessment to handover",
  ],
  "residential-roofing": [
    "Architectural shingles, slate & metal",
    "GAF Golden Pledge warranty available",
    "Custom flat roof systems",
    "Full site cleanup & final walkthrough",
  ],
  "architectural-cladding": [
    "ACM composite panels & standing seam",
    "Zinc, copper & custom metal facades",
    "Rainscreen & concealed fastener systems",
    "Works directly with architects & GCs",
  ],
  "waterproofing": [
    "Below-grade foundation systems",
    "Plaza decks & parkade coatings",
    "Building envelope restoration",
    "Blindside waterproofing specialists",
  ],
  "repairs": [
    "24/7 emergency leak response",
    "Infrared moisture detection",
    "All major roofing systems serviced",
    "Semi-annual preventative programs",
  ],
  "restoration": [
    "Masonry repair & repointing",
    "Caulking & sealant replacement",
    "Facade cleaning & coating systems",
    "Heritage & modern buildings",
  ],
};

/** Photo used when a service has none of its own. */
export const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  "ICI-roofing": images.serviceHero,
  "residential-roofing": images.homeImage,
  "architectural-cladding": images.about2,
  "waterproofing": images.about1,
  "repairs": images.knudson1,
  "restoration": images.about2,
};

/** The photo the homepage shows for a service, and whether it's the default. */
export function serviceImage(service: Pick<Service, "mainImageUrl" | "category">) {
  const own = !!service.mainImageUrl && !service.mainImageUrl.includes("placeholder");
  return {
    url: own ? service.mainImageUrl : DEFAULT_SERVICE_IMAGES[service.category] ?? images.serviceHero,
    isDefault: !own,
  };
}

/** The bullet points the homepage shows for a service, and whether they're the defaults. */
export function servicePoints(service: Pick<Service, "points" | "category">) {
  const own = (service.points ?? []).length > 0;
  return {
    points: own ? service.points! : DEFAULT_SERVICE_POINTS[service.category] ?? [],
    isDefault: !own,
  };
}
