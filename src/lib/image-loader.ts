"use client";

/**
 * Global next/image loader (set in next.config.ts → images.loaderFile).
 *
 * Images are resized by the service that stores them instead of Vercel's
 * image optimizer, so they don't count toward Vercel image usage:
 *
 *   Cloudflare Images  → flexible variant: .../<hash>/<id>/w=800,q=75,fit=scale-down
 *                        (requires "Flexible variants" enabled in the dashboard)
 *   Cloudinary (legacy) → URL transformation: .../image/upload/f_auto,q_75,w_800,c_limit/...
 *   Local /public files → served as-is from Vercel's CDN
 */
import type { ImageLoaderProps } from "next/image";

const CF_HOST = "https://imagedelivery.net/";

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 75;

  // Cloudflare Images: https://imagedelivery.net/<accountHash>/<imageId>/<variant>
  if (src.startsWith(CF_HOST)) {
    const [hash, id] = src.slice(CF_HOST.length).split("/");
    if (hash && id) return `${CF_HOST}${hash}/${id}/w=${width},q=${q},fit=scale-down`;
  }

  // Cloudinary (older records): add a resize/format transformation.
  if (src.includes("res.cloudinary.com") && src.includes("/image/upload/")) {
    return src.replace("/image/upload/", `/image/upload/f_auto,q_${q},w_${width},c_limit/`);
  }

  // Previews of files being uploaded, and inline data: leave untouched.
  if (src.startsWith("blob:") || src.startsWith("data:")) return src;

  // Local files in /public. The width param keeps next/image's srcset valid;
  // static files ignore it.
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
