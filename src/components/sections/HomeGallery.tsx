"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import type { GalleryItem } from "@/types";
import { safeImageUrl } from "@/lib/utils";

interface Props {
  galleryItems: GalleryItem[];
  largeGalleryItem: GalleryItem | null;
}

export default function HomeGallery({ galleryItems, largeGalleryItem }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hasContent = largeGalleryItem || galleryItems.length > 0;

  return (
    <section
      ref={ref}
      className="w-full py-20 sm:py-28 bg-[rgb(255,253,245)] relative overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      {/* ── Diagonal hatching corners ── */}
      {/* Architectural material hatching — the diagonal line fill used in cross-section drawings */}
      {/* to indicate cut material (concrete, steel, insulation). Placed in two opposing corners. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Top-left hatching triangle — 200×200 corner */}
          {Array.from({ length: 20 }, (_, i) => {
            const offset = i * 14;
            const x1 = Math.max(0, offset - 200);
            const y1 = Math.max(0, 200 - offset);
            const x2 = Math.min(200, offset);
            const y2 = Math.min(200, offset - 0);
            if (offset > 200) return null;
            return (
              <line
                key={`tl-${i}`}
                x1={x1} y1={0}
                x2={0} y2={offset}
                stroke="#0b4e6f" strokeWidth="0.75"
              />
            );
          })}
          {Array.from({ length: 20 }, (_, i) => {
            const offset = i * 14;
            return offset <= 200 ? (
              <line
                key={`tl2-${i}`}
                x1={offset} y1={0}
                x2={0} y2={offset}
                stroke="#0b4e6f" strokeWidth="0.75"
              />
            ) : null;
          })}

          {/* Bottom-right hatching triangle */}
          {Array.from({ length: 20 }, (_, i) => {
            const offset = i * 14;
            return offset <= 200 ? (
              <line
                key={`br-${i}`}
                x1={1200 - offset} y1={700}
                x2={1200} y2={700 - offset}
                stroke="#0b4e6f" strokeWidth="0.75"
              />
            ) : null;
          })}

          {/* Thin section cut line — left edge */}
          <line x1="0" y1="0" x2="0" y2="700" stroke="#0b4e6f" strokeWidth="2" />

          {/* Right edge accent */}
          <line x1="1200" y1="0" x2="1200" y2="700" stroke="#0b4e6f" strokeWidth="2" />

          {/* Small hatching key symbol — top center, like an architectural legend */}
          <rect x="568" y="20" width="64" height="24" fill="none" stroke="#0b4e6f" strokeWidth="0.75" />
          {[0, 1, 2, 3].map((i) => (
            <line key={`key-${i}`}
              x1={572 + i * 14} y1={20}
              x2={568 + i * 14} y2={44}
              stroke="#0b4e6f" strokeWidth="0.75"
            />
          ))}
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* Section header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 transition-all duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-secondary-600" />
              <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                Our Work
              </span>
            </div>
            <h2
              id="gallery-heading"
              className="font-julius text-primary-950 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Projects That Speak
              <br />
              <span className="text-secondary-800">For Themselves.</span>
            </h2>
          </div>

          <Link
            href="/projects"
            className="group hidden sm:inline-flex items-center gap-2 font-montserrat text-sm text-secondary-700 hover:text-secondary-900 transition-colors duration-300 mt-4 sm:mt-0"
          >
            View all projects
            <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Gallery grid */}
        {hasContent ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {largeGalleryItem && (
              <div
                className="md:col-span-2 transition-all duration-1000 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: "100ms",
                }}
              >
                <Link href={`/projects/${largeGalleryItem.slug}`} className="group block relative overflow-hidden aspect-4/3 md:h-120">
                  <Image
                    src={safeImageUrl(largeGalleryItem.imageUrl)}
                    alt={largeGalleryItem.title || "Skyluxe featured roofing project"}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div>
                      <div className="font-montserrat text-secondary-300 text-xs uppercase tracking-widest mb-1">
                        Featured Project
                      </div>
                      <div className="font-julius text-white text-xl">
                        {largeGalleryItem.title}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary-950/70 text-white font-montserrat text-xs px-3 py-1.5 uppercase tracking-wider">
                    Featured
                  </div>
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {galleryItems.slice(0, 2).map((item, i) => (
                <div
                  key={item.id ?? i}
                  className="flex-1 transition-all duration-1000 ease-out"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transitionDelay: `${200 + i * 100}ms`,
                  }}
                >
                  <Link href={`/projects/${item.slug}`} className="group block relative overflow-hidden h-55">
                    <Image
                      src={safeImageUrl(item.imageUrl)}
                      alt={item.title || "Skyluxe roofing project"}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <div className="font-julius text-white text-base">
                        {item.title}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              {galleryItems.length < 2 && (
                <Link
                  href="/projects"
                  className="group flex-1 h-55 bg-primary-950 flex flex-col items-center justify-center gap-3 hover:bg-primary-900 transition-colors duration-300"
                >
                  <div className="text-secondary-400 group-hover:text-secondary-300 transition-colors">
                    <FaArrowRight size={20} />
                  </div>
                  <div className="font-julius text-white text-sm uppercase tracking-widest">
                    View All Projects
                  </div>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-primary-50 border border-primary-100 rounded p-16 text-center">
            <div className="font-julius text-primary-300 text-xl mb-2">Projects coming soon</div>
            <p className="font-montserrat text-gray-400 text-sm">
              Add projects through the admin panel to display them here.
            </p>
          </div>
        )}

        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-montserrat text-sm text-secondary-700 border-b border-secondary-700 pb-0.5 hover:text-secondary-900 transition-colors duration-300"
          >
            View all projects <FaArrowRight size={10} />
          </Link>
        </div>
      </div>
    </section>
  );
}