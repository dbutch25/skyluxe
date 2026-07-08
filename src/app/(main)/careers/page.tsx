import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt, FaBriefcase, FaExternalLinkAlt } from "react-icons/fa";
import { images } from "@/constants";
import { BRAND_CONTACT } from "@/constants/brand";
import { getCareers } from "@/lib/data";
import type { Career } from "@/types";

// ─── Static content ───────────────────────────────────────────────────────────

const WHY_JOIN = [
  {
    title: "Premium Projects",
    description:
      "Work on some of the most interesting and technically demanding roofing and cladding projects in Ontario — from high-rise ICI reroofs to heritage restoration and architectural facade systems.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="4" y="22" width="32" height="14" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="2,22 20,8 38,22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <rect x="16" y="28" width="8" height="8" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="8" x2="20" y2="36" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      </svg>
    ),
  },
  {
    title: "Team Culture",
    description:
      "We're a family — not a corporation. Every member of the Skyluxe team shares common goals and values. We promote from within and invest in the people who invest in us.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="26" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 34 C4 26 10 22 14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M36 34 C36 26 30 22 26 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 22 C17 24 23 24 26 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Real Accountability",
    description:
      "You'll know exactly what you're responsible for and what success looks like. Saul manages scheduling and crew assignments directly — no bureaucracy, no mixed signals.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="8" y="6" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1" />
        <line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="1" />
        <polyline points="14,27 17,30 22,24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "GTA-Based Work",
    description:
      "All projects are in the Greater Toronto Area — Mississauga, Toronto, Oakville, Burlington, Etobicoke, and surrounding areas. No long-distance travel, no remote camps.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="20" cy="17" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 10 C20 10 10 22 10 28 C10 34 20 36 20 36 C20 36 30 34 30 28 C30 22 20 10 20 10Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="17" r="2.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
];

// ─── Job type badge ───────────────────────────────────────────────────────────

