import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { ResidentialSchema } from "@/lib/schemas";

// Json columns on Residential. Prisma rejects a plain null for these,
// so null (= never set) is dropped from the update and left unchanged.
const JSON_FIELDS = ["residentialList", "metalsList", "carouselMImages"];

// Set by the database itself; never written from the admin.
const SYSTEM_FIELDS = ["id", "createdAt", "updatedAt"];

export async function GET() {
  try {
    const data = await db.residential.findFirst();
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
    const parsed = ResidentialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    const data: Record<string, unknown> = { ...parsed.data };
    for (const key of SYSTEM_FIELDS) delete data[key];
    for (const key of JSON_FIELDS) if (data[key] === null) delete data[key];

    const existing = await db.residential.findFirst();
    const saved = existing
      ? await db.residential.update({ where: { id: existing.id }, data })
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await db.residential.create({ data: data as any });

    revalidateTag("residential", { expire: 0 }); // page shows changes straight away
    return NextResponse.json(saved);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}