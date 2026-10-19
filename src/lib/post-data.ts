/**
 * Shared helpers for the /api/cms/posts routes.
 * Server-only: imports @prisma/client.
 */
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import type { z } from "zod";
import type { PostSchema } from "@/lib/schemas";

type PostInput = Partial<z.infer<typeof PostSchema>>;

/**
 * Turns validated form data into Prisma data:
 * - Tiptap JSON: null becomes Prisma.JsonNull
 * - empty strings become null
 * - publishing without a date stamps it with "now"
 */
export function toPostData(input: PostInput, existingPublishedAt?: Date | null) {
  const { content, publishedAt, coverImageUrl, coverImageAlt, ...rest } = input;
  const data: Prisma.PostUncheckedUpdateInput = { ...rest };

  if (content !== undefined) {
    data.content = content === null ? Prisma.JsonNull : (content as Prisma.InputJsonValue);
  }
  if (coverImageUrl !== undefined) data.coverImageUrl = coverImageUrl || null;
  if (coverImageAlt !== undefined) data.coverImageAlt = coverImageAlt || null;

  if (publishedAt !== undefined) {
    data.publishedAt = publishedAt ? new Date(publishedAt) : null;
  }
  if (input.published && !publishedAt && !existingPublishedAt) {
    data.publishedAt = new Date();
  }
  return data;
}

/** Unique-constraint error from Prisma (duplicate slug). */
export function isDuplicateSlug(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
  );
}

/** Make /news, /news/[slug] and the homepage show changes straight away. */
export function refreshPosts() {
  revalidateTag("posts", { expire: 0 });
}
