import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import { Marquee } from "@/components/elements/Marquee";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import { getCladdingPage } from "@/lib/data";
import { BRAND_CONTACT } from "@/constants/brand";

// ─── Static fallback content (mirrors the live site) ──────────────────────────

const FALLBACK = {
  title: "Architectural Cladding",
  content:
    "Skyluxe Roofing and Sheet Metal has extensive expertise in a variety of cladding applications. Our large sheet metal shop is outfitted with state-of-the-art equipment to ensure high-quality results.",
  extraTitle: "Partners",
  extraContent:
    "Our trusted partnerships with top manufacturers, architects, and designers ensure quality, innovation, and lasting value in every project. Collaborating closely with these industry experts allows us to bring cutting-edge materials and designs to life.",
  listItems: [
    "Standing Seam Panels",
    "Corrugated Siding",
    "Insulated Wall Panels (IMP Panels)",
    "Custom Sheet Metal Fabrication & Installation",
    "Wood Panels",
    "Zinc Panels",
    "Copper & Exotic Metal Work",
    "Aluminum Composite Panels (ACM Panels)",
    "Fibre Cement Panels",
    "Wood Siding",
    "Composite Siding",
    "Concrete Panels",
  ],
};

// YouTube walkthroughs featured on the cladding page
const VIDEO_IDS = ["V-16shpld_8", "XaYfYRqX_EM", "s-0uXog0ZiQ"];

