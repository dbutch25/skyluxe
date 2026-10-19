/**
 * scripts/migrate-to-cloudflare.ts
 *
 * Moves every Cloudinary asset referenced in the database over to Cloudflare
 * (Images for photos, R2 for video) and rewrites the stored URLs.
 *
 *   pnpm tsx scripts/migrate-to-cloudflare.ts --dry     # report only, no changes
 *   pnpm tsx scripts/migrate-to-cloudflare.ts           # perform the migration
 *
 * Safe to re-run. URLs already pointing at Cloudflare are skipped, and a
 * url-map.json is written so a second pass reuses uploads instead of
 * duplicating them.
 *
 * Requires CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN,
 * NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH, and the four R2_* variables.
 */

import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { uploadImage, uploadVideo } from "../src/lib/cloudflare";

const db = new PrismaClient();
const DRY = process.argv.includes("--dry");
const MAP_PATH = path.join(process.cwd(), "scripts", "url-map.json");

const isCloudinary = (v: unknown): v is string =>
  typeof v === "string" && v.includes("res.cloudinary.com");

const urlMap: Record<string, string> = fs.existsSync(MAP_PATH)
  ? JSON.parse(fs.readFileSync(MAP_PATH, "utf8"))
  : {};

let uploaded = 0;
let skipped = 0;
let failed = 0;

/** Downloads a Cloudinary asset and re-uploads it to Cloudflare. */
async function move(url: string): Promise<string> {
  if (urlMap[url]) {
    skipped++;
    return urlMap[url];
  }
  if (DRY) {
    uploaded++;
    return url;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`download failed (HTTP ${res.status})`);
    const buffer = Buffer.from(await res.arrayBuffer());

    const filename = url.split("/").pop() ?? "asset";
    const isVideo = url.includes("/video/upload/");

    const result = isVideo
      ? await uploadVideo(buffer, filename)
      : await uploadImage(buffer, filename, "skyluxe/migrated");

    urlMap[url] = result.url;
    fs.writeFileSync(MAP_PATH, JSON.stringify(urlMap, null, 2));
    uploaded++;
    console.log(`  ✓ ${filename}`);
    return result.url;
  } catch (error) {
    failed++;
    console.error(`  ✗ ${url}\n    ${(error as Error).message}`);
    return url; // leave the original in place on failure
  }
}

/** Walks a value of any shape, moving every Cloudinary URL it contains. */
async function convert(value: unknown): Promise<unknown> {
  if (isCloudinary(value)) return move(value);
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) out.push(await convert(item));
    return out;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = await convert(v);
    return out;
  }
  return value;
}

/** Migrates every record of one model, updating only the changed fields. */
async function migrateModel(
  label: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: { findMany: () => Promise<any[]>; update: (a: any) => Promise<any> }
) {
  const rows = await model.findMany();
  let touched = 0;

  for (const row of rows) {
    const changes: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(row)) {
      if (key === "id" || key === "createdAt" || key === "updatedAt") continue;
      const json = JSON.stringify(value ?? null);
      if (!json.includes("res.cloudinary.com")) continue;
      changes[key] = await convert(value);
    }

    if (Object.keys(changes).length === 0) continue;
    touched++;
    if (!DRY) await model.update({ where: { id: row.id }, data: changes });
  }

  console.log(
    `${label}: ${touched} of ${rows.length} record(s) ${DRY ? "would be" : ""} updated`
  );
}

async function main() {
  console.log(
    DRY
      ? "DRY RUN — nothing will be uploaded or written\n"
      : "Migrating Cloudinary assets to Cloudflare\n"
  );

  await migrateModel("HomeVideo    ", db.homeVideo);
  await migrateModel("HomeGallery  ", db.homeGallery);
  await migrateModel("AboutUsHome  ", db.aboutUsHome);
  await migrateModel("ServiceCarousel", db.serviceCarousel);
  await migrateModel("ProjectPage  ", db.projectPage);
  await migrateModel("Project      ", db.project);
  await migrateModel("Testimonial  ", db.testimonial);
  await migrateModel("Repairs      ", db.repairs);
  await migrateModel("Waterproofing", db.waterproofing);
  await migrateModel("ICIRoofing   ", db.iCIRoofing);
  await migrateModel("Cladding     ", db.cladding);
  await migrateModel("Residential  ", db.residential);
  await migrateModel("Restoration  ", db.restoration);

  console.log(
    `\n${uploaded} asset(s) ${DRY ? "would be" : ""} uploaded · ${skipped} reused · ${failed} failed`
  );
  if (!DRY) console.log(`URL map written to ${MAP_PATH}`);
  if (failed)
    console.log("\nRe-run to retry the failures. Successful uploads are reused.");

  await db.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});