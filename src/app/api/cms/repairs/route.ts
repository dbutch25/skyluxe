import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { RepairsSchema } from "@/lib/schemas";

export async function GET() {
  try {
    const data = await db.repairs.findFirst();
    return NextResponse.json(data ?? null);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const parsed = RepairsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }
    const existing = await db.repairs.findFirst();
    const data = existing
      ? await db.repairs.update({ where: { id: existing.id }, data: parsed.data })
      : await db.repairs.create({ data: parsed.data });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
