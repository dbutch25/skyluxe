"use client";

/**
 * Full-screen image viewer. Opened from GallerySlider.
 *
 *   ← → keys, on-screen arrows or swiping move between images
 *   pinch, or double-click / double-tap, zooms in (up to 3×)
 *   ✕, Esc, or clicking the dark area around the image closes it
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import { A11y, Keyboard, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { safeImageUrl } from "@/lib/utils";
import type { SlideImage } from "@/components/elements/GallerySlider";

// True once running in the browser (portals need document.body).
const subscribeNoop = () => () => {};
const useIsClient = () => useSyncExternalStore(subscribeNoop, () => true, () => false);

export default function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: SlideImage[];
  startIndex: number;
  /** Called with the image that was showing, so the slider can continue from it. */
  onClose: (lastIndex: number) => void;
}) {
  const isClient = useIsClient();
  const [index, setIndex] = useState(startIndex);
  const swiperRef = useRef<SwiperCore | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(startIndex);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(indexRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  if (!isClient) return null;

  const many = images.length > 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-100 flex flex-col bg-black/95 text-white"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-montserrat text-sm tabular-nums text-white/80">
          {many ? `${index + 1} / ${images.length}` : ""}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onClose(indexRef.current)}
          aria-label="Close"
          className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <Swiper
          modules={[Keyboard, Zoom, A11y]}
          initialSlide={startIndex}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 3 }}
          rewind={many}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => {
            indexRef.current = s.activeIndex;
            setIndex(s.activeIndex);
          }}
          className="h-full w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide
              key={`${img.url}-${i}`}
              className="px-4 pb-6 sm:px-16 sm:pb-10"
              // Clicking the margin around the image closes the viewer.
              onClick={(e) => {
                if (e.target === e.currentTarget) onClose(indexRef.current);
              }}
            >
              <div className="swiper-zoom-container relative h-full w-full">
                <Image
                  src={safeImageUrl(img.url)}
                  alt={img.alt ?? ""}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={i === startIndex}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {many && (
          <>
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-2.5 hover:bg-black/70 sm:block"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-2.5 hover:bg-black/70 sm:block"
            >
              <ChevronRight size={26} />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
