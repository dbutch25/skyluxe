import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/session";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// Allowed MIME types mapped to their magic bytes (file signatures)
const ALLOWED_SIGNATURES: Record<string, number[][]> = {
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png": [[0x89, 0x50, 0x4e, 0x47]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]], // RIFF....WEBP
  "image/gif": [[0x47, 0x49, 0x46, 0x38]], // GIF8
  "video/mp4": [
    [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // ftyp at offset 4
    [0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70],
  ],
  "video/webm": [[0x1a, 0x45, 0xdf, 0xa3]],
  "video/quicktime": [[0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70]],
};

function detectMimeType(buffer: Buffer): string | null {
  for (const [mime, signatures] of Object.entries(ALLOWED_SIGNATURES)) {
    for (const sig of signatures) {
      if (sig.every((byte, i) => buffer[i] === byte)) {
        return mime;
      }
    }
  }
  // Special check for MP4 (ftyp box can be at different offsets)
  const ftypStr = buffer.toString("ascii", 4, 8);
  if (ftypStr === "ftyp") return "video/mp4";

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Auth check
    await requireAuth();

    // Rate limit: 20 uploads per minute per IP
    const ip = getClientIp(request.headers);
    const { allowed, remaining } = rateLimit(`upload:${ip}`, 20, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many uploads. Please wait a minute." },
        { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) ?? "skyluxe";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 50MB)" },
        { status: 400 }
      );
    }

    // Read file bytes
    const buffer = Buffer.from(await file.arrayBuffer());

    // Verify actual file signature — not just the declared Content-Type
    const detectedMime = detectMimeType(buffer);
    if (!detectedMime) {
      return NextResponse.json(
        { error: "Unsupported or invalid file type" },
        { status: 400 }
      );
    }

    // Also verify the declared type matches the actual bytes
    const declaredMime = file.type.split(";")[0].trim();
    const isVideo = detectedMime.startsWith("video/");

    // Sanitize folder name to prevent path traversal
    const safeFolder = folder
      .replace(/[^a-zA-Z0-9/_-]/g, "")
      .replace(/\.\.+/g, "")
      .slice(0, 100);

    const result = await uploadToCloudinary(buffer, {
      folder: safeFolder || "skyluxe",
      resourceType: isVideo ? "video" : "image",
    });

    return NextResponse.json(
      {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        resourceType: result.resource_type,
      },
      {
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
