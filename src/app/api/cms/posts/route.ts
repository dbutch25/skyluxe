import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { PostSchema } from "@/lib/schemas";
import { toPostData, isDuplicateSlug, refreshPosts } from "@/lib/post-data";

const unauthorized = (error: unknown) =>
  error instanceof Error && error.message === "Unauthorized";

/** Admin list: every post including drafts, without the body. */
export async function GET() {
  try {
    await requireAuth();
    const data = await db.post.findMany({
      orderBy: [{ published: "asc" }, { publishedAt: "desc" }, { updatedAt: "desc" }],
      select: {
        id: true, title: true, slug: true, category: true, excerpt: true,
        coverImageUrl: true, coverImageAlt: true, published: true,
        publishedAt: true, createdAt: true, updatedAt: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    if (unauthorized(error)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const parsed = PostSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }
    const data = await db.post.create({
      data: toPostData(parsed.data) as Prisma.PostUncheckedCreateInput,
    });
    refreshPosts();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (unauthorized(error)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (isDuplicateSlug(error)) {
      return NextResponse.json({ error: "Another post already uses this URL slug" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
