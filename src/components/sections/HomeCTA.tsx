"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { BRAND_CONTACT } from "@/constants/brand";

export default function HomeCTA() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full bg-secondary-800 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute right-0 top-0 h-full w-1/2 opacity-5"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMaxYMid slice"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`h${i}`}
              x1="0" y1={60 * i} x2="400" y2={60 * i}
              stroke="white" strokeWidth="0.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={`v${i}`}
              x1={80 * i} y1="0" x2={80 * i} y2="300"
              stroke="white" strokeWidth="0.5"
            />
          ))}
          <polyline
            points="0,300 200,80 400,300"
            stroke="white" strokeWidth="1" fill="none"
          />
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          {/* Left — text */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-24px)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-white/40" />
              <span className="font-montserrat text-white/60 text-xs uppercase tracking-[0.18em]">
                Ready to get started?
              </span>
            </div>

            <h2
              id="cta-heading"
              className="font-julius text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              Let&apos;s Build
              <br />
              Something Great Together.
            </h2>

            <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
              Request a free, no-obligation quote. We respond within 24 hours
              and serve clients across Mississauga, Toronto, Oakville,
              Burlington, and the Greater Toronto Area.
            </p>
          </div>

          {/* Right — CTAs */}
          <div
            className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:shrink-0 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transitionDelay: "150ms",
            }}
          >
            <Link
              href="/quote"
              className="group inline-flex items-center justify-center gap-3 bg-white text-secondary-900 hover:bg-primary-50 font-montserrat text-sm font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300"
            >
              Request A Free Quote
              <FaArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href={BRAND_CONTACT.phoneHref}
              className="group inline-flex items-center justify-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm font-medium uppercase tracking-widest px-8 py-4 transition-all duration-300 hover:bg-white/10"
            >
              <FaPhone size={12} />
              {BRAND_CONTACT.phone}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}