import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { ICIRoofingSchema } from "@/lib/schemas";

export async function GET() {
  try {
    const data = await db.iCIRoofing.findFirst();
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
    const parsed = ICIRoofingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }
    const existing = await db.iCIRoofing.findFirst();
    const data = existing
      ? await db.iCIRoofing.update({ where: { id: existing.id }, data: parsed.data })
      : await db.iCIRoofing.create({ data: parsed.data });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
