/**
 * src/lib/data.ts
 *
 * Frontend data access layer — reads directly from PostgreSQL via Prisma.
 *
 * These functions run in Server Components (including at build time during
 * static generation), so they must NOT fetch the app's own API routes over
 * HTTP: there is no server listening during `next build`, which causes
 * ECONNREFUSED prerender failures. Querying the database directly is faster,
 * build-safe, and avoids the self-referential network hop. The /api/cms/*
 * routes remain for authenticated CMS writes (POST/PUT/PATCH/DELETE).
 *
 * Reads are wrapped in `unstable_cache` (60s revalidate) to preserve the
 * incremental-revalidation behaviour the previous `fetch(..., { next: {
 * revalidate: 60 } })` calls provided.
 *
 * Prisma types `Json` columns as `JsonValue` and includes row timestamps.
 * The `@/types` interfaces describe the narrower, UI-facing shape (e.g. Tiptap
 * JSON as `object`, image arrays as typed records). We therefore cast each
 * result to its declared type at the boundary — the same coercion the previous
 * `res.json() as T` performed — after Zod-validated writes guarantee the shape.
 */

import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
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

const REVALIDATE_SECONDS = 60;

/**
 * Wrap a DB read in Next's data cache with a shared revalidate window, casting
 * the Prisma row(s) to the UI-facing type declared in `@/types`.
 */
function cachedRead<T>(key: string, query: () => Promise<unknown>) {
  return unstable_cache(async () => (await query()) as T, [key], {
    revalidate: REVALIDATE_SECONDS,
    tags: [key],
  });
}

// ─── Home ──────────────────────────────────────────────────────────────────────

export const getHomeVideoData = cachedRead<HomeVideo | null>(
  "home-video",
  () => db.homeVideo.findFirst()
);

export const getAboutUsHomeData = cachedRead<AboutUsHome | null>(
  "about",
  () => db.aboutUsHome.findFirst()
);

const getHomeGallery = cachedRead<GalleryItem[]>(
  "home-gallery",
  () => db.homeGallery.findMany({ orderBy: { order: "asc" } })
);

export async function fetchHomeGalleryData(): Promise<GalleryItem[]> {
  const items = await getHomeGallery();
  return items.filter((i) => !i.isFeatured);
}

export async function fetchHomeGalleryOneData(): Promise<GalleryItem[]> {
  const items = await getHomeGallery();
  return items.filter((i) => i.isFeatured);
}

// ─── Services ─────────────────────────────────────────────────────────────────

export const getServiceCarouselData = cachedRead<Service[]>(
  "services",
  () => db.serviceCarousel.findMany({ orderBy: { order: "asc" } })
);

// ─── Projects ─────────────────────────────────────────────────────────────────

export const fetchProjects = cachedRead<Project[]>(
  "project-pages",
  () => db.projectPage.findMany({ orderBy: { order: "asc" } })
);

export async function fetchProjectBySlug(
  slug: string
): Promise<ProjectDetail | null> {
  const page = await db.projectPage.findUnique({ where: { slug } });
  if (!page?.projectId) return null;
  return db.project.findUnique({
    where: { id: page.projectId },
  }) as Promise<ProjectDetail | null>;
}

// ─── Service pages ────────────────────────────────────────────────────────────

export const getRepairsPage = cachedRead<RepairsPage | null>(
  "repairs",
  () => db.repairs.findFirst()
);

export const getWaterproofingPage = cachedRead<WaterproofingPage | null>(
  "waterproofing",
  () => db.waterproofing.findFirst()
);

export const getICIRoofingPage = cachedRead<ICIRoofingPage | null>(
  "ici",
  () => db.iCIRoofing.findFirst()
);

export const getCladdingPage = cachedRead<CladdingPage | null>(
  "cladding",
  () => db.cladding.findFirst()
);

export const fetchResidentialData = cachedRead<ResidentialPage | null>(
  "residential",
  () => db.residential.findFirst()
);

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const getTestimonials = cachedRead<Testimonial[]>(
  "testimonials",
  () => db.testimonial.findMany({ orderBy: { order: "asc" } })
);

// ─── Careers ──────────────────────────────────────────────────────────────────

const getAllCareers = cachedRead<Career[]>(
  "careers",
  () => db.career.findMany({ orderBy: { order: "asc" } })
);

export async function getCareers(): Promise<Career[]> {
  const all = await getAllCareers();
  return all.filter((c) => c.active);
}

// ─── Restoration ──────────────────────────────────────────────────────────────

export const getRestorationPage = cachedRead<RestorationPage | null>(
  "restoration",
  () => db.restoration.findFirst()
);