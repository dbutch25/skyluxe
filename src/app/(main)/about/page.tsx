"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { images } from "@/constants";
import { BRAND_CONTACT } from "@/constants/brand";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: "Mark Goncalves",
    role: "President",
    initials: "MG",
    bio: "Mark manages all daily operations of Skyluxe and monitors every project from initial consultation to final handover. Based in Etobicoke, he built Skyluxe on the belief that the roofing industry could — and should — be done better.",
    color: "bg-secondary-800",
  },
  {
    name: "Jerry Stasicki",
    role: "Vice President",
    initials: "JS",
    bio: "Jerry handles estimating, consulting, and project management. Working directly with architects and general contractors, he ensures every proposal is honest, detailed, and executable — then sees it through to completion.",
    color: "bg-primary-700",
  },
  {
    name: "Ben Serino",
    role: "Waterproofing Operations",
    initials: "BS",
    bio: "Ben brings over 20 years of construction experience and pioneered the blindside waterproofing market in the GTA. He leads all waterproofing estimates, project coordination, and execution — combining technical depth with strategic leadership.",
    color: "bg-secondary-900",
  },
  {
    name: "Saul Navarro",
    role: "Project Manager",
    initials: "SN",
    bio: "Saul coordinates scheduling, material procurement, and crew assignments across every active project. He communicates daily with each client and ensures the plan approved at proposal stage is exactly what gets built.",
    color: "bg-primary-800",
  },
];

