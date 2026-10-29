"use client";

/**
 * One-image-at-a-time gallery slider. Moves on every 4 seconds (paused on
 * hover, while the viewer is open, and for visitors who prefer reduced
 * motion). Clicking an image opens it full screen in the Lightbox.
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn, safeImageUrl } from "@/lib/utils";
import Lightbox from "@/components/elements/Lightbox";

export interface SlideImage {
  url: string;
  alt?: string;
}

const INTERVAL_MS = 4000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const useReducedMotion = () =>
  useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);

export default function GallerySlider({
  images,
  aspect = "aspect-4/3",
  sizes = "(max-width: 768px) 100vw, 50vw",
  label = "Photo gallery",
  className,
}: {
  images: SlideImage[];
  /** Tailwind aspect class for the slider, e.g. "aspect-video". */
  aspect?: string;
  /** next/image sizes for the slides. */
  sizes?: string;
  label?: string;
  className?: string;
}) {
  const list = images.filter((i) => i?.url);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [openAt, setOpenAt] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const many = list.length > 1;

  // Stop auto-play while the viewer is open or when reduced motion is on.
  useEffect(() => {
    const autoplay = swiperRef.current?.autoplay;
    if (!autoplay || !many) return;
    if (reducedMotion || openAt !== null) autoplay.stop();
    else autoplay.start();
  }, [reducedMotion, openAt, many]);

  const closeViewer = useCallback((lastIndex: number) => {
    setOpenAt(null);
    swiperRef.current?.slideTo(lastIndex, 0);
  }, []);

  if (!list.length) return null;

  const slide = (img: SlideImage, i: number) => (
    <button
      type="button"
      onClick={() => setOpenAt(i)}
      aria-label={`View image ${i + 1} of ${list.length} full screen`}
      className="group relative block h-full w-full cursor-zoom-in"
    >
      <Image
        src={safeImageUrl(img.url)}
        alt={img.alt || `Skyluxe project photo ${i + 1}`}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand size={16} />
      </span>
    </button>
  );

  return (
    <div className={cn("relative overflow-hidden", aspect, className)} aria-label={label} role="region">
      {many ? (
        <>
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            autoplay={reducedMotion ? false : { delay: INTERVAL_MS, pauseOnMouseEnter: true, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            rewind
            speed={700}
            onSwiper={(s) => (swiperRef.current = s)}
            className="h-full w-full"
          >
            {list.map((img, i) => (
              <SwiperSlide key={`${img.url}-${i}`}>{slide(img, i)}</SwiperSlide>
            ))}
          </Swiper>
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white hover:bg-black/70"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white hover:bg-black/70"
          >
            <ChevronRight size={20} />
          </button>
        </>
      ) : (
        slide(list[0], 0)
      )}

      {openAt !== null && <Lightbox images={list} startIndex={openAt} onClose={closeViewer} />}
    </div>
  );
}
