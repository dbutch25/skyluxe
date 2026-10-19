import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { CharitySpotlightSchema } from "@/lib/schemas";

export async function GET() {
  try {
    const data = await db.charitySpotlight.findFirst();
    return NextResponse.json(data ?? null);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const parsed = CharitySpotlightSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    // Store blank optional fields as null so the homepage hides them
    const { enabled, label, title, body, ...optional } = parsed.data;
    const data = {
      enabled,
      label,
      title,
      body,
      ...Object.fromEntries(
        Object.entries(optional).map(([k, v]) => [k, v ? v : null])
      ),
    };

    const existing = await db.charitySpotlight.findFirst({ select: { id: true } });
    const saved = existing
      ? await db.charitySpotlight.update({ where: { id: existing.id }, data })
      : await db.charitySpotlight.create({ data });

    revalidateTag("charity", { expire: 0 });
    return NextResponse.json(saved);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
