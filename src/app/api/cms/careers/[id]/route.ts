import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { CareerSchema } from "@/lib/schemas";

interface Params { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  const data = await db.career.findUnique({ where: { id } });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const parsed = CareerSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }
    const data = await db.career.update({ where: { id }, data: parsed.data });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    await db.career.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
