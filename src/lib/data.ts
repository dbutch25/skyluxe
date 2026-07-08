/**
 * src/lib/data.ts
 *
 * Frontend data access layer — fetches from PostgreSQL via CMS API routes.
 * All types are imported from @/types. No type definitions here.
 *
 * Usage:
 *   import { getHomeVideoData } from "@/lib/data"
 *   import type { HomeVideo } from "@/types"
 */

import type {
  HomeVideo,
  RestorationPage,
  AboutUsHome,
  GalleryItem,
  Service,
  Project,
  ProjectDetail,
  Testimonial,
  Career,
  RepairsPage,
  WaterproofingPage,
  ICIRoofingPage,
  CladdingPage,
  ResidentialPage,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/cms${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API fetch failed: ${path}`);
  return res.json();
}

// ─── Home ──────────────────────────────────────────────────────────────────────

export async function getHomeVideoData(): Promise<HomeVideo | null> {
  return apiFetch<HomeVideo | null>("/home-video");
}

export async function getAboutUsHomeData(): Promise<AboutUsHome | null> {
  return apiFetch<AboutUsHome | null>("/about");
}

export async function fetchHomeGalleryData(): Promise<GalleryItem[]> {
  const items = await apiFetch<GalleryItem[]>("/home-gallery");
  return items.filter((i) => !i.isFeatured);
}

export async function fetchHomeGalleryOneData(): Promise<GalleryItem[]> {
  const items = await apiFetch<GalleryItem[]>("/home-gallery");
  return items.filter((i) => i.isFeatured);
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServiceCarouselData(): Promise<Service[]> {
  return apiFetch<Service[]>("/services");
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function fetchProjects(): Promise<Project[]> {
  return apiFetch<Project[]>("/project-pages");
}

export async function fetchProjectBySlug(
  slug: string
): Promise<ProjectDetail | null> {
  const pages = await apiFetch<Array<{ slug: string; projectId?: string }>>(
    "/project-pages"
  );
  const page = pages.find((p) => p.slug === slug);
  if (!page?.projectId) return null;
  return apiFetch<ProjectDetail>(`/projects/${page.projectId}`);
}

// ─── Service pages ────────────────────────────────────────────────────────────

export async function getRepairsPage(): Promise<RepairsPage | null> {
  return apiFetch<RepairsPage | null>("/repairs");
}

export async function getWaterproofingPage(): Promise<WaterproofingPage | null> {
  return apiFetch<WaterproofingPage | null>("/waterproofing");
}

export async function getICIRoofingPage(): Promise<ICIRoofingPage | null> {
  return apiFetch<ICIRoofingPage | null>("/ici");
}

export async function getCladdingPage(): Promise<CladdingPage | null> {
  return apiFetch<CladdingPage | null>("/cladding");
}

export async function fetchResidentialData(): Promise<ResidentialPage | null> {
  return apiFetch<ResidentialPage | null>("/residential");
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>("/testimonials");
}

// ─── Careers ──────────────────────────────────────────────────────────────────

export async function getCareers(): Promise<Career[]> {
  const all = await apiFetch<Career[]>("/careers");
  return all.filter((c) => c.active);
}
// ─── Restoration ──────────────────────────────────────────────────────────────

export async function getRestorationPage(): Promise<RestorationPage | null> {
  return apiFetch<RestorationPage | null>("/restoration");
}
