import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { BRAND_CONTACT } from "@/constants/brand";

// ─── Section label ─────────────────────────────────────────────────────────

export function Label({
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

// ─── Checklist item ─────────────────────────────────────────────────────────

export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="w-4 h-4 text-secondary-600 shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
        <polyline
          points="5,8 7,10 11,6"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-montserrat text-gray-600 text-sm leading-relaxed">
        {children}
      </span>
    </div>
  );
}

// ─── Service hero ────────────────────────────────────────────────────────────

interface ServiceHeroProps {
  category: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
}

export function ServiceHero({
  category,
  title,
  subtitle,
  imageUrl,
  imageAlt,
}: ServiceHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "68vh", minHeight: 500 }}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary-950/85 via-primary-950/30 to-primary-950/10" />
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-secondary-600" />

      <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-secondary-600" />
          <span className="font-montserrat text-secondary-300 text-xs uppercase tracking-[0.18em]">
            {category}
          </span>
        </div>

        <h1
          className="font-julius text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          {title}
        </h1>

        <p
          className="font-montserrat text-white/75 font-light max-w-xl leading-relaxed mb-8"
          style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
        >
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/quote"
            className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300"
          >
            Request A Quote
            <FaArrowRight
              size={11}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href={BRAND_CONTACT.phoneHref}
            className="group inline-flex items-center gap-3 border border-white/40 hover:border-white text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300 hover:bg-white/10"
          >
            <FaPhone size={11} className="text-secondary-300" />
            {BRAND_CONTACT.phone}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Service CTA ─────────────────────────────────────────────────────────────

export function ServiceCTA({
  heading = "Ready to Get Started?",
  subheading = "Request a free, no-obligation quote. We respond within 24 hours and serve clients across Mississauga, Toronto, Oakville, Burlington, and the Greater Toronto Area.",
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="w-full bg-secondary-800 relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute right-0 top-0 h-full w-1/2 opacity-[0.05]"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMaxYMid slice"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={60 * i}
              x2="400"
              y2={60 * i}
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={`v${i}`}
              x1={80 * i}
              y1="0"
              x2={80 * i}
              y2="300"
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
          <polyline
            points="0,300 200,80 400,300"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-white/40" />
              <span className="font-montserrat text-white/60 text-xs uppercase tracking-[0.18em]">
                Get In Touch
              </span>
            </div>
            <h2
              className="font-julius text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)" }}
            >
              {heading}
            </h2>
            <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
              {subheading}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:shrink-0">
            <Link
              href="/quote"
              className="group inline-flex items-center justify-center gap-3 bg-white text-secondary-900 hover:bg-primary-50 font-montserrat text-sm font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300"
            >
              Request A Free Quote
              <FaArrowRight
                size={11}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={BRAND_CONTACT.phoneHref}
              className="group inline-flex items-center justify-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm font-medium uppercase tracking-widest px-8 py-4 transition-all duration-300 hover:bg-white/10"
            >
              <FaPhone size={11} />
              {BRAND_CONTACT.phone}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Content + image block ────────────────────────────────────────────────────

interface ContentImageProps {
  title?: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
  bg?: "white" | "cream" | "gray";
}

export function ContentImage({
  title,
  content,
  imageUrl,
  imageAlt,
  reverse = false,
  bg = "white",
}: ContentImageProps) {
  const bgClass =
    bg === "cream"
      ? "bg-[rgb(255,253,245)]"
      : bg === "gray"
      ? "bg-gray-50"
      : "bg-white";

  return (
    <div className={`w-full py-16 sm:py-20 ${bgClass}`}>
      <div className="container max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            {title && (
              <h2
                className="font-julius text-primary-950 leading-tight mb-5"
                style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)" }}
              >
                {title}
              </h2>
            )}
            <p className="font-montserrat text-gray-600 text-base leading-relaxed">
              {content}
            </p>
          </div>
          <div className="relative overflow-hidden aspect-4/3">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
