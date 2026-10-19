import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/session";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { createDirectImageUpload } from "@/lib/cloudflare";

const BodySchema = z.object({
  count: z.number().int().min(1).max(50),
  folder: z.string().max(100).optional(),
});

/**
 * POST { count, folder? } → [{ id, uploadURL, url }]
 *
 * Hands the admin's browser one-time Cloudflare upload URLs for a batch of
 * photos. The files go straight from the browser to Cloudflare; this route
 * never sees them.
 */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const ip = getClientIp(request.headers);
    const { allowed } = rateLimit(`photo-urls:${ip}`, 30, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: "Too many uploads at once. Wait a minute and try again." }, { status: 429 });
    }

    const parsed = BodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const folder = (parsed.data.folder ?? "skyluxe/projects").replace(/[^a-zA-Z0-9/_-]/g, "").slice(0, 100);
    const uploads = await Promise.all(
      Array.from({ length: parsed.data.count }, () => createDirectImageUpload(folder))
    );
    return NextResponse.json(uploads);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("Photo upload URLs failed", error);
    return NextResponse.json({ error: "Could not start the upload" }, { status: 500 });
  }
}
