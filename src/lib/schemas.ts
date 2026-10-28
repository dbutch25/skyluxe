import { z } from "zod";
import {
  PROJECT_CATEGORIES,
  PROJECT_SECTORS,
  PROJECT_SERVICES,
  PROJECT_SYSTEMS,
} from "@/lib/project-options";

// ─── Shared ───────────────────────────────────────────────────────────────────

const cloudinaryUrl = z
  .string()
  .url()
  .refine(
    (url) =>
      url.startsWith("https://imagedelivery.net") ||
      url.startsWith("https://media.skyluxeroofing.com") ||
      url.startsWith("https://res.cloudinary.com") ||
      url.startsWith("https://lh3.googleusercontent.com") ||
      url === "",
    { message: "Image must be a Cloudinary or Google URL" }
  )
  .or(z.literal(""))
  .optional();

const imageItem = z.object({
  url: z.string().url().or(z.literal("")),
  alt: z.string().max(200).optional(),
});

const listSection = z.object({
  items: z.array(z.string().min(1).max(500)),
});

// ─── Home ─────────────────────────────────────────────────────────────────────

export const HomeVideoSchema = z.object({
  videoLabel: z.string().max(200).optional(),
  videoUrl: z.string().url().or(z.literal("")),
});

export const AboutUsHomeSchema = z.object({
  content: z.record(z.unknown()), // Tiptap JSON
});

export const HomeGallerySchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  imageUrl: z.string().url(),
  isFeatured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

// ─── Services ─────────────────────────────────────────────────────────────────

export const ServiceCarouselSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  serviceLink: z.string().min(1).max(200),
  requestLink: z.string().min(1).max(200),
  // Empty = homepage falls back to a default image for the category
  mainImageUrl: z.string().url().or(z.literal("")).default(""),
  category: z.enum([
    "ICI-roofing",
    "architectural-cladding",
    "residential-roofing",
    "repairs",
    "waterproofing",
    "restoration",
  ]),
  points: z.array(z.string().trim().min(1).max(120)).max(8).default([]),
  order: z.number().int().min(0).default(0),
});

// ─── Projects ─────────────────────────────────────────────────────────────────

// Option lists live in lib/project-options.ts.
export {
  PROJECT_CATEGORIES,
  PROJECT_SECTORS,
  PROJECT_SERVICES,
  PROJECT_SYSTEMS,
} from "@/lib/project-options";

const slugField = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens");

/** Optional text that also accepts null, since that's what Prisma returns for empty columns. */
const optionalText = (max: number) => z.string().max(max).nullish();

/** Same as cloudinaryUrl, but tolerates null coming back from the database. */
const optionalImageUrl = cloudinaryUrl.nullable();

export const ProjectPageSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugField,
  imageUrl: z.string().url().or(z.literal("")).optional(),
  category: z.array(z.enum(PROJECT_CATEGORIES)).default([]),
  sector: z.enum(PROJECT_SECTORS).nullish(),
  // Every service the project covers; the first is its main service.
  services: z.array(z.enum(PROJECT_SERVICES)).default([]),
  systems: z.array(z.enum(PROJECT_SYSTEMS)).default([]),
  year: z
    .number()
    .int()
    .min(1950)
    .max(new Date().getFullYear() + 1)
    .nullish(),
  city: optionalText(120),
  latitude: z.number().min(-90).max(90).nullish(),
  longitude: z.number().min(-180).max(180).nullish(),
  order: z.number().int().min(0).default(0),
  published: z.boolean().optional(),
  // false = map pin only: shown on the homepage map, no detail page or /projects card.
  hasDetailPage: z.boolean().optional(),
  projectId: z.string().cuid().nullish(),
});

