"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { categoryLabel, DEFAULT_SERVICES, serviceImage, servicePoints } from "@/lib/service-defaults";
import type { Service } from "@/types";

interface Props {
  services: Service[];
}

// ─── SVG icon per category ────────────────────────────────────────────────────

function ServiceIcon({ category }: { category: string }) {
  const icons: Record<string, React.ReactElement> = {
    "ICI-roofing": (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="24" width="40" height="20" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="2,24 24,8 46,24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <rect x="19" y="32" width="10" height="12" stroke="currentColor" strokeWidth="1" />
        <line x1="24" y1="8" x2="24" y2="44" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
    "residential-roofing": (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <polyline points="4,28 24,10 44,28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <rect x="8" y="28" width="32" height="16" stroke="currentColor" strokeWidth="1.5" />
        <rect x="21" y="34" width="6" height="10" stroke="currentColor" strokeWidth="1" />
        <rect x="11" y="31" width="8" height="6" stroke="currentColor" strokeWidth="0.75" />
        <rect x="29" y="31" width="8" height="6" stroke="currentColor" strokeWidth="0.75" />
      </svg>
    ),
    "architectural-cladding": (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6" y1="18" x2="42" y2="18" stroke="currentColor" strokeWidth="1" />
        <line x1="6" y1="30" x2="42" y2="30" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="6" x2="20" y2="42" stroke="currentColor" strokeWidth="1" />
        <line x1="34" y1="6" x2="34" y2="42" stroke="currentColor" strokeWidth="1" />
        <rect x="6" y="6" width="14" height="12" fill="currentColor" opacity="0.08" />
        <rect x="34" y="30" width="8" height="12" fill="currentColor" opacity="0.08" />
      </svg>
    ),
    "waterproofing": (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6 L34 22 C34 30 29 38 24 40 C19 38 14 30 14 22 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 16 L29 24 C29 30 27 34 24 36" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
        <line x1="14" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
      </svg>
    ),
    "restoration": (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="30" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="16" width="10" height="10" stroke="currentColor" strokeWidth="1" />
        <rect x="26" y="16" width="10" height="10" stroke="currentColor" strokeWidth="1" />
        <rect x="12" y="30" width="10" height="6" stroke="currentColor" strokeWidth="1" />
        <rect x="26" y="30" width="10" height="6" stroke="currentColor" strokeWidth="1" />
        {/* Restoration trowel/tool overlay */}
        <line x1="34" y1="6" x2="42" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 6 L30 10 L38 14 Z" fill="currentColor" opacity="0.3" />
        {/* Crack line being repaired */}
        <path d="M16 10 L18 13 L15 17 L17 21" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 1" opacity="0.5" />
      </svg>
    ),
    "repairs": (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M10 38 L28 20 M28 20 C31 14 40 12 42 14 C44 16 42 25 37 27 L28 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="34" r="4" stroke="currentColor" strokeWidth="1.5" />
        <line x1="18" y1="18" x2="32" y2="32" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <line x1="6" y1="42" x2="12" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  };
  return icons[category] ?? icons["ICI-roofing"];
}

// ─── Single service row ───────────────────────────────────────────────────────

function ServiceRow({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0;

  // Image and bullets: the service's own, or the defaults for its category
  const imageUrl = serviceImage(service).url;
  const { points } = servicePoints(service);
  const serviceNumber = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="relative w-full overflow-hidden"
      aria-label={service.title}
      style={{ minHeight: 520 }}
    >
      {/* ── Full-width flex row — alternates image/content side ── */}
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } w-full h-full`}
        style={{ minHeight: 520 }}
      >

        {/* ── Image panel ── */}
        <div
          className="relative w-full lg:w-1/2 overflow-hidden"
          style={{ minHeight: 340 }}
        >
          <Image
            src={imageUrl}
            alt={`${service.title} by Skyluxe Roofing — GTA`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Dark overlay gradient */}
          <div
            className={`absolute inset-0 ${
              isEven
                ? "bg-linear-to-r from-transparent to-primary-950/40"
                : "bg-linear-to-l from-transparent to-primary-950/40"
            }`}
          />

          {/* Large service number — watermark on image */}
          <div
            className={`absolute bottom-6 ${
              isEven ? "right-8" : "left-8"
            } font-julius text-white/10 leading-none select-none pointer-events-none`}
            style={{ fontSize: "clamp(5rem, 10vw, 9rem)" }}
            aria-hidden="true"
          >
            {serviceNumber}
          </div>

          {/* Category badge */}
          <div
            className={`absolute top-6 ${isEven ? "left-6" : "right-6"}`}
          >
            <span className="bg-secondary-800/90 text-white font-montserrat text-xs uppercase tracking-widest px-3 py-1.5">
              {categoryLabel(service.category)}
            </span>
          </div>
        </div>

        {/* ── Content panel ── */}
        <div
          className={`relative w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 lg:py-20 ${
            isEven ? "lg:border-l-0" : "lg:border-r-0"
          }`}
        >
          {/* Construction + grid SVG background on content panel */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.04]"
              viewBox="0 0 600 520"
              preserveAspectRatio="xMidYMid slice"
            >
              {Array.from({ length: 9 }, (_, col) =>
                Array.from({ length: 8 }, (_, row) => {
                  const x = col * 80 + 40;
                  const y = row * 80 + 40;
                  return (
                    <g key={`p-${col}-${row}`}>
                      <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#0b4e6f" strokeWidth="0.75" />
                      <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke="#0b4e6f" strokeWidth="0.75" />
                    </g>
                  );
                })
              )}
            </svg>
          </div>

          {/* Content */}
          <div
            className="relative transition-all duration-800 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateX(0)"
                : isEven
                ? "translateX(32px)"
                : "translateX(-32px)",
              transitionDelay: "120ms",
            }}
          >
            {/* Row number + icon */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className="font-julius text-secondary-200 leading-none"
                style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
                aria-hidden="true"
              >
                {serviceNumber}
              </span>
              <span className="h-px flex-1 max-w-8 bg-secondary-200" />
              <div className="text-secondary-600">
                <ServiceIcon category={service.category} />
              </div>
            </div>

            {/* Title */}
            <h3
              className="font-julius text-primary-950 leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p className="font-montserrat text-gray-500 text-base leading-relaxed mb-8">
              {service.description}
            </p>

            {/* Key points */}
            {points.length > 0 && (
              <ul className="space-y-2 mb-10">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 font-montserrat text-sm text-gray-600"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary-600 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={service.serviceLink}
                className="group inline-flex items-center gap-3 bg-primary-950 hover:bg-primary-800 text-white font-montserrat text-xs font-medium uppercase tracking-widest px-6 py-3.5 transition-all duration-300"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More
                <FaArrowRight
                  size={10}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href={service.requestLink}
                className="group inline-flex items-center gap-3 border border-secondary-700 text-secondary-800 hover:bg-secondary-800 hover:text-white font-montserrat text-xs font-medium uppercase tracking-widest px-6 py-3.5 transition-all duration-300"
                aria-label={`Request a quote for ${service.title}`}
              >
                Request Quote
                <FaArrowRight
                  size={10}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image entrance animation overlay */}
      <div
        className={`absolute inset-0 bg-white transition-all duration-1000 ease-out pointer-events-none lg:w-1/2 ${
          isEven ? "left-0" : "right-0 left-auto"
        }`}
        style={{
          opacity: visible ? 0 : 1,
          transform: visible
            ? isEven
              ? "translateX(-100%)"
              : "translateX(100%)"
            : "translateX(0)",
        }}
        aria-hidden="true"
      />
    </article>
  );
}

// ─── Heading count, e.g. "Six Services." ──────────────────────────────────────

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

function countLabel(n: number): string {
  const word = NUMBER_WORDS[n] ?? String(n);
  return `${word} Service${n === 1 ? "" : "s"}.`;
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ServicesGrid({ services }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const displayServices = services.length > 0 ? services : DEFAULT_SERVICES;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="w-full bg-white"
      aria-labelledby="services-heading"
    >
      {/* ── Section header ── */}
      <div
        ref={headerRef}
        className="w-full py-16 sm:py-20 bg-gray-50 relative overflow-hidden"
      >
        {/* Header background — same + grid pattern */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.05]"
            viewBox="0 0 1200 200"
            preserveAspectRatio="xMidYMid slice"
          >
            {Array.from({ length: 16 }, (_, col) =>
              Array.from({ length: 3 }, (_, row) => {
                const x = col * 80 + 40;
                const y = row * 80 + 40;
                return (
                  <g key={`ph-${col}-${row}`}>
                    <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#0b4e6f" strokeWidth="0.75" />
                    <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#0b4e6f" strokeWidth="0.75" />
                  </g>
                );
              })
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between transition-all duration-700 ease-out"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-secondary-600" />
                <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                  What We Do
                </span>
              </div>
              <h2
                id="services-heading"
                className="font-julius text-primary-950 leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                {countLabel(displayServices.length)}
                <br />
                <span className="text-secondary-800">
                  One Standard of Excellence.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-width service rows ── */}
      <div className="divide-y divide-gray-100">
        {displayServices.map((service, i) => (
          <ServiceRow key={service.id ?? i} service={service} index={i} />
        ))}
      </div>

      {/* ── Footer CTA row ── */}
      <div className="w-full bg-gray-50 py-10 border-t border-gray-100">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-montserrat text-gray-500 text-sm">
            Not sure which service you need?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 font-montserrat text-xs font-medium text-white bg-secondary-800 hover:bg-secondary-700 px-5 py-2 uppercase tracking-widest transition-colors duration-300"
            >
              Request a free quote <FaArrowRight size={9} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}