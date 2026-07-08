"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import type { AboutUsHome } from "@/types";

interface Props {
  data: AboutUsHome | null;
}

function renderTiptapContent(content: unknown): string {
  if (!content || typeof content !== "object") return "";
  const node = content as {
    type?: string;
    text?: string;
    content?: unknown[];
    marks?: { type: string }[];
  };
  if (node.type === "text") {
    let text = node.text ?? "";
    const marks = node.marks ?? [];
    if (marks.some((m) => m.type === "bold")) text = `<strong>${text}</strong>`;
    if (marks.some((m) => m.type === "italic")) text = `<em>${text}</em>`;
    return text;
  }
  const children = (node.content ?? []).map(renderTiptapContent).join("");
  switch (node.type) {
    case "doc":         return children;
    case "paragraph":   return `<p>${children}</p>`;
    case "heading":     return `<h2>${children}</h2>`;
    case "bulletList":  return `<ul>${children}</ul>`;
    case "orderedList": return `<ol>${children}</ol>`;
    case "listItem":    return `<li>${children}</li>`;
    case "blockquote":  return `<blockquote>${children}</blockquote>`;
    case "hardBreak":   return `<br />`;
    default:            return children;
  }
}

export default function AboutUs({ data }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const html = data ? renderTiptapContent(data.content) : "";

  return (
    <section
      ref={ref}
      className="w-full py-20 sm:py-28 bg-[rgb(255,253,245)] relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* ── Blueprint registration / crop marks ── */}
      {/* The L-shaped corner marks used in architectural drawings to define a sheet boundary */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Corner registration marks — all four corners */}
          {/* Top-left */}
          <line x1="60" y1="40" x2="120" y2="40" stroke="#0b4e6f" strokeWidth="1" />
          <line x1="60" y1="40" x2="60" y2="100" stroke="#0b4e6f" strokeWidth="1" />

          {/* Top-right */}
          <line x1="1140" y1="40" x2="1080" y2="40" stroke="#0b4e6f" strokeWidth="1" />
          <line x1="1140" y1="40" x2="1140" y2="100" stroke="#0b4e6f" strokeWidth="1" />

          {/* Bottom-left */}
          <line x1="60" y1="560" x2="120" y2="560" stroke="#0b4e6f" strokeWidth="1" />
          <line x1="60" y1="560" x2="60" y2="500" stroke="#0b4e6f" strokeWidth="1" />

          {/* Bottom-right */}
          <line x1="1140" y1="560" x2="1080" y2="560" stroke="#0b4e6f" strokeWidth="1" />
          <line x1="1140" y1="560" x2="1140" y2="500" stroke="#0b4e6f" strokeWidth="1" />

          {/* Center crosshair marks — mid-edges */}
          {/* Top center */}
          <line x1="590" y1="20" x2="610" y2="20" stroke="#0b4e6f" strokeWidth="0.75" />
          <line x1="600" y1="10" x2="600" y2="30" stroke="#0b4e6f" strokeWidth="0.75" />

          {/* Bottom center */}
          <line x1="590" y1="580" x2="610" y2="580" stroke="#0b4e6f" strokeWidth="0.75" />
          <line x1="600" y1="570" x2="600" y2="590" stroke="#0b4e6f" strokeWidth="0.75" />

          {/* Left center */}
          <line x1="20" y1="290" x2="40" y2="290" stroke="#0b4e6f" strokeWidth="0.75" />
          <line x1="30" y1="280" x2="30" y2="300" stroke="#0b4e6f" strokeWidth="0.75" />

          {/* Right center */}
          <line x1="1160" y1="290" x2="1180" y2="290" stroke="#0b4e6f" strokeWidth="0.75" />
          <line x1="1170" y1="280" x2="1170" y2="300" stroke="#0b4e6f" strokeWidth="0.75" />

          {/* Sheet boundary — very faint dashed rectangle */}
          <rect
            x="60" y="40" width="1080" height="520"
            fill="none" stroke="#0b4e6f" strokeWidth="0.5"
            strokeDasharray="6 6"
          />

          {/* Title block outline — bottom-right corner, architectural sheet style */}
          <rect x="900" y="490" width="240" height="70" fill="none" stroke="#0b4e6f" strokeWidth="0.75" />
          <line x1="900" y1="515" x2="1140" y2="515" stroke="#0b4e6f" strokeWidth="0.5" />
          <line x1="900" y1="535" x2="1140" y2="535" stroke="#0b4e6f" strokeWidth="0.5" />
          <line x1="1020" y1="490" x2="1020" y2="560" stroke="#0b4e6f" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — decorative graphic */}
          <div
            className="hidden lg:block transition-all duration-1000 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
            }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 border border-secondary-200" />
              <div className="bg-primary-950 aspect-4/5 w-full max-w-sm relative overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 320 400"
                  fill="none"
                  aria-hidden="true"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={`h${i}`} x1="0" y1={80 * i} x2="320" y2={80 * i}
                      stroke="#0b4e6f" strokeWidth="0.5" opacity="0.4" />
                  ))}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={`v${i}`} x1={80 * i} y1="0" x2={80 * i} y2="400"
                      stroke="#0b4e6f" strokeWidth="0.5" opacity="0.4" />
                  ))}
                  <rect x="60" y="200" width="200" height="160" fill="#0b4e6f" opacity="0.3" />
                  <rect x="80" y="160" width="160" height="200" fill="#0b4e6f" opacity="0.2" />
                  <polyline points="40,200 160,100 280,200" stroke="#4799c2" strokeWidth="1.5" fill="none" />
                  <line x1="160" y1="100" x2="160" y2="360" stroke="#4799c2" strokeWidth="0.75" opacity="0.6" />
                  <line x1="40" y1="200" x2="280" y2="200" stroke="#0e6688" strokeWidth="1" opacity="0.5" />
                  {[100, 140, 180, 220].map((y) =>
                    [100, 145, 190].map((x) => (
                      <rect key={`${x}-${y}`} x={x} y={y} width="20" height="16" fill="#4799c2" opacity="0.3" />
                    ))
                  )}
                </svg>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="font-julius text-white text-2xl mb-2">Since 2009</div>
                  <div className="font-montserrat text-secondary-300 text-xs uppercase tracking-widest">
                    Challenging perfection
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-800/10" />
            </div>
          </div>

          {/* Right — content */}
          <div
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transitionDelay: "150ms",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-secondary-600" />
              <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                About Us
              </span>
            </div>

            <h2
              id="about-heading"
              className="font-julius text-primary-950 mb-6 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Challenging the Status Quo in Roofing
            </h2>

            {html ? (
              <div
                className="font-montserrat text-gray-600 text-base leading-relaxed mb-8
                  [&>p]:mb-4 [&>p:last-child]:mb-0
                  [&>strong]:text-secondary-800 [&>strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <div className="font-montserrat text-gray-600 text-base leading-relaxed mb-8">
                <p>
                  Skyluxe Roofing &amp; Sheet Metal was founded on a single principle: that the
                  roofing industry deserved better. Better craftsmanship, better communication,
                  and better outcomes for clients who trust us with their most valuable assets.
                </p>
                <p>
                  As a GAF Master Elite Contractor — a designation held by fewer than 3% of
                  roofers in North America — we&apos;re authorized to offer the strongest
                  warranties in the industry. Every project is delivered on time, on budget,
                  and built to last.
                </p>
              </div>
            )}

            <div className="border-t border-primary-100 pt-6 mb-8">
              <div className="flex gap-10">
                <div>
                  <div className="font-julius text-primary-950 text-3xl">200<span className="text-secondary-600">+</span></div>
                  <div className="font-montserrat text-gray-400 text-xs uppercase tracking-wider mt-1">Projects completed</div>
                </div>
                <div>
                  <div className="font-julius text-primary-950 text-3xl">15<span className="text-secondary-600">+</span></div>
                  <div className="font-montserrat text-gray-400 text-xs uppercase tracking-wider mt-1">Years experience</div>
                </div>
                <div>
                  <div className="font-julius text-primary-950 text-3xl">10<span className="text-secondary-600">yr</span></div>
                  <div className="font-montserrat text-gray-400 text-xs uppercase tracking-wider mt-1">Workmanship warranty</div>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 font-montserrat text-sm font-medium text-primary-950 uppercase tracking-widest border-b-2 border-secondary-600 pb-1 hover:text-secondary-700 hover:border-secondary-400 transition-colors duration-300"
              aria-label="Learn more about our team"
            >
              Meet Our Team
              <FaArrowRight
                size={11}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
