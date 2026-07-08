import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { RestorationSchema } from "@/lib/schemas";

export async function GET() {
  try {
    // @ts-expect-error — model added in next migration
    const data = await db.restoration.findFirst();
    return NextResponse.json(data ?? null);
  } catch {
    // Model not yet in DB — return null so the page falls back to static content
    return NextResponse.json(null);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const parsed = RestorationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    // @ts-expect-error — model added in next migration
    const existing = await db.restoration.findFirst();
    // @ts-expect-error — model added in next migration
    const data = existing
      ? // @ts-expect-error — model added in next migration
        await db.restoration.update({ where: { id: existing.id }, data: parsed.data })
      : // @ts-expect-error — model added in next migration
        await db.restoration.create({ data: parsed.data });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
