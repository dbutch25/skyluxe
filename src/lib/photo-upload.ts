/**
 * Browser-side bulk photo upload.
 *
 * Each photo is re-saved in the browser before upload:
 *   - camera metadata (including GPS location) is dropped,
 *   - the longest edge is capped at 3200px, which keeps files well under
 *     Cloudflare's 10 MB limit while staying sharp on large screens.
 * Files then go directly to Cloudflare through one-time upload URLs.
 */

const MAX_EDGE = 3200;
const JPEG_QUALITY = 0.88;
const CONCURRENCY = 4;
const URL_BATCH = 50; // matches the API route's limit

/** Re-encodes a photo without metadata. Falls back to the original file if the browser can't decode it (e.g. HEIC outside Safari). */
export async function preparePhoto(file: File): Promise<Blob> {
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
    return blob ?? file;
  } catch {
    return file;
  }
}

export interface UploadProgress {
  done: number;
  total: number;
  failed: string[]; // file names
}

interface UploadTarget {
  uploadURL: string;
  url: string;
}

async function requestTargets(count: number, folder: string): Promise<UploadTarget[]> {
  const targets: UploadTarget[] = [];
  for (let start = 0; start < count; start += URL_BATCH) {
    const res = await fetch("/api/cms/photos/upload-urls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: Math.min(URL_BATCH, count - start), folder }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error ?? "Could not start the upload");
    targets.push(...(data as UploadTarget[]));
  }
  return targets;
}

/**
 * Uploads photos and returns their delivery URLs in the order the files were
 * given. Failed files are skipped and reported through onProgress.
 */
export async function uploadPhotos(
  files: File[],
  { folder = "skyluxe/projects", onProgress }: { folder?: string; onProgress?: (p: UploadProgress) => void } = {}
): Promise<string[]> {
  const images = files.filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name));
  const progress: UploadProgress = { done: 0, total: images.length, failed: [] };
  onProgress?.({ ...progress });
  if (!images.length) return [];

  const targets = await requestTargets(images.length, folder);
  const results: (string | null)[] = new Array(images.length).fill(null);

  let next = 0;
  const worker = async () => {
    while (next < images.length) {
      const i = next++;
      const file = images[i];
      try {
        const prepared = await preparePhoto(file);
        const name = prepared === file ? file.name : file.name.replace(/\.\w+$/, "") + ".jpg";
        const body = new FormData();
        body.append("file", prepared, name);
        const res = await fetch(targets[i].uploadURL, { method: "POST", body });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        results[i] = targets[i].url;
      } catch {
        progress.failed.push(file.name);
      }
      progress.done++;
      onProgress?.({ ...progress, failed: [...progress.failed] });
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, images.length) }, worker));

  return results.filter((u): u is string => !!u);
}
