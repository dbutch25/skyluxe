import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { NavMenuSchema } from "@/lib/schemas";
import { buildNavServices, type NavMenuContent } from "@/lib/nav-menu";

/** GET → the full services list as the dropdown shows it (saved content or defaults). */
export async function GET() {
  try {
    const row = await db.navMenu.findFirst();
    return NextResponse.json(buildNavServices((row?.services as NavMenuContent | undefined) ?? null));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** PUT { services: { [serviceId]: { description, items } } } */
export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const parsed = NavMenuSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    const existing = await db.navMenu.findFirst({ select: { id: true } });
    const saved = existing
      ? await db.navMenu.update({ where: { id: existing.id }, data: { services: parsed.data.services } })
      : await db.navMenu.create({ data: { services: parsed.data.services } });

    // Every page shows the header, so refresh the cached menu straight away.
    revalidateTag("nav-menu", { expire: 0 });
    return NextResponse.json(buildNavServices(saved.services as NavMenuContent));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
