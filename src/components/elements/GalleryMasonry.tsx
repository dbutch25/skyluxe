"use client";

/**
 * Masonry photo grid: 1 column on phones, 2 on tablets, 3 on desktop.
 * Photos keep their natural shape and fill each column top to bottom.
 * Clicking a photo opens the full-screen Lightbox at that photo.
 */

import { useCallback, useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { cn, safeImageUrl } from "@/lib/utils";
import Lightbox from "@/components/elements/Lightbox";
import type { SlideImage } from "@/components/elements/GallerySlider";

export default function GalleryMasonry({
  images,
  className,
}: {
  images: SlideImage[];
  className?: string;
}) {
  const list = images.filter((i) => i?.url);
  const [openAt, setOpenAt] = useState<number | null>(null);
  const close = useCallback(() => setOpenAt(null), []);

  if (!list.length) return null;

  return (
    <>
      <div className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3", className)}>
        {list.map((img, i) => (
          <button
            key={`${img.url}-${i}`}
            type="button"
            onClick={() => setOpenAt(i)}
            aria-label={`View image ${i + 1} of ${list.length} full screen`}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg cursor-zoom-in"
          >
            {/* width/height only reserve space; h-auto lets each photo keep its real shape */}
            <Image
              src={safeImageUrl(img.url)}
              alt={img.alt || `Skyluxe ICI roofing project ${i + 1}`}
              width={1200}
              height={900}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>

      {openAt !== null && <Lightbox images={list} startIndex={openAt} onClose={close} />}
    </>
  );
}