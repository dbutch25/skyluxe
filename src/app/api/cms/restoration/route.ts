import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { RestorationSchema } from "@/lib/schemas";

export async function GET() {
  try {
    const data = await db.restoration.findFirst();
    return NextResponse.json(data ?? null);
  } catch {
    // Return null so the page falls back to static content
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
    const existing = await db.restoration.findFirst();
    const data = existing
      ? await db.restoration.update({ where: { id: existing.id }, data: parsed.data })
      : await db.restoration.create({ data: parsed.data });
    revalidateTag("restoration", { expire: 0 }); // page shows changes straight away
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}