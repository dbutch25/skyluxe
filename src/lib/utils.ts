import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a usable image URL, falling back to a local asset when the value is
 * empty or a "placeholder" sentinel (e.g. an un-uploaded Cloudinary path like
 * `skyluxe/placeholder.jpg`, which 404s through the image optimizer).
 */
export function safeImageUrl(
  url: string | null | undefined,
  fallback = "/images/serviceHero.jpg"
): string {
  if (!url || url.trim() === "" || url.includes("placeholder")) return fallback;
  return url;
}

/**
 * Normalizes an image URL for truthy-guarded renders: returns `undefined` for
 * empty or "placeholder" sentinel values so `url ? <Image/> : <fallback/>`
 * blocks correctly show their designed fallback instead of a broken image.
 */
export function cleanImageUrl(
  url: string | null | undefined
): string | undefined {
  if (!url || url.trim() === "" || url.includes("placeholder")) return undefined;
  return url;
}
/**
 * Returns a browser-safe video URL.
 *
 * R2 serves the MP4 exactly as uploaded, so nothing needs rewriting there.
 * Legacy Cloudinary URLs still get `f_auto,q_auto` so existing records keep
 * playing until the migration finishes.
 */
export function videoUrl(url: string | null | undefined): string {
  if (!url) return "";

  // Legacy Cloudinary: transcode on delivery
  if (url.includes("/video/upload/")) {
    if (/\/video\/upload\/[^/]*(f_auto|q_auto)/.test(url)) return url;
    return url.replace("/video/upload/", "/video/upload/f_auto,q_auto/");
  }

  return url;
}

/**
 * Swaps the variant on a Cloudflare Images delivery URL.
 * Cloudflare Images URLs end in the variant name, e.g. .../<id>/public
 * Non-Cloudflare URLs are returned unchanged.
 */
export function cfImage(url: string | null | undefined, variant = "public"): string {
  if (!url) return "";
  if (!url.includes("imagedelivery.net")) return url;
  return url.replace(/\/[^/]+$/, `/${variant}`);
}

/**
 * Turns a title into a URL slug that passes the schema's /^[a-z0-9-]+$/ check.
 * "Smith & Co. — Phase 2" → "smith-co-phase-2"
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Accepts a bare YouTube id or any common YouTube URL and returns just the id.
 * Leaves the input untouched when it doesn't look like a YouTube URL.
 */
export function youtubeId(input: string): string {
  const value = input.trim();
  const match = value.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : value;
}