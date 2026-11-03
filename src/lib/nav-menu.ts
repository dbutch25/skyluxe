/**
 * Services dropdown in the main navigation.
 *
 * The services themselves (name and page) are fixed here, because each one
 * has its own page in the code. Everything shown inside the dropdown for a
 * service (its one-line description and its 2 featured items with photo,
 * title, link and materials) is edited in Admin → Navigation and saved in
 * the NavMenu table. Anything not saved yet falls back to the defaults below.
 *
 * No server-only imports, so the header and the admin page can both use it.
 */

export interface NavItem {
  title: string;
  imageUrl: string;
  /** Page path ("/projects/28-broadleaf") or full https:// link. Empty = no link. */
  href: string;
  materials: string[];
}

export interface NavService {
  id: string;
  label: string;
  href: string;
  description: string;
  items: NavItem[];
}

/** What's saved in the database: per service id, the editable parts. */
export type NavMenuContent = Record<string, { description?: string; items?: NavItem[] }>;

/** Featured items per service in the dropdown. */
export const NAV_ITEMS_PER_SERVICE = 2;

/** Materials listed per item in the dropdown. */
export const NAV_MATERIALS_PER_ITEM = 4;

export const NAV_SERVICE_DEFAULTS: NavService[] = [
  {
    id: "ici",
    label: "ICI Roofing",
    href: "/ICI",
    description: "Industrial, commercial & institutional roofing systems",
    items: [
      {
        title: "Commercial Flat Roof",
        href: "",
        imageUrl: "/images/serviceHero.jpg",
        materials: ["SBS Modified Bitumen", "TPO Membrane", "EPDM", "BUR System"],
      },
      {
        title: "Industrial Replacement",
        href: "",
        imageUrl: "/images/knudson1.jpg",
        materials: ["Cold Applied Bitumen", "Thermoplastic Membrane", "Green Roof System", "Inverted Roof"],
      },
    ],
  },
  {
    id: "residential",
    label: "Residential Roofing",
    href: "/residential-roofing",
    description: "Premium roofing for custom homes & residential builds",
    items: [
      {
        title: "Custom Home Reroof",
        href: "",
        imageUrl: "/images/home.jpg",
        materials: ["Asphalt Shingles", "Cedar Shakes", "Natural Slate", "Synthetic Slate"],
      },
      {
        title: "New Construction",
        href: "",
        imageUrl: "/images/about1.jpg",
        materials: ["Metal Roofing", "Flat Roofing", "Skylight Install", "Custom Metalwork"],
      },
    ],
  },
  {
    id: "cladding",
    label: "Architectural Cladding",
    href: "/architectural-cladding",
    description: "Custom facade systems for architects & designers",
    items: [
      {
        title: "ACM Panel Facade",
        href: "",
        imageUrl: "/images/about2.jpg",
        materials: ["ACM Panels", "Standing Seam", "Zinc Panels", "Copper Cladding"],
      },
      {
        title: "Commercial Cladding",
        href: "",
        imageUrl: "/images/serviceHero.jpg",
        materials: ["Fibre Cement", "Wood Panels", "Composite Siding", "Concrete Panels"],
      },
    ],
  },
  {
    id: "waterproofing",
    label: "Waterproofing",
    href: "/waterproofing",
    description: "Below & above-grade waterproofing & restoration",
    items: [
      {
        title: "Foundation System",
        href: "",
        imageUrl: "/images/repairs.jpg",
        materials: ["Hot Rubber Membrane", "Foundation Wrap", "Blindside System", "Traffic Topping"],
      },
      {
        title: "Building Envelope",
        href: "",
        imageUrl: "/images/about1.jpg",
        materials: ["Cementitious Coat", "Sealer Application", "Leak Injection", "Drain System"],
      },
    ],
  },
  {
    id: "repairs",
    label: "Repairs & Maintenance",
    href: "/repairs",
    description: "24/7 emergency service & preventative programs",
    items: [
      {
        title: "Emergency Repair",
        href: "",
        imageUrl: "/images/repairs.jpg",
        materials: ["Infrared Moisture Test", "HVAC Cone Install", "Skylight Repair", "Retro Curb"],
      },
      {
        title: "Maintenance Program",
        href: "",
        imageUrl: "/images/knudson1.jpg",
        materials: ["Semi-Annual Inspection", "Detailed Report", "Moisture Testing", "Preventative Seal"],
      },
    ],
  },
  {
    id: "restoration",
    label: "Restoration",
    href: "/restoration",
    description: "Building envelope restoration & heritage facade renewal",
    items: [
      {
        title: "Facade Restoration",
        href: "",
        imageUrl: "/images/about2.jpg",
        materials: ["Masonry Repair", "Caulking Replacement", "Stone Cleaning", "Coating Systems"],
      },
      {
        title: "Envelope Renewal",
        href: "",
        imageUrl: "/images/serviceHero.jpg",
        materials: ["Sealant Injection", "Spandrel Panel Repair", "Through-Wall Flashing", "Window Perimeter Sealing"],
      },
    ],
  },
];

const EMPTY_ITEM: NavItem = { title: "", imageUrl: "", href: "", materials: [] };

/** Fixed service list + saved content (or defaults) → what the dropdown shows. */
export function buildNavServices(saved?: NavMenuContent | null): NavService[] {
  return NAV_SERVICE_DEFAULTS.map((service) => {
    const custom = saved?.[service.id];
    const items = Array.from({ length: NAV_ITEMS_PER_SERVICE }, (_, i) => ({
      ...EMPTY_ITEM,
      ...(custom?.items ? custom.items[i] : service.items[i]),
    }));
    return {
      ...service,
      description: custom?.description ?? service.description,
      items,
    };
  });
}

/** The parts of the services list that get saved. */
export function toNavMenuContent(services: NavService[]): NavMenuContent {
  return Object.fromEntries(
    services.map((s) => [
      s.id,
      {
        description: s.description.trim(),
        items: s.items.map((item) => ({
          title: item.title.trim(),
          imageUrl: item.imageUrl.trim(),
          href: item.href.trim(),
          materials: item.materials.map((m) => m.trim()).filter(Boolean),
        })),
      },
    ])
  );
}
