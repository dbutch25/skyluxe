import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/session";
import { extractProject } from "@/lib/project-import/extract";

// One model call per document; usually a few seconds, but allow headroom.
export const maxDuration = 60;

const BodySchema = z.object({
  fileName: z.string().min(1).max(255),
  html: z.string().min(1, "The document is empty").max(200_000, "The document is too long"),
});

/** POST { fileName, html } → ImportDraft. Nothing is saved here. */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const parsed = BodySchema.safeParse(await request.json());
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const draft = await extractProject(parsed.data.fileName, parsed.data.html);
    return NextResponse.json(draft);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("Project import failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Import failed" },
      { status: 500 }
    );
  }
}
