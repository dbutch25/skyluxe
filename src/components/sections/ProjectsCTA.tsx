import Link from "next/link";
import { BRAND_CONTACT } from "@/constants/brand";

/**
 * Light CTA band from the projects handoff.
 * Handoff geometry (grid 1fr auto, 48px gutter, zero radius, no shadow) with
 * the site's own type scale and palette.
 */
export default function ProjectsCTA() {
  return (
    <section className="w-full bg-[rgb(244,242,238)] text-primary-950">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10 lg:gap-12 px-6 lg:px-12 py-16 lg:py-19">
        <div>
          <h2
            className="font-julius leading-[1.02] tracking-tight max-w-[26ch] mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.875rem)" }}
          >
            Have a roof, deck or wall assembly on the table?
          </h2>
          <p className="font-montserrat text-[17px] leading-relaxed text-[#4A5157] max-w-[56ch]">
            Send us the drawings or the address. We will walk the assembly with
            you and come back with a scoped number.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:shrink-0">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center bg-primary-950 text-[rgb(244,242,238)] font-montserrat text-xs font-semibold uppercase tracking-[0.14em] px-7.5 py-4 transition-colors duration-300 hover:bg-primary-800"
          >
            Request a quote
          </Link>
          <Link
            href={BRAND_CONTACT.phoneHref}
            className="inline-flex items-center justify-center border border-[rgba(14,19,21,.25)] font-montserrat text-xs font-semibold uppercase tracking-[0.14em] px-7.5 py-4 transition-colors duration-300 hover:border-primary-950 hover:bg-primary-950/5"
          >
            {BRAND_CONTACT.phone}
          </Link>
        </div>
      </div>
    </section>
  );
}