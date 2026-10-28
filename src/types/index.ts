/**
 * src/types/index.ts
 *
 * Single source of truth for ALL frontend types.
 * Every component and data function imports from here.
 * Never define types inline in lib/data.ts or individual components.
 */

// ─── Home ──────────────────────────────────────────────────────────────────────

export interface HomeVideo {
  id: string;
  videoLabel?: string;
  videoUrl: string;
}

export interface AboutUsHome {
  id: string;
  content: object; // Tiptap JSON document
}

export interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  isFeatured: boolean;
  order: number;
}

// ─── Services ─────────────────────────────────────────────────────────────────

export type ServiceCategory =
  | "ICI-roofing"
  | "architectural-cladding"
  | "residential-roofing"
  | "repairs"
  | "waterproofing"
  | "restoration";

export interface Service {
  id: string;
  title: string;
  description: string;
  serviceLink: string;
  requestLink: string;
  mainImageUrl: string;
  category: ServiceCategory | string;
  points?: string[];
  order: number;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | "ICI"
  | "architectural cladding"
  | "residential roofing"
  | "waterproofing"
  | "restoration";

export interface Project {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  category: ProjectCategory[] | string[];
  sector?: string | null;   // "ICI" | "Residential" (card badge)
  services?: string[];      // every service covered; the first is the main one (filters + related)
  systems?: string[];       // roof systems used, e.g. ["SBS", "Standing Seam"]
  year?: number | null;     // completion year
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  order: number;
  published?: boolean;      // false = draft, hidden from the public site
  hasDetailPage?: boolean;  // false = map pin only: homepage map, no /projects card or detail page
  projectId?: string | null;
}

export interface ListSection {
  title?: string;
  items: string[];
}

export interface Fact {
  label: string;
  value: string;
}

/** Optional standout block: a signature element or a warranty. */
export interface Highlight {
  label?: string;
  title: string;
  body?: string;
  imageUrl?: string;
}

/** A headed "In detail" section. */
export interface Chapter {
  title: string;
  body: string[];
  items?: string[];
  imageUrl?: string;
}

export interface ProjectVideo {
  id: string;
  title?: string;
  body?: string;
  vertical?: boolean; // YouTube Short (9:16) vs regular (16:9)
}

export interface ProjectDetail {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;      // hero line under the title
  blurb?: string | null;         // Overview lead paragraph (+ meta description)
  overview?: string[];           // Overview paragraphs after the lead
  facts?: Fact[] | null;         // Facts strip (City/Area are added automatically)
  highlight?: Highlight | null;
  chapters?: Chapter[] | null;   // "In detail"
  video?: ProjectVideo | null;   // feature video (separate from drone)
  sequenceCaptions?: string[];   // one caption per sequence stage
  overviewImages?: Record<string, string> | null; // overview photo picks per slot (see lib/overview-layout.ts)
  photos?: string[];             // the project's photo library, in upload order
  skipPhotos?: string[];         // library photos never placed automatically
  underConstruction?: boolean;
  area?: string | null;
  scope?: string | null;
  challenge?: string | null;
  solution?: string | null;
  droneImageUrl?: string | null;
  droneVideoId?: string | null;
  droneDuration?: string | null;
  backgroundVideoUrl?: string;
  fallbackImageUrl?: string;
  content?: string;
  mainImageUrl?: string;
  listSections?: ListSection[];
  extraContent?: string;
  extraImageUrl?: string;
  fullWidthImageUrl?: string;
  centeredText?: string;
  images?: string[];
  carouselImages?: string[];
  firstEmbed?: string;
  secondEmbed?: string;
  thirdEmbed?: string;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  imgUrl?: string;
  order: number;
}

// ─── Careers ──────────────────────────────────────────────────────────────────

export interface Career {
  id: string;
  title: string;
  location: string;
  jobType: string;
  applyUrl: string;
  description?: string;   // short blurb shown on card
  active: boolean;
  order: number;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface CloudinaryImage {
  url: string;
  alt?: string;
}

// ─── Service pages ────────────────────────────────────────────────────────────

export interface RepairsPage {
  id: string;
  title: string;
  firstContent?: string;
  secondContent?: string;
  firstImageUrl?: string;
  firstImageAlt?: string;
  thirdContent?: string;
  images?: CloudinaryImage[];
  listSections?: { items: string[] }[];
}

export interface WaterproofingPage {
  id: string;
  title: string;
  description?: string;
  accordionItems?: {
    accordionTitle: string;
    accordionContent: string;
  }[];
  gallery?: { url: string; galleryAlt?: string }[];
  manufacturersGallery?: { url: string; manufacturerAlt?: string }[];
}

export interface ICIRoofingPage {
  id: string;
  title: string;
  content?: string;
  firstTitle?: string;
  firstContent?: string;
  firstImageUrl?: string;
  firstImageAlt?: string;
  secondImageUrl?: string;
  secondImageAlt?: string;
  secondContent?: string;
  thirdContent?: string;
  secondTitle?: string;
  listSections?: { items: string[] }[];
  listItem?: string;
  galleryImages?: CloudinaryImage[];
  extraTitle?: string;
  carouselMImages?: CloudinaryImage[];
}

export interface CladdingPage {
  id: string;
  title: string;
  content?: string;
  listSections?: { items: string[] }[];
  galleryImages?: CloudinaryImage[];
  extraTitle?: string;
  extraContent?: string;
  carouselMImages?: CloudinaryImage[];
  carouselADImages?: CloudinaryImage[];
}

export interface RestorationPage {
  id: string;
  title: string;
  introText?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  galleryImages?: CloudinaryImage[];
}

export interface ResidentialPage {
  id: string;
  title: string;
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
  firstTitle?: string;
  firstContent?: string;
  firstImageUrl?: string;
  firstImageAlt?: string;
  [key: string]: unknown;
}

/** A project page joined with its detail record — what /projects/[slug] renders. */
export interface ProjectFull extends Project {
  project: ProjectDetail | null;
}

// ─── News & Charity ───────────────────────────────────────────────────────────

export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: object | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  published: boolean;
  publishedAt: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/** Card-sized post (no body) for lists and the homepage. */
export type PostSummary = Omit<Post, "content">;

export interface CharitySpotlight {
  id: string;
  enabled: boolean;
  label: string;
  title: string;
  body: string;
  imageUrl: string | null;
  imageAlt: string | null;
  nextEvent: string | null;
  raisedToDate: string | null;
  venue: string | null;
  causeTitle: string | null;
  causeBody: string | null;
  recapLink: string | null;
  donateLink: string | null;
}
