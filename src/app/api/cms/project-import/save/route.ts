import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { ProjectPageSchema, ProjectSchema } from "@/lib/schemas";
import { toPrismaJson } from "@/lib/prisma-json";

const BodySchema = z.object({
  card: ProjectPageSchema.omit({ projectId: true, order: true, published: true }),
  detail: ProjectSchema.pick({
    subtitle: true,
    blurb: true,
    overview: true,
    area: true,
    underConstruction: true,
    facts: true,
    listSections: true,
    highlight: true,
    chapters: true,
    video: true,
  }),
});

/**
 * POST { card, detail } → creates the listing card and detail page together.
 * A single nested create, so you never end up with a card that has no detail.
 */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const parsed = BodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }
    const { card, detail } = parsed.data;

    const [pageWithSlug, projectWithSlug] = await Promise.all([
      db.projectPage.findUnique({ where: { slug: card.slug }, select: { id: true } }),
      db.project.findUnique({ where: { slug: card.slug }, select: { id: true } }),
    ]);
    if (pageWithSlug || projectWithSlug) {
      return NextResponse.json(
        { error: `The slug "${card.slug}" is already used by another project. Change it and save again.` },
        { status: 409 }
      );
    }

    // New imports go to the end of the listing.
    const { _max } = await db.projectPage.aggregate({ _max: { order: true } });

    const page = await db.projectPage.create({
      data: {
        ...card,
        imageUrl: card.imageUrl ?? "",
        order: (_max.order ?? -1) + 1,
        published: false, // imports start as drafts until photos are added
        project: {
          create: { title: card.title, slug: card.slug, ...toPrismaJson(detail) },
        },
      },
      select: { id: true, slug: true },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("Project import save failed", error);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}
