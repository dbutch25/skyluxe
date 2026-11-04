"use client";

/**
 * Full-screen viewer for a whole project page.
 *
 *   <ProjectLightboxProvider images={…}>  every photo on the page, in page order
 *   <PhotoZoomButton src={…} />           drop inside any photo's (relative) box to make it clickable
 *   useProjectLightbox()                  open the viewer from a client component (e.g. SequenceSlider)
 *
 * Clicking any photo opens the viewer at that photo; the arrows then move
 * through all of the project's photos.
 */

import { createContext, useCallback, useContext, useState } from "react";
import { Expand } from "lucide-react";
import Lightbox from "@/components/elements/Lightbox";
import type { SlideImage } from "@/components/elements/GallerySlider";

const OpenPhotoContext = createContext<((src: string) => void) | null>(null);

/** Opens the project viewer at a photo, or null outside a project page. */
export function useProjectLightbox() {
  return useContext(OpenPhotoContext);
}

export function ProjectLightboxProvider({ images, children }: { images: SlideImage[]; children: React.ReactNode }) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  const open = useCallback(
    (src: string) => {
      const i = images.findIndex((img) => img.url === src);
      if (i >= 0) setOpenAt(i);
    },
    [images]
  );
  const close = useCallback(() => setOpenAt(null), []);

  return (
    <OpenPhotoContext.Provider value={open}>
      {children}
      {openAt !== null && <Lightbox images={images} startIndex={openAt} onClose={close} />}
    </OpenPhotoContext.Provider>
  );
}

/** Invisible button covering a photo; place it inside the photo's `relative` box. */
export function PhotoZoomButton({ src, label }: { src: string; label?: string }) {
  const open = useProjectLightbox();
  if (!open) return null;
  return (
    <button
      type="button"
      onClick={() => open(src)}
      aria-label={label ?? "View photo full screen"}
      className="group/zoom absolute inset-0 cursor-zoom-in"
    >
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100">
        <Expand size={16} />
      </span>
    </button>
  );
}
