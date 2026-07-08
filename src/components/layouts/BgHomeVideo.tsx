"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowRight, FaPhone } from "react-icons/fa";
import { images } from "@/constants";
import type { HomeVideo } from "@/types";

interface Props {
  video: HomeVideo | null;
}

export default function BgHomeVideo({ video }: Props) {
  const [videoError, setVideoError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative w-full h-screen min-h-150 overflow-hidden"
      aria-label="Skyluxe Roofing — hero section"
    >
      {/* ── Background media ── */}
      {!video || videoError || !video.videoUrl ? (
        <Image
          src={images.homeImage}
          alt="Skyluxe Roofing commercial roofing project in the Greater Toronto Area"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <video
          className="pointer-events-none absolute inset-0 w-full h-full object-cover"
          src={video.videoUrl}
          autoPlay
          controls={false}
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
        />
      )}

      {/* ── Gradient overlay — bottom-heavy for text legibility ── */}
      <div className="absolute inset-0 bg-linear-to-t from-primary-950/85 via-primary-950/30 to-primary-950/10" />

      {/* ── Accent line — left edge ── */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-secondary-600 transition-all duration-1000 ease-out"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "center",
        }}
      />

      {/* ── Hero content ── */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-24 lg:pb-28 max-w-7xl mx-auto">

        {/* Eyebrow label */}
        <div
          className="flex items-center gap-3 mb-5 transition-all duration-700 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "200ms",
          }}
        >
          <span className="h-px w-10 bg-secondary-400" />
          <span className="text-secondary-300 font-montserrat text-xs tracking-[0.2em] uppercase">
            GAF Master Elite · Knudson Certified
          </span>
        </div>

        {/* H1 */}
        <h1
          className="font-julius text-white leading-tight mb-6 transition-all duration-700 ease-out"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "350ms",
          }}
        >
          Roofing Built
          <br />
          <span className="text-secondary-300">To Last.</span>
        </h1>

        {/* Sub */}
        <p
          className="font-montserrat text-white/80 font-light max-w-xl mb-10 leading-relaxed transition-all duration-700 ease-out"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "450ms",
          }}
        >
          Industrial, commercial, and residential roofing for the Greater Toronto
          Area. Precision craftsmanship. Unmatched warranties.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 transition-all duration-700 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "550ms",
          }}
        >
          <Link
            href="/quote"
            className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300"
          >
            Request A Free Quote
            <FaArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="tel:+16476295893"
            className="group inline-flex items-center gap-3 border border-white/40 hover:border-white text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300 hover:bg-white/10"
          >
            <FaPhone size={12} className="text-secondary-300" />
            (647) 629 5893
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute inset-x-0 bottom-7 flex justify-center transition-all duration-700 ease-out"
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