function JobTypeBadge({ jobType }: { jobType: string }) {
  const isFullTime =
    jobType.toLowerCase().includes("full") ||
    jobType.toLowerCase() === "fulltime";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-montserrat text-xs font-medium uppercase tracking-wider px-3 py-1.5 ${
        isFullTime
          ? "bg-secondary-100 text-secondary-800 border border-secondary-200"
          : "bg-primary-50 text-primary-700 border border-primary-100"
      }`}
    >
      <FaBriefcase size={9} />
      {isFullTime ? "Full Time" : "Part Time"}
    </span>
  );
}

// ─── Job card ─────────────────────────────────────────────────────────────────

function JobCard({ career, index }: { career: Career; index: number }) {
  // Detect source from URL for button label
  const isLinkedIn = career.applyUrl?.includes("linkedin");
  const isIndeed = career.applyUrl?.includes("indeed");
  const sourceLabel = isLinkedIn
    ? "Apply on LinkedIn"
    : isIndeed
    ? "Apply on Indeed"
    : "Apply Now";

  return (
    <article
      className="group relative bg-white border border-gray-100 hover:border-secondary-200 hover:shadow-md transition-all duration-300"
      aria-label={career.title}
    >
      {/* Left accent — grows on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-secondary-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 px-7 py-6">

        {/* Number */}
        <div
          className="hidden sm:flex items-center justify-center w-10 h-10 shrink-0 border border-gray-100 group-hover:border-secondary-200 transition-colors duration-300"
          aria-hidden="true"
        >
          <span className="font-julius text-gray-300 group-hover:text-secondary-400 text-sm transition-colors duration-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-julius text-primary-950 text-xl mb-3 group-hover:text-secondary-800 transition-colors duration-300 leading-tight">
            {career.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            {/* Location */}
            <span className="inline-flex items-center gap-1.5 font-montserrat text-xs text-gray-500">
              <FaMapMarkerAlt size={10} className="text-secondary-500 shrink-0" />
              {career.location}
            </span>

            {/* Divider */}
            <span className="w-px h-3 bg-gray-200" aria-hidden="true" />

            {/* Job type badge */}
            <JobTypeBadge jobType={career.jobType} />
          </div>

          {/* Optional description */}
          {career.description && (
            <p className="font-montserrat text-gray-500 text-sm leading-relaxed mt-2 line-clamp-2">
              {career.description}
            </p>
          )}
        </div>

        {/* Apply CTA */}
        <div className="shrink-0">
          <Link
            href={career.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2.5 bg-primary-950 hover:bg-secondary-800 text-white font-montserrat text-xs font-medium uppercase tracking-widest px-6 py-3.5 transition-all duration-300 whitespace-nowrap"
            aria-label={`${sourceLabel} for ${career.title}`}
          >
            {sourceLabel}
            <FaExternalLinkAlt
              size={9}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* JSON-LD per listing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: career.title,
            hiringOrganization: {
              "@type": "Organization",
              name: "Skyluxe Roofing & Sheet Metal",
              sameAs: "https://www.skyluxeroofing.com",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: career.location,
                addressRegion: "ON",
                addressCountry: "CA",
              },
            },
            employmentType:
              career.jobType.toLowerCase().includes("full")
                ? "FULL_TIME"
                : "PART_TIME",
            url: career.applyUrl,
          }),
        }}
      />
    </article>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function Label({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-secondary-600" />
      <span
        className={`font-montserrat text-xs uppercase tracking-[0.18em] ${
          light ? "text-secondary-400" : "text-secondary-700"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CareersPage() {
  const careers = await getCareers();
  const hasOpenings = careers.length > 0;

  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "65vh", minHeight: 480 }}
        aria-labelledby="careers-hero-heading"
      >
        <Image
          src={images.serviceHero}
          alt="Skyluxe Roofing team on a commercial project in the Greater Toronto Area"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-950/85 via-primary-950/35 to-primary-950/10" />
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-secondary-600" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-16 max-w-7xl mx-auto">
          <Label light>Mississauga, GTA — We&apos;re Hiring</Label>
          <h1
            id="careers-hero-heading"
            className="font-julius text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Join the Team
            <br />
            <span className="text-secondary-300">Behind the Work.</span>
          </h1>
          <p
            className="font-montserrat text-white/75 font-light max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
          >
            We're always looking for skilled tradespeople who take pride in
            what they build. If that's you — let's talk.
          </p>
        </div>
      </section>

      {/* ── 2. Why join us ── */}
      <section
        className="w-full py-16 sm:py-24 bg-[rgb(255,253,245)] relative overflow-hidden"
        aria-labelledby="why-heading"
      >
        {/* Blueprint marks */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06]"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
          >
            <line x1="60" y1="40" x2="120" y2="40" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="40" x2="60" y2="100" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="40" x2="1080" y2="40" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="40" x2="1140" y2="100" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="360" x2="120" y2="360" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="360" x2="60" y2="300" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="360" x2="1080" y2="360" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="360" x2="1140" y2="300" stroke="#0b4e6f" strokeWidth="1" />
            <rect
              x="60" y="40" width="1080" height="320"
              fill="none" stroke="#0b4e6f" strokeWidth="0.5"
              strokeDasharray="6 6"
            />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="mb-14">
            <Label>Why Skyluxe</Label>
            <h2
              id="why-heading"
              className="font-julius text-primary-950 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
            >
              More Than a Job.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_JOIN.map((item) => (
              <div
                key={item.title}
                className="group bg-white border border-gray-100 p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="text-secondary-600 mb-5 group-hover:text-secondary-500 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="font-julius text-primary-950 text-lg mb-3 group-hover:text-secondary-800 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-montserrat text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Open positions ── */}
      <section
        className="w-full py-16 sm:py-24 bg-gray-50 relative overflow-hidden"
        aria-labelledby="openings-heading"
      >
        {/* + grid background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.05]"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid slice"
          >
            {Array.from({ length: 16 }, (_, col) =>
              Array.from({ length: 10 }, (_, row) => {
                const x = col * 80 + 40;
                const y = row * 80 + 40;
                return (
                  <g key={`${col}-${row}`}>
                    <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#0b4e6f" strokeWidth="0.75" />
                    <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#0b4e6f" strokeWidth="0.75" />
                  </g>
                );
              })
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <Label>Current Openings</Label>
              <h2
                id="openings-heading"
                className="font-julius text-primary-950 leading-tight"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                {hasOpenings
                  ? `${careers.length} Open Position${careers.length !== 1 ? "s" : ""}.`
                  : "Positions Available Soon."}
              </h2>
            </div>

            {hasOpenings && (
              <p className="font-montserrat text-gray-400 text-sm mt-3 sm:mt-0">
                All positions based in the Greater Toronto Area
              </p>
            )}
          </div>

          {hasOpenings ? (
            <div className="flex flex-col divide-y divide-gray-100">
              {careers.map((career, i) => (
                <JobCard key={career.id} career={career} index={i} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="bg-white border border-gray-100 px-10 py-16 text-center">
              <div className="font-julius text-primary-200 text-4xl mb-4">
                — 
              </div>
              <h3 className="font-julius text-primary-950 text-xl mb-3">
                No openings right now
              </h3>
              <p className="font-montserrat text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                We don&apos;t have any listed positions at the moment, but we&apos;re
                always interested in hearing from skilled tradespeople.
              </p>
              <Link
                href={BRAND_CONTACT.emailHref}
                className="group inline-flex items-center gap-2 font-montserrat text-sm font-medium text-secondary-800 uppercase tracking-widest border-b-2 border-secondary-600 pb-1 hover:text-secondary-600 transition-colors duration-300"
              >
                Send us your resume
                <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Don't see your role ── */}
      <section className="w-full bg-primary-950 relative overflow-hidden py-16 sm:py-20">
        {/* Angular bracket background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06]"
            viewBox="0 0 1200 300"
            preserveAspectRatio="xMidYMid slice"
          >
            <line x1="60" y1="50" x2="60" y2="250" stroke="white" strokeWidth="2" />
            <line x1="60" y1="50" x2="120" y2="50" stroke="white" strokeWidth="2" />
            <line x1="60" y1="250" x2="120" y2="250" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="50" x2="1140" y2="250" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="50" x2="1080" y2="50" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="250" x2="1080" y2="250" stroke="white" strokeWidth="2" />
            <line
              x1="60" y1="150" x2="1140" y2="150"
              stroke="white" strokeWidth="0.5"
              strokeDasharray="8 8" opacity="0.3"
            />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div>
              <Label light>Open Application</Label>
              <h2
                className="font-julius text-white leading-tight mb-4"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                Don&apos;t See
                <br />
                <span className="text-secondary-300">Your Role?</span>
              </h2>
              <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
                We&apos;re always interested in hearing from skilled roofers,
                estimators, and project coordinators. Send us your resume and
                we&apos;ll keep it on file for when the right opportunity opens up.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0">
              <Link
                href={BRAND_CONTACT.emailHref}
                className="group inline-flex items-center justify-center gap-3 bg-white text-secondary-900 hover:bg-primary-50 font-montserrat text-sm font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300"
              >
                Email Your Resume
                <FaArrowRight
                  size={11}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href={BRAND_CONTACT.phoneHref}
                className="group inline-flex items-center justify-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm font-medium uppercase tracking-widest px-8 py-4 transition-all duration-300 hover:bg-white/10"
              >
                {BRAND_CONTACT.phone}
              </Link>
            </div>
          </div>

          {/* Email address prominently displayed */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-3">
            <span className="font-montserrat text-white/40 text-xs uppercase tracking-wider">
              Send resumes to
            </span>
            <Link
              href={BRAND_CONTACT.emailHref}
              className="font-julius text-secondary-300 hover:text-secondary-200 transition-colors duration-300 text-lg"
            >
              {BRAND_CONTACT.email}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
