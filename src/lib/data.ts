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
import { buildNavServices, type NavMenuContent, type NavService } from "@/lib/nav-menu";
import type {
  HomeVideo,
  RestorationPage,
  AboutUsHome,
  GalleryItem,
  Service,
  Project,
  ProjectFull,
  Testimonial,
  Career,
  RepairsPage,
  WaterproofingPage,
  ICIRoofingPage,
  CladdingPage,
  ResidentialPage,
  Post,
  PostSummary,
  CharitySpotlight,
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

// ─── Navigation ───────────────────────────────────────────────────────────────

/** Services dropdown content for the header (saved in Admin → Navigation). */
export const fetchNavServices = cachedRead<NavService[]>("nav-menu", async () => {
  const row = await db.navMenu.findFirst();
  return buildNavServices((row?.services as NavMenuContent | undefined) ?? null);
});

/** Published projects with a detail page: the /projects grid and related projects. */
export const fetchProjects = cachedRead<Project[]>(
  "project-pages",
  () =>
    db.projectPage.findMany({
      where: { published: true, hasDetailPage: true },
      orderBy: { order: "asc" },
    })
);

/** Everything published, including map-only pins: the homepage map. */
export const fetchMapProjects = cachedRead<Project[]>(
  "project-map",
  () =>
    db.projectPage.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    })
);

export async function fetchProjectBySlug(
  slug: string
): Promise<ProjectFull | null> {
  const page = await db.projectPage.findFirst({
    where: { slug, published: true, hasDetailPage: true },
    include: { project: true },
  });
  return (page as ProjectFull | null) ?? null;
}

/**
 * Admin preview: any project by ProjectPage id, published or not.
 * Not cached, so edits show up straight away. Callers must check the session.
 */
export async function fetchProjectForPreview(
  id: string
): Promise<ProjectFull | null> {
  const page = await db.projectPage.findUnique({
    where: { id },
    include: { project: true },
  });
  return (page as ProjectFull | null) ?? null;
}

/**
 * Related projects: other projects sharing a service, those sharing the main
 * service first. Falls back to any other projects when nothing matches, so the
 * section is never empty on a small portfolio.
 */
export async function fetchRelatedProjects(
  slug: string,
  services: string[] = []
): Promise<Project[]> {
  const all = await fetchProjects();
  const others = all.filter((p) => p.slug !== slug);
  const [main] = services;
  const matched = others
    .filter((p) => p.services?.some((s) => services.includes(s)))
    .sort(
      (a, b) =>
        Number(b.services?.includes(main) ?? false) -
        Number(a.services?.includes(main) ?? false)
    );
  return (matched.length > 0 ? matched : others).slice(0, 3);
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

// ─── News & Charity ───────────────────────────────────────────────────────────

/** Fields for cards and lists; leaves out the post body. */
const postSummarySelect = {
  id: true,
  title: true,
  slug: true,
  category: true,
  excerpt: true,
  coverImageUrl: true,
  coverImageAlt: true,
  published: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

/** Every published post, newest first (cached under the "posts" tag). */
export const fetchPublishedPosts = cachedRead<PostSummary[]>("posts", () =>
  db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: postSummarySelect,
  })
);

export async function fetchLatestPosts(limit = 3): Promise<PostSummary[]> {
  const all = await fetchPublishedPosts();
  return all.slice(0, limit);
}

/** One published post by slug; shares the "posts" tag so edits show at once. */
export function fetchPostBySlug(slug: string): Promise<Post | null> {
  return unstable_cache(
    async () =>
      (await db.post.findFirst({ where: { slug, published: true } })) as Post | null,
    ["post", slug],
    { revalidate: REVALIDATE_SECONDS, tags: ["posts"] }
  )();
}

export const getCharitySpotlight = cachedRead<CharitySpotlight | null>(
  "charity",
  () => db.charitySpotlight.findFirst()
);
