import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { PostSchema } from "@/lib/schemas";
import { toPostData, isDuplicateSlug, refreshPosts } from "@/lib/post-data";

interface Params { params: Promise<{ id: string }> }

const unauthorized = (error: unknown) =>
  error instanceof Error && error.message === "Unauthorized";

/** Admin only: drafts must not be readable publicly. */
export async function GET(_: NextRequest, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    const data = await db.post.findUnique({ where: { id } });
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    if (unauthorized(error)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    const parsed = PostSchema.partial().safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }
    const existing = await db.post.findUnique({ where: { id }, select: { publishedAt: true } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = await db.post.update({
      where: { id },
      data: toPostData(parsed.data, existing.publishedAt),
    });
    refreshPosts();
    return NextResponse.json(data);
  } catch (error) {
    if (unauthorized(error)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (isDuplicateSlug(error)) {
      return NextResponse.json({ error: "Another post already uses this URL slug" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    await db.post.delete({ where: { id } });
    refreshPosts();
    return NextResponse.json({ success: true });
  } catch (error) {
    if (unauthorized(error)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
