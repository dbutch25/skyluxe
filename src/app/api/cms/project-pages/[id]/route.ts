import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { ProjectPageSchema } from "@/lib/schemas";

interface Params { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  const data = await db.projectPage.findUnique({ where: { id } });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const parsed = ProjectPageSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }
    const data = await db.projectPage.update({ where: { id }, data: parsed.data });
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

    const page = await db.projectPage.findUnique({ where: { id }, select: { projectId: true } });
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Remove the listing card and its detail page together, so the detail
    // page doesn't linger and keep holding the slug.
    await db.$transaction([
      db.projectPage.delete({ where: { id } }),
      ...(page.projectId ? [db.project.delete({ where: { id: page.projectId } })] : []),
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
