/**
 * Prisma won't accept a plain `null` for a Json column; it needs
 * Prisma.JsonNull. Zod lets these fields be null (that's how the editor says
 * "clear this block"), so API routes pass their parsed data through here first.
 *
 * Server-only: imports @prisma/client.
 */
import { Prisma } from "@prisma/client";

const JSON_FIELDS = ["listSections", "facts", "highlight", "chapters", "video", "overviewImages"] as const;
type JsonField = (typeof JSON_FIELDS)[number];

type WithPrismaJson<T> = {
  [K in keyof T]: K extends JsonField
    ? Exclude<T[K], null> | (null extends T[K] ? typeof Prisma.JsonNull : never)
    : T[K];
};

export function toPrismaJson<T extends Record<string, unknown>>(data: T): WithPrismaJson<T> {
  const out: Record<string, unknown> = { ...data };
  for (const key of JSON_FIELDS) {
    if (out[key] === null) out[key] = Prisma.JsonNull;
  }
  return out as WithPrismaJson<T>;
}
