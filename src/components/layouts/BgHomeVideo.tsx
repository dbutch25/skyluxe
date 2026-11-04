"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { images } from "@/constants";
import type { HomeVideo } from "@/types";
import { videoUrl } from "@/lib/utils";

interface Props {
  video: HomeVideo | null;
}

// Used until the video reports its real size, and for the fallback image
const DEFAULT_ASPECT = 16 / 9;

export default function BgHomeVideo({ video }: Props) {
  const [videoError, setVideoError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [aspect, setAspect] = useState(DEFAULT_ASPECT);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const showVideo = !!video?.videoUrl && !videoError;

  return (
    <section
      // Height follows the video's own shape so the full width is always visible.
      // Capped at the screen height on wide desktops (crops top/bottom only, never the sides).
      // Below lg the hero starts under the 112px header so the header doesn't cover it.
      className="relative w-full overflow-hidden bg-primary-950 mt-28 lg:mt-0"
      style={{ height: `min(calc(100vw / ${aspect}), 100svh)` }}
      aria-label="Skyluxe Roofing — hero section"
    >
      {/* ── Background media ── */}
      {showVideo ? (
        <video
          className="pointer-events-none absolute inset-0 w-full h-full object-cover"
          src={videoUrl(video.videoUrl)}
          poster={images.homeImage}
          autoPlay
          controls={false}
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth && videoHeight) setAspect(videoWidth / videoHeight);
          }}
          onError={() => setVideoError(true)}
        />
      ) : (
        <Image
          src={images.homeImage}
          alt="Skyluxe Roofing commercial roofing project in the Greater Toronto Area"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}

      {/* ── Gradient overlay — bottom-heavy ──
      <div className="absolute inset-0 bg-linear-to-t from-primary-950/85 via-primary-950/30 to-primary-950/10" /> */}

      {/* ── Accent line — left edge ── */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-secondary-600 transition-all duration-1000 ease-out"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "center",
        }}
      />

      {/* Visually hidden H1: the home page needs one for SEO and screen readers */}
      <h1 className="sr-only">Skyluxe Roofing: Toronto Roofing Done Right</h1>

      {/* ── Scroll indicator (hidden on phones, where the hero is short) ── */}
      <div
        className="absolute inset-x-0 bottom-7 hidden sm:flex justify-center transition-all duration-700 ease-out"
        style={{
          opacity: loaded ? 1 : 0,
          transitionDelay: "800ms",
        }}
      >
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 group"
          aria-label="Scroll down"
        >
          <span className="font-montserrat text-xs tracking-widest uppercase">Scroll</span>
          <FaArrowDown size={14} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
