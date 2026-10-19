"use client";

import { useState } from "react";
import Image from "next/image";
import { safeImageUrl } from "@/lib/utils";

const STAGES = [
  { label: "Existing conditions", tag: "Day 0" },
  { label: "Tear-off", tag: "Week 1" },
  { label: "Assembly", tag: "Week 2–3" },
  { label: "Sheet metal", tag: "Week 4" },
  { label: "Complete", tag: "" },
];

interface Props {
  images: string[];
  captions?: string[];
}

export default function SequenceSlider({ images, captions = [] }: Props) {
  const [index, setIndex] = useState(0);

  const slides = images.slice(0, STAGES.length);
  if (slides.length === 0) return null;

  const go = (next: number) =>
    setIndex((next + slides.length) % slides.length);

  return (
    <section className="bg-primary-950 text-white px-6 lg:px-12 pt-16 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6.5 flex items-baseline justify-between gap-6 border-t border-white/[.14] pt-6.5">
          <h2
            className="font-julius tracking-tight"
            style={{ fontSize: "clamp(1.5625rem, 3.6vw, 2.125rem)" }}
          >
            Sequence
          </h2>
          <div className="flex items-center gap-2">
            <span className="mr-2 font-montserrat text-xs text-[#8A9299] tabular-nums">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-[15px] text-white transition-colors hover:border-secondary-300 hover:text-secondary-300"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-[15px] text-white transition-colors hover:border-secondary-300 hover:text-secondary-300"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 620ms cubic-bezier(.22,.61,.36,1)",
            }}
          >
            {slides.map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 grow-0 basis-full bg-primary-900"
                style={{ height: "clamp(360px, 58vw, 620px)" }}
              >
                <Image
                  src={safeImageUrl(src)}
                  alt={STAGES[i]?.label ?? `Stage ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%]"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,18,32,.86), rgba(11,18,32,0))",
                  }}
                />
                <div className="absolute inset-x-9 bottom-7.5 flex items-end justify-between gap-8">
                  <div className="min-w-0">
                    <div className="mb-2.5 font-montserrat text-[10.5px] font-semibold uppercase tracking-[0.24em] text-secondary-300">
                      {STAGES[i]?.label}
                    </div>
                    <p className="font-montserrat text-[19px] leading-[1.45] text-white max-w-[52ch]">
                      {captions[i] ?? STAGES[i]?.label}
                    </p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-montserrat text-xs text-[#8A9299]">
                    {STAGES[i]?.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-0.5 flex-1 transition-colors duration-300 ${
                i === index ? "bg-secondary-300" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}