export default async function ArchitecturalCladdingPage() {
  let data = null;
  try {
    data = await getCladdingPage();
  } catch {
    /* fall back to static content */
  }

  const title = data?.title ?? FALLBACK.title;
  const content = data?.content ?? FALLBACK.content;
  const extraTitle = data?.extraTitle ?? FALLBACK.extraTitle;
  const extraContent = data?.extraContent ?? FALLBACK.extraContent;

  const listItems: string[] = data?.listSections?.length
    ? data.listSections.flatMap((s) => s.items)
    : FALLBACK.listItems;

  const galleryImages = data?.galleryImages ?? [];
  const manufacturers = data?.carouselMImages ?? [];
  const architects = data?.carouselADImages ?? [];

  return (
    <>
      {/* ── HERO — full dark, large industrial typography ── */}
      <section
        className="relative w-full overflow-hidden bg-primary-950"
        style={{ minHeight: "90vh" }}
      >
        {/* Panelized facade grid SVG — vertical seams reading as cladding panels */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.07]"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Vertical standing-seam panel lines */}
            {Array.from({ length: 40 }, (_, i) => (
              <line
                key={`v${i}`}
                x1={i * 32}
                y1={0}
                x2={i * 32}
                y2={700}
                stroke="white"
                strokeWidth={i % 4 === 0 ? "0.8" : "0.35"}
              />
            ))}
            {/* Occasional horizontal reveal joints */}
            {[120, 300, 470, 620].map((y) => (
              <line
                key={`h${y}`}
                x1={0}
                y1={y}
                x2={1200}
                y2={y}
                stroke="white"
                strokeWidth="0.5"
                opacity="0.4"
              />
            ))}
            {/* Facade elevation block */}
            <rect
              x="720"
              y="180"
              width="360"
              height="460"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.15"
            />
          </svg>
        </div>

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-600" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-40 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-secondary-600" />
                <span className="font-montserrat text-secondary-300 text-xs uppercase tracking-[0.2em]">
                  Architectural Cladding
                </span>
              </div>
              <h1
                className="font-julius text-white leading-none mb-6"
                style={{ fontSize: "clamp(3rem,7vw,6rem)" }}
              >
                {title}.
              </h1>
              <p className="font-montserrat text-white/70 text-base leading-relaxed mb-8 max-w-lg">
                {content}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300"
                >
                  Request A Quote{" "}
                  <FaArrowRight
                    size={11}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
                <Link
                  href={BRAND_CONTACT.phoneHref}
                  className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm px-7 py-4 transition-all duration-300 hover:bg-white/10"
                >
                  <FaPhone size={11} className="text-secondary-300" />
                  {BRAND_CONTACT.phone}
                </Link>
              </div>
            </div>

            {/* Capability quick-facts panel */}
            <div className="grid grid-cols-2 gap-px bg-white/10">
              {[
                { n: "In-House", label: "Sheet Metal Shop", sub: "State-of-the-art equipment" },
                { n: "Custom", label: "Fabrication", sub: "Built to your elevation" },
                { n: "ACM · Zinc", label: "& Copper", sub: "Exotic metal expertise" },
                { n: "GTA", label: "Wide Service", sub: "ICI & residential" },
              ].map(({ n, label, sub }) => (
                <div
                  key={label}
                  className="bg-primary-950 p-6 text-center hover:bg-primary-900 transition-colors duration-300"
                >
                  <div className="font-julius text-white text-2xl mb-1">
                    {n}
                    <span className="text-secondary-500">.</span>
                  </div>
                  <div className="font-montserrat text-white/70 text-xs font-medium uppercase tracking-wide mb-1">
                    {label}
                  </div>
                  <div className="font-montserrat text-white/35 text-xs">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SYSTEMS — light warm cream, cladding specialties ── */}
      <section className="w-full bg-[rgb(255,253,245)] relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.05]"
            viewBox="0 0 1200 500"
            preserveAspectRatio="xMidYMid slice"
          >
            <line x1="0" y1="30" x2="1200" y2="30" stroke="#0b4e6f" strokeWidth="0.5" />
            <line x1="0" y1="470" x2="1200" y2="470" stroke="#0b4e6f" strokeWidth="0.5" />
            {Array.from({ length: 13 }, (_, i) => (
              <g key={i}>
                <line x1={i * 100} y1="25" x2={i * 100} y2="42" stroke="#0b4e6f" strokeWidth="0.75" />
                <line x1={i * 100} y1="458" x2={i * 100} y2="475" stroke="#0b4e6f" strokeWidth="0.75" />
              </g>
            ))}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-secondary-600" />
                <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                  What We Fabricate & Install
                </span>
              </div>
              <h2
                className="font-julius text-primary-950 leading-tight"
                style={{ fontSize: "clamp(1.75rem,2.5vw,2.25rem)" }}
              >
                Cladding Systems We Specialize In
              </h2>
            </div>
            <div>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                From standing seam and ACM to zinc, copper and exotic metal work, our
                sheet metal division fabricates and installs facade systems designed to
                your building&apos;s exact requirements — for Industrial, Commercial,
                Institutional and Residential projects.
              </p>
            </div>
          </div>

          {/* Specialties — 2-col checklist with large numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listItems.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 bg-white border border-gray-100 px-5 py-4 hover:border-secondary-200 hover:shadow-sm transition-all duration-300"
              >
                <span className="font-julius text-secondary-600 text-lg w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-px h-8 bg-gray-200 shrink-0" />
                <span className="font-montserrat text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YouTube 1 ── */}
      <section className="w-full py-10 bg-white">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10">
          <YouTubeEmbed videoId={VIDEO_IDS[0]} />
        </div>
      </section>

      {/* ── Gallery ── */}
      {galleryImages.length > 0 && (
        <section className="w-full bg-gray-50">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10 pt-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-secondary-600" />
              <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                Project Gallery
              </span>
            </div>
            <h2 className="font-julius text-primary-950 text-2xl mb-8">
              Cladding Projects Across the GTA
            </h2>
          </div>
          <ServicePagesGallery images={galleryImages} />
        </section>
      )}

      {/* ── YouTube 2 & 3 ── */}
      <section className="w-full py-10 bg-white">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <YouTubeEmbed videoId={VIDEO_IDS[1]} />
          <YouTubeEmbed videoId={VIDEO_IDS[2]} />
        </div>
      </section>

      {/* ── Partners — Manufacturers + Architects & Designers ── */}
      {(manufacturers.length > 0 || architects.length > 0 || extraContent) && (
        <section className="w-full py-16 bg-white border-t border-gray-100">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10">
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-secondary-600" />
                <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                  {extraTitle}
                </span>
              </div>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                {extraContent}
              </p>
            </div>

            {manufacturers.length > 0 && (
              <div className="mb-10">
                <h3 className="font-julius text-primary-950 text-lg mb-2">
                  Manufacturers
                </h3>
                <Marquee
                  images={manufacturers.map((i) => ({ url: i.url, alt: i.alt ?? "" }))}
                />
              </div>
            )}

            {architects.length > 0 && (
              <div>
                <h3 className="font-julius text-primary-950 text-lg mb-2">
                  Architects &amp; Designers
                </h3>
                <Marquee
                  images={architects.map((i) => ({ url: i.url, alt: i.alt ?? "" }))}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="w-full bg-secondary-800 relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute right-0 top-0 h-full w-1/2 opacity-[0.05]"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMaxYMid slice"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={`h${i}`} x1="0" y1={60 * i} x2="400" y2={60 * i} stroke="white" strokeWidth="0.5" />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={`v${i}`} x1={80 * i} y1="0" x2={80 * i} y2="300" stroke="white" strokeWidth="0.5" />
            ))}
            <polyline points="0,300 200,80 400,300" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-white/40" />
                <span className="font-montserrat text-white/60 text-xs uppercase tracking-[0.18em]">
                  Architects · Builders · Developers
                </span>
              </div>
              <h2
                className="font-julius text-white leading-tight mb-4"
                style={{ fontSize: "clamp(1.75rem,2.5vw,2.5rem)" }}
              >
                Planning a Facade or Cladding Project?
              </h2>
              <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
                Send us your drawings and we&apos;ll fabricate and install a cladding
                system to match. Free assessment, response within 24 hours, full GTA
                service.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0">
              <Link
                href="/quote"
                className="group inline-flex items-center justify-center gap-3 bg-white text-secondary-900 hover:bg-primary-50 font-montserrat text-sm font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300"
              >
                Request A Free Quote{" "}
                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href={BRAND_CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm px-8 py-4 transition-all duration-300 hover:bg-white/10"
              >
                <FaPhone size={11} />
                {BRAND_CONTACT.phone}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}