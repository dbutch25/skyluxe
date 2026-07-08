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
  | "waterproofing";

export interface Service {
  id: string;
  title: string;
  description: string;
  serviceLink: string;
  requestLink: string;
  mainImageUrl: string;
  category: ServiceCategory | string;
  order: number;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | "ICI"
  | "architectural cladding"
  | "residential roofing"
  | "waterproofing";

export interface Project {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  category: ProjectCategory[] | string[];
  order: number;
}

export interface ListSection {
  title?: string;
  items: string[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  slug: string;
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