export const ProjectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugField,

  // Hero + write-up
  subtitle: optionalText(200),
  blurb: optionalText(1000),
  overview: z.array(z.string().min(1).max(3000)).max(12).optional(),
  underConstruction: z.boolean().optional(),

  // Flexible blocks (Json columns; null clears them, see toPrismaJson)
  facts: z
    .array(z.object({ label: z.string().min(1).max(60), value: z.string().min(1).max(200) }))
    .max(12)
    .nullish(),
  highlight: z
    .object({
      label: z.string().max(60).optional(),
      title: z.string().min(1).max(200),
      body: z.string().max(2000).optional(),
      imageUrl: z.string().url().optional(),
    })
    .nullish(),
  chapters: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        body: z.array(z.string().min(1).max(5000)).max(10),
        items: z.array(z.string().min(1).max(500)).max(40).optional(),
        imageUrl: z.string().url().optional(),
      })
    )
    .max(12)
    .nullish(),
  video: z
    .object({
      id: z.string().min(1).max(60),
      title: z.string().max(200).optional(),
      body: z.string().max(1000).optional(),
      vertical: z.boolean().optional(),
    })
    .nullish(),
  sequenceCaptions: z.array(z.string().max(300)).max(5).optional(),
  // Project photo library and the photos left out of automatic placement.
  photos: z.array(z.string().url()).max(500).optional(),
  skipPhotos: z.array(z.string().url()).max(500).optional(),

  // Overview photo picks: slot id → image URL, or "none" to leave the slot empty.
  overviewImages: z
    .record(z.string().max(40), z.union([z.string().url(), z.literal("none")]))
    .nullish(),
  area: optionalText(120),
  scope: optionalText(5000),
  challenge: optionalText(5000),
  solution: optionalText(5000),

  // Scope of work. Json columns accept null here; API routes convert it to
  // Prisma.JsonNull with toPrismaJson() so clearing a block really clears it.
  listSections: z
    .array(
      z.object({
        title: z.string().max(200).optional(),
        items: z.array(z.string().min(1).max(500)),
      })
    )
    .nullish(),

  // Media
  images: z.array(z.string().url()).max(20).optional(),
  carouselImages: z.array(z.string().url()).max(50).optional(),
  droneImageUrl: optionalImageUrl,
  droneVideoId: optionalText(60),
  droneDuration: optionalText(20),

  // Legacy fields: kept so older records still validate, but no longer
  // rendered on the public detail page or shown in the editor.
  backgroundVideoUrl: z.string().url().or(z.literal("")).nullish(),
  fallbackImageUrl: optionalImageUrl,
  content: optionalText(10000),
  mainImageUrl: optionalImageUrl,
  extraContent: optionalText(10000),
  extraImageUrl: optionalImageUrl,
  fullWidthImageUrl: optionalImageUrl,
  centeredText: optionalText(5000),
  firstEmbed: optionalText(20),
  secondEmbed: optionalText(20),
  thirdEmbed: optionalText(20),
});

// ─── Service Pages ────────────────────────────────────────────────────────────

export const RepairsSchema = z.object({
  title: z.string().min(1).max(200),
  firstContent: z.string().max(5000).optional(),
  secondContent: z.string().max(5000).optional(),
  firstImageUrl: z.string().url().or(z.literal("")).optional(),
  firstImageAlt: z.string().max(200).optional(),
  thirdContent: z.string().max(5000).optional(),
  images: z.array(imageItem).max(20).optional(),
  listSections: z.array(listSection).max(10).optional(),
});

export const WaterproofingSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  accordionItems: z
    .array(
      z.object({
        accordionTitle: z.string().min(1).max(300),
        accordionContent: z.string().max(2000),
      })
    )
    .max(20)
    .optional(),
  gallery: z
    .array(z.object({ url: z.string().url(), galleryAlt: z.string().max(200).optional() }))
    .max(50)
    .optional(),
  manufacturersGallery: z
    .array(
      z.object({ url: z.string().url(), manufacturerAlt: z.string().max(200).optional() })
    )
    .max(50)
    .optional(),
});

export const ICIRoofingSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().max(5000).optional(),
  firstTitle: z.string().max(200).optional(),
  firstContent: z.string().max(5000).optional(),
  firstImageUrl: z.string().url().or(z.literal("")).optional(),
  firstImageAlt: z.string().max(200).optional(),
  secondImageUrl: z.string().url().or(z.literal("")).optional(),
  secondImageAlt: z.string().max(200).optional(),
  secondContent: z.string().max(5000).optional(),
  thirdContent: z.string().max(5000).optional(),
  secondTitle: z.string().max(200).optional(),
  listSections: z.array(listSection).max(10).optional(),
  listItem: z.string().max(500).optional(),
  galleryImages: z.array(imageItem).max(50).optional(),
  extraTitle: z.string().max(200).optional(),
  carouselMImages: z.array(imageItem).max(50).optional(),
});

