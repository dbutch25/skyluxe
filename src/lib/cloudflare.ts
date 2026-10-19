/**
 * src/lib/cloudflare.ts
 *
 * Upload helpers for Cloudflare Images (photos) and Cloudflare R2 (video).
 *
 * Photos go to Images, which resizes and reformats on delivery. Video goes to
 * R2, plain object storage: far cheaper than Stream for a single looping
 * background clip, and it serves a real MP4 so <video src> works everywhere
 * with no HLS player and no transcode wait.
 *
 * Required environment variables:
 *   CLOUDFLARE_ACCOUNT_ID              account id from the dashboard URL
 *   CLOUDFLARE_API_TOKEN               token with Images:Edit
 *   NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH account hash for imagedelivery.net
 *   R2_ACCESS_KEY_ID                   R2 API token access key
 *   R2_SECRET_ACCESS_KEY               R2 API token secret
 *   R2_BUCKET_NAME                     bucket holding the video files
 *   NEXT_PUBLIC_R2_PUBLIC_URL          public custom domain for the bucket
 *
 * Images are delivered as https://imagedelivery.net/<hash>/<imageId>/<variant>
 * Video is delivered as   https://<your-r2-domain>/<key>
 *
 * R2 does not transcode. Upload H.264 MP4 files: H.265/HEVC (what phones
 * record) will not decode in Chrome or Firefox.
 */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const API_BASE = "https://api.cloudflare.com/client/v4";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const CF_IMAGES_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH ?? "";
export const R2_PUBLIC_URL = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "").replace(/\/$/, "");

export interface CloudflareUploadResult {
  url: string;
  id: string;
  resourceType: "image" | "video";
  thumbnailUrl?: string;
}

interface CfResponse<T> {
  success: boolean;
  errors: { code: number; message: string }[];
  result: T;
}

async function cfFetch<T>(path: string, init: RequestInit): Promise<T> {
  const token = requireEnv("CLOUDFLARE_API_TOKEN");
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });

  const json = (await res.json()) as CfResponse<T>;
  if (!res.ok || !json.success) {
    const detail =
      json.errors?.map((e) => `${e.code}: ${e.message}`).join("; ") ??
      `HTTP ${res.status}`;
    throw new Error(`Cloudflare API error — ${detail}`);
  }
  return json.result;
}

/**
 * Uploads an image to Cloudflare Images and returns its delivery URL.
 * `folder` is stored as metadata since Cloudflare Images has no real folders.
 */
export async function uploadImage(
  buffer: Buffer,
  filename: string,
  folder: string
): Promise<CloudflareUploadResult> {
  const accountId = requireEnv("CLOUDFLARE_ACCOUNT_ID");

  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(buffer)]), filename);
  form.append("metadata", JSON.stringify({ folder }));
  form.append("requireSignedURLs", "false");

  const result = await cfFetch<{ id: string; variants: string[] }>(
    `/accounts/${accountId}/images/v1`,
    { method: "POST", body: form }
  );

  // Prefer the "public" variant when it exists, else the first one returned.
  const url =
    result.variants.find((v) => v.endsWith("/public")) ?? result.variants[0];

  return { url, id: result.id, resourceType: "image" };
}

/**
 * One-time URL the browser can upload a photo to directly, so large files
 * never pass through Vercel (whose request bodies are capped at 4.5 MB).
 * The URL expires after 30 minutes. Returns the image's future delivery URL.
 */
export async function createDirectImageUpload(
  folder: string
): Promise<{ id: string; uploadURL: string; url: string }> {
  const accountId = requireEnv("CLOUDFLARE_ACCOUNT_ID");
  const hash = requireEnv("NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH");

  const form = new FormData();
  form.append("requireSignedURLs", "false");
  form.append("metadata", JSON.stringify({ folder }));

  const result = await cfFetch<{ id: string; uploadURL: string }>(
    `/accounts/${accountId}/images/v2/direct_upload`,
    { method: "POST", body: form }
  );

  return { ...result, url: `https://imagedelivery.net/${hash}/${result.id}/public` };
}

let r2Client: S3Client | null = null;

function getR2(): S3Client {
  if (r2Client) return r2Client;
  const accountId = requireEnv("CLOUDFLARE_ACCOUNT_ID");
  r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });
  return r2Client;
}

/**
 * Uploads a video to R2 and returns its public URL.
 *
 * The key is prefixed with a timestamp so re-uploading a file of the same name
 * never overwrites the previous one. A long cache header is safe because the
 * key changes whenever the file does.
 */
export async function uploadVideo(
  buffer: Buffer,
  filename: string,
  contentType = "video/mp4"
): Promise<CloudflareUploadResult> {
  const bucket = requireEnv("R2_BUCKET_NAME");
  if (!R2_PUBLIC_URL) {
    throw new Error(
      "Missing NEXT_PUBLIC_R2_PUBLIC_URL - connect a custom domain to the R2 bucket first."
    );
  }

  const safeName = filename.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120);
  const key = `videos/${Date.now()}-${safeName}`;

  await getR2().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return {
    url: `${R2_PUBLIC_URL}/${key}`,
    id: key,
    resourceType: "video",
  };
}