import { z } from "zod";

// ─── Shared ───────────────────────────────────────────────────────────────────

const cloudinaryUrl = z
  .string()
  .url()
  .refine(
    (url) =>
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
  mainImageUrl: z.string().url(),
  category: z.enum([
    "ICI-roofing",
    "architectural-cladding",
    "residential-roofing",
    "repairs",
    "waterproofing",
    "restoration",
  ]),
  order: z.number().int().min(0).default(0),
});

// ─── Projects ─────────────────────────────────────────────────────────────────

export const ProjectPageSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  imageUrl: z.string().url().or(z.literal("")).optional(),
  category: z
    .array(
      z.enum(["ICI", "architectural cladding", "residential roofing", "waterproofing"])
    )
    .default([]),
  order: z.number().int().min(0).default(0),
  projectId: z.string().cuid().optional().nullable(),
});

export const ProjectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/),
  backgroundVideoUrl: z.string().url().or(z.literal("")).optional(),
  fallbackImageUrl: cloudinaryUrl,
  content: z.string().max(10000).optional(),
  mainImageUrl: cloudinaryUrl,
  listSections: z
    .array(
      z.object({
        title: z.string().max(200).optional(),
        items: z.array(z.string().min(1).max(500)),
      })
    )
    .optional(),
  extraContent: z.string().max(10000).optional(),
  extraImageUrl: cloudinaryUrl,
  fullWidthImageUrl: cloudinaryUrl,
  centeredText: z.string().max(5000).optional(),
  images: z.array(z.string().url()).max(20).optional(),
  carouselImages: z.array(z.string().url()).max(50).optional(),
  firstEmbed: z.string().max(20).optional(),
  secondEmbed: z.string().max(20).optional(),
  thirdEmbed: z.string().max(20).optional(),
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