export const CladdingSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().max(5000).optional(),
  listSections: z.array(listSection).max(10).optional(),
  galleryImages: z.array(imageItem).max(50).optional(),
  extraTitle: z.string().max(200).optional(),
  extraContent: z.string().max(5000).optional(),
  carouselMImages: z.array(imageItem).max(50).optional(),
  carouselADImages: z.array(imageItem).max(50).optional(),
});

export const ResidentialSchema = z.object({
  title: z.string().min(1).max(200),
  backgroundImageUrl: z.string().url().or(z.literal("")).optional(),
  backgroundImageAlt: z.string().max(200).optional(),
}).passthrough(); // passthrough for all the other fields - residential is very large

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TestimonialSchema = z.object({
  quote: z.string().min(1).max(2000),
  name: z.string().min(1).max(200),
  imgUrl: z.string().url().or(z.literal("")).optional(),
  order: z.number().int().min(0).default(0),
});

// ─── Careers ──────────────────────────────────────────────────────────────────

export const CareerSchema = z.object({
  title: z.string().min(1).max(200),
  location: z.string().min(1).max(200),
  jobType: z.string().min(1).max(100),
  applyUrl: z.string().url(),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

// ─── Contact forms ────────────────────────────────────────────────────────────

export const ContactFormSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  number: z.string().regex(/^\+?[\d\s\-().]{7,20}$/, "Invalid phone number"),
  message: z.string().min(1).max(5000),
});

export const RequestFormSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  number: z.string().regex(/^\+?[\d\s\-().]{7,20}$/, "Invalid phone number"),
  serviceType: z.enum([
    "Residential Roofing",
    "ICI Roofing",
    "Repairs",
    "Waterproofing",
    "Architectural Cladding",
    "Restoration",
  ]),
  scopeOfWork: z.string().min(1).max(5000),
});
// ─── Restoration ─────────────────────────────────────────────────────────────

export const RestorationSchema = z.object({
  title: z.string().min(1).max(200),
  introText: z.string().max(5000).optional(),
  heroImageUrl: z.string().url().or(z.literal('')).optional(),
  heroImageAlt: z.string().max(200).optional(),
  galleryImages: z.array(imageItem).max(30).optional(),
});

// ─── News & Charity ───────────────────────────────────────────────────────────

export const POST_CATEGORIES = [
  "Project Update",
  "Community",
  "Roofing Tips",
  "Company News",
] as const;

/** Internal path ("/news/recap") or full https URL; empty clears it. */
const linkField = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//.test(v), {
    message: "Use a page path like /news/my-post or a full https:// link",
  });

export const PostSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only"),
  category: z.enum(POST_CATEGORIES),
  excerpt: z.string().trim().min(1).max(300),
  content: z.record(z.unknown()).nullable().optional(), // Tiptap JSON
  coverImageUrl: z.string().url().or(z.literal("")).optional(),
  coverImageAlt: z.string().max(200).optional(),
  published: z.boolean().default(false),
  // ISO date string; set automatically when first published if empty
  publishedAt: z.string().datetime().nullable().optional(),
});

export const CharitySpotlightSchema = z.object({
  enabled: z.boolean(),
  label: z.string().trim().max(100),
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(2000),
  imageUrl: z.string().url().or(z.literal("")).optional(),
  imageAlt: z.string().max(200).optional(),
  nextEvent: z.string().trim().max(60).optional(),
  raisedToDate: z.string().trim().max(60).optional(),
  venue: z.string().trim().max(100).optional(),
  causeTitle: z.string().trim().max(150).optional(),
  causeBody: z.string().trim().max(600).optional(),
  recapLink: linkField.optional(),
  donateLink: linkField.optional(),
});
