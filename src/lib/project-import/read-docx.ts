/**
 * Browser-side .docx reader. Converting in the browser means only the text is
 * uploaded, so large documents full of photos never hit Vercel's body limit.
 */
export async function readDocx(file: File): Promise<string> {
  // Loaded on demand so mammoth isn't in the admin bundle until it's needed.
  const mammoth = (await import("mammoth")).default;
  const { value } = await mammoth.convertToHtml(
    { arrayBuffer: await file.arrayBuffer() },
    // Skip embedded images: by default mammoth inlines them as base64.
    { convertImage: mammoth.images.imgElement(async () => ({ src: "" })) }
  );
  return value.replace(/<img[^>]*>/g, "").trim();
}