const VALUES = [
  {
    title: "Precision",
    description:
      "Every detail is intentional — from the way we spec a waterproofing system to how we communicate with a client. We don't cut corners because we don't need to.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="6" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="30" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="30" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="2.5" fill="currentColor" />
        <line x1="20" y1="20" x2="28" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Trust",
    description:
      "Transparent proposals, daily communication during construction, and a project manager who answers the phone. We measure trust by repeat clients and referrals.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M20 6 L32 11 L32 22 C32 28 26 34 20 36 C14 34 8 28 8 22 L8 11 Z" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="14,20 18,24 26,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Craft",
    description:
      "We work with some of the best architects, builders, and designers in Canada. The standards they hold us to are the same ones we hold ourselves to every day.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="6" y="24" width="28" height="10" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="6,24 20,10 34,24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="14" y1="24" x2="14" y2="34" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="24" x2="20" y2="34" stroke="currentColor" strokeWidth="1" />
        <line x1="26" y1="24" x2="26" y2="34" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "Ambition",
    description:
      "Skyluxe was founded to challenge the status quo. We're not the cheapest option — we're the option clients choose when the project actually matters.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <polyline points="6,32 14,20 20,26 28,12 34,18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="28,12 34,12 34,18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const translate =
    direction === "left" ? "translateX(-28px)"
    : direction === "right" ? "translateX(28px)"
    : "translateY(20px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : translate,
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-secondary-600" />
      <span className={`font-montserrat text-xs uppercase tracking-[0.18em] ${light ? "text-secondary-400" : "text-secondary-700"}`}>
        {children}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "75vh", minHeight: 520 }}
        aria-labelledby="about-hero-heading"
      >
        <Image
          src={images.about2}
          alt="Skyluxe Roofing team on a commercial roofing project in the Greater Toronto Area"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-950/85 via-primary-950/35 to-primary-950/10" />
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-secondary-600" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-16 max-w-7xl mx-auto">
          <Label light>Mississauga, Ontario — Est. 2009</Label>
          <h1
            id="about-hero-heading"
            className="font-julius text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Challenging
            <br />
            <span className="text-secondary-300">Perfection.</span>
          </h1>
          <p className="font-montserrat text-white/75 font-light max-w-lg leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}>
            The story behind Skyluxe Roofing & Sheet Metal — and the team that builds it.
          </p>
        </div>
      </section>

      {/* ── 2. Mission strip ── */}
      <section className="w-full bg-primary-950 relative overflow-hidden py-16 sm:py-20">
        {/* Ruler tick mark SVG */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="20" x2="1200" y2="20" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="140" x2="1200" y2="140" stroke="white" strokeWidth="0.5" />
            {Array.from({ length: 13 }, (_, i) => i * 100).map((x) => (
              <g key={x}>
                <line x1={x} y1="20" x2={x} y2="36" stroke="white" strokeWidth="1" />
                <line x1={x} y1="124" x2={x} y2="140" stroke="white" strokeWidth="1" />
              </g>
            ))}
            {Array.from({ length: 49 }, (_, i) => i * 25).map((x) =>
              x % 100 !== 0 ? (
                <g key={x}>
                  <line x1={x} y1="20" x2={x} y2="28" stroke="white" strokeWidth="0.4" />
                  <line x1={x} y1="132" x2={x} y2="140" stroke="white" strokeWidth="0.4" />
                </g>
              ) : null
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Large quote */}
            <div className="lg:col-span-2">
              <p
                className="font-julius text-white leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
              >
                &ldquo;We believe in challenging perfection — not just in the work we deliver,
                but in the environment we create for our team and clients.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6">
                <span className="h-px w-8 bg-secondary-600" />
                <span className="font-montserrat text-secondary-400 text-sm">
                  Mark Goncalves, President
                </span>
              </div>
            </div>

            {/* Stats aside */}
            <div className="grid grid-cols-2 gap-px bg-white/10">
              {[
                { n: "2009", label: "Founded" },
                { n: "200+", label: "Projects" },
                { n: "15+", label: "Years" },
                { n: "10yr", label: "Warranty" },
              ].map(({ n, label }) => (
                <div key={label} className="bg-primary-950 p-6 text-center">
                  <div className="font-julius text-white text-2xl mb-1">
                    {n}
                  </div>
                  <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Our Story ── */}
      <section
        className="w-full py-16 sm:py-24 bg-[rgb(255,253,245)] relative overflow-hidden"
        aria-labelledby="story-heading"
      >
        {/* Blueprint registration marks */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="40" x2="120" y2="40" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="40" x2="60" y2="100" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="40" x2="1080" y2="40" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="40" x2="1140" y2="100" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="560" x2="120" y2="560" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="560" x2="60" y2="500" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="560" x2="1080" y2="560" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="560" x2="1140" y2="500" stroke="#0b4e6f" strokeWidth="1" />
            <rect x="60" y="40" width="1080" height="520" fill="none" stroke="#0b4e6f" strokeWidth="0.5" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image */}
            <Reveal direction="left">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border border-secondary-200 pointer-events-none" />
                <div className="relative overflow-hidden aspect-4/5 max-w-md">
                  <Image
                    src={images.about1}
                    alt="Skyluxe Roofing team at work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-primary-950/90 px-6 py-5">
                    <div className="font-julius text-white text-lg mb-1">
                      Founded in Mississauga
                    </div>
                    <div className="font-montserrat text-secondary-400 text-xs uppercase tracking-widest">
                      Serving the GTA since 2009
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-800/10 pointer-events-none" />
              </div>
            </Reveal>

            {/* Content */}
            <Reveal direction="right" delay={150}>
              <Label>Our Story</Label>
              <h2
                id="story-heading"
                className="font-julius text-primary-950 leading-tight mb-6"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                Built to Challenge
                <br />
                <span className="text-secondary-800">the Status Quo.</span>
              </h2>

              <div className="space-y-5 font-montserrat text-gray-600 text-base leading-relaxed mb-8">
                <p>
                  Skyluxe Roofing & Sheet Metal was founded by Mark Goncalves out of a genuine
                  frustration with how the roofing industry operated — inconsistent quality,
                  poor communication, and contractors who disappeared after the proposal was signed.
                </p>
                <p>
                  Working with some of the best architects, builders, and designers in Canada,
                  Skyluxe developed a model built on process: every project is estimated, managed,
                  and delivered with the same level of discipline and accountability. The exterior
                  elements come from architects and designers — we make sure they also work.
                </p>
                <p>
                  Today, Skyluxe holds GAF Master Elite status — a designation earned by fewer
                  than 3% of roofing contractors in North America — and is Knudson Certified.
                  Our team of four principals manages every project directly, with no outsourcing
                  of oversight.
                </p>
              </div>

              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 font-montserrat text-sm font-medium text-primary-950 uppercase tracking-widest border-b-2 border-secondary-600 pb-1 hover:text-secondary-700 hover:border-secondary-400 transition-colors duration-300"
              >
                View Our Projects
                <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Values ── */}
      <section className="w-full py-16 sm:py-24 bg-gray-50 relative overflow-hidden" aria-labelledby="values-heading">
        {/* + grid background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 16 }, (_, c) =>
              Array.from({ length: 7 }, (_, r) => {
                const x = c * 80 + 40, y = r * 80 + 40;
                return (
                  <g key={`${c}-${r}`}>
                    <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#0b4e6f" strokeWidth="0.75" />
                    <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#0b4e6f" strokeWidth="0.75" />
                  </g>
                );
              })
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <Reveal>
            <div className="mb-14">
              <Label>What We Stand For</Label>
              <h2
                id="values-heading"
                className="font-julius text-primary-950 leading-tight"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                Four Pillars.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="group bg-white border border-gray-100 p-7 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="text-secondary-600 mb-5 group-hover:text-secondary-500 transition-colors duration-300">
                    {v.icon}
                  </div>
                  <h3 className="font-julius text-primary-950 text-lg mb-3 group-hover:text-secondary-800 transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="font-montserrat text-gray-500 text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Team ── */}
      <section className="w-full py-16 sm:py-24 bg-[rgb(255,253,245)]" aria-labelledby="team-heading" id="team">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="mb-14">
              <Label>The People Behind the Work</Label>
              <h2
                id="team-heading"
                className="font-julius text-primary-950 leading-tight"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                Our Team.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 80}>
                <article className="group bg-white border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  {/* Avatar block */}
                  <div className={`${member.color} h-36 flex items-center justify-center relative overflow-hidden`}>
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-10">
                      {[0, 1, 2, 3].map((j) => (
                        <div key={j} className="absolute border border-white/30" style={{ inset: `${j * 12}px` }} />
                      ))}
                    </div>
                    {/* Initials */}
                    <div className="relative font-julius text-white/90 text-4xl">
                      {member.initials}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-julius text-primary-950 text-lg leading-tight mb-1 group-hover:text-secondary-800 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="h-px w-5 bg-secondary-500" />
                      <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-wider">
                        {member.role}
                      </span>
                    </div>
                    <p className="font-montserrat text-gray-500 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-0.5 bg-linear-to-r from-secondary-600/0 via-secondary-600 to-secondary-600/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Certifications ── */}
      <section className="w-full py-16 sm:py-24 bg-primary-950 relative overflow-hidden" aria-labelledby="certs-heading">
        {/* Angular brackets background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="60" x2="60" y2="340" stroke="white" strokeWidth="2" />
            <line x1="60" y1="60" x2="130" y2="60" stroke="white" strokeWidth="2" />
            <line x1="60" y1="340" x2="130" y2="340" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="60" x2="1140" y2="340" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="60" x2="1070" y2="60" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="340" x2="1070" y2="340" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <Reveal>
            <div className="mb-14">
              <Label light>Why It Matters</Label>
              <h2
                id="certs-heading"
                className="font-julius text-white leading-tight"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                Certified. Verified. Accountable.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GAF Master Elite */}
            <Reveal direction="left" delay={80}>
              <div className="bg-white/5 border border-white/10 p-8 h-full hover:bg-white/8 transition-colors duration-300">
                {/* Badge mark */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 bg-secondary-800 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 text-white" aria-hidden="true">
                      <polygon points="16,4 20,12 29,13 22,20 24,29 16,25 8,29 10,20 3,13 12,12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                      <polyline points="11,16 14,19 21,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-julius text-white text-xl mb-1">GAF Master Elite</h3>
                    <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-wider">
                      Awarded by GAF — North America's largest roofing manufacturer
                    </span>
                  </div>
                </div>
                <p className="font-montserrat text-white/65 text-sm leading-relaxed mb-5">
                  GAF Master Elite is the highest contractor certification available from GAF — earned by
                  fewer than <strong className="text-white/90">3% of roofing contractors</strong> in
                  North America. Achieving it requires passing stringent requirements for licensing,
                  insurance, training, and customer satisfaction.
                </p>
                <p className="font-montserrat text-white/65 text-sm leading-relaxed">
                  As a Master Elite contractor, Skyluxe is authorized to offer the{" "}
                  <strong className="text-white/90">GAF Golden Pledge warranty</strong> — the strongest
                  roofing warranty available, covering both materials and labour for up to 50 years.
                </p>
              </div>
            </Reveal>

            {/* Knudson */}
            <Reveal direction="right" delay={160}>
              <div className="bg-white/5 border border-white/10 p-8 h-full hover:bg-white/8 transition-colors duration-300">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 bg-secondary-800 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 text-white" aria-hidden="true">
                      <rect x="4" y="16" width="24" height="12" stroke="currentColor" strokeWidth="1.5" />
                      <polyline points="4,16 16,6 28,16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <line x1="16" y1="6" x2="16" y2="28" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-julius text-white text-xl mb-1">Knudson Certified</h3>
                    <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-wider">
                      Certified installer for Knudson framing systems
                    </span>
                  </div>
                </div>
                <p className="font-montserrat text-white/65 text-sm leading-relaxed mb-5">
                  Knudson certification recognizes installers who have demonstrated mastery of
                  Knudson's light-gauge steel framing systems — used in commercial and
                  institutional construction for wall assemblies, soffits, and architectural details.
                </p>
                <p className="font-montserrat text-white/65 text-sm leading-relaxed">
                  For Skyluxe clients, this means our cladding and sheet metal work meets the
                  exacting standards required by architects and general contractors on
                  ICI projects across the GTA.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7. Warranties ── */}
      <section className="w-full py-16 sm:py-24 bg-gray-50" aria-labelledby="warranties-heading" id="warranties">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <Reveal direction="left">
              <Label>Peace of Mind</Label>
              <h2
                id="warranties-heading"
                className="font-julius text-primary-950 leading-tight mb-6"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                We Stand Behind
                <br />
                <span className="text-secondary-800">Every Project.</span>
              </h2>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-6">
                Skyluxe offers industry-leading written workmanship warranties of up to
                <strong className="text-primary-950"> 10 years</strong> on all projects.
                In addition, every installation comes with the relevant manufacturer's
                material warranty — so your investment is protected from two directions.
              </p>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                As a GAF Master Elite contractor, we&apos;re also authorized to offer the
                GAF Golden Pledge warranty — up to 50 years of combined coverage on eligible
                residential roofing projects.
              </p>
            </Reveal>

            {/* Warranty tiles */}
            <Reveal direction="right" delay={120}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: "10", unit: "Years", label: "Workmanship warranty", sub: "Written, on every project" },
                  { value: "50", unit: "Years", label: "GAF Golden Pledge", sub: "Residential, eligible projects" },
                  { value: "2×", unit: "Coverage", label: "Dual protection", sub: "Workmanship + manufacturer" },
                ].map(({ value, unit, label, sub }) => (
                  <div key={label} className="bg-white border border-gray-100 p-6 text-center">
                    <div className="font-julius text-primary-950 leading-none mb-1" style={{ fontSize: "2.25rem" }}>
                      {value}
                      <span className="text-secondary-600 text-xl">{unit}</span>
                    </div>
                    <div className="font-montserrat text-gray-700 text-xs font-medium uppercase tracking-wide mt-2 mb-1">
                      {label}
                    </div>
                    <div className="font-montserrat text-gray-400 text-xs">{sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="w-full bg-secondary-800 relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.05]" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMid slice">
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
                  Work with us
                </span>
              </div>
              <h2
                className="font-julius text-white leading-tight mb-4"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)" }}
              >
                Ready to Start
                <br />
                Your Project?
              </h2>
              <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
                Whether you need a commercial reroof, a residential replacement, or a
                full building envelope restoration — we&apos;d like to hear about it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:shrink-0">
              <Link
                href="/quote"
                className="group inline-flex items-center justify-center gap-3 bg-white text-secondary-900 hover:bg-primary-50 font-montserrat text-sm font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300"
              >
                Request A Free Quote
                <FaArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
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
    </>
  );
}
