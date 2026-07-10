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