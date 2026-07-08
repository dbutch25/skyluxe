import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { images } from "@/constants";
import { BRAND_CONTACT, BRAND_CREDENTIALS } from "@/constants/brand";

// ─── Link groups ──────────────────────────────────────────────────────────────

const SERVICES_LINKS = [
  { label: "ICI Roofing", href: "/ICI" },
  { label: "Residential Roofing", href: "/residential-roofing" },
  { label: "Architectural Cladding", href: "/architectural-cladding" },
  { label: "Waterproofing", href: "/waterproofing" },
  { label: "Repairs & Maintenance", href: "/repairs" },
  { label: "Restoration", href: "/restoration" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about#team" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "Warranties", href: "/about#warranties" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/SkyluxeRoofing/",
    icon: <FaFacebookF size={14} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/skyluxeroofing/?hl=en",
    icon: <FaInstagram size={14} />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@skyluxeroofing",
    icon: <FaYoutube size={14} />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@skyluxeroofing",
    icon: <FaTiktok size={14} />,
  },
];

// ─── Column heading ───────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-5 bg-secondary-600" />
      <h3 className="font-montserrat text-white text-xs font-semibold uppercase tracking-[0.18em]">
        {children}
      </h3>
    </div>
  );
}

// ─── Footer link ──────────────────────────────────────────────────────────────

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-2 font-montserrat text-white/60 text-sm hover:text-white transition-colors duration-300"
    >
      <span className="w-0 h-px bg-secondary-500 transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary-950 relative overflow-hidden" aria-label="Site footer">

      {/* ── Architectural SVG background ── */}
      {/* Diagonal hatching + dimension lines — matches the section patterns */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.045]"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Top-left diagonal hatch corner */}
          {Array.from({ length: 22 }, (_, i) => {
            const offset = i * 16;
            return offset <= 260 ? (
              <line
                key={`tl-${i}`}
                x1={offset} y1={0}
                x2={0} y2={offset}
                stroke="white" strokeWidth="0.6"
              />
            ) : null;
          })}

          {/* Bottom-right diagonal hatch corner */}
          {Array.from({ length: 22 }, (_, i) => {
            const offset = i * 16;
            return offset <= 260 ? (
              <line
                key={`br-${i}`}
                x1={1200 - offset} y1={600}
                x2={1200} y2={600 - offset}
                stroke="white" strokeWidth="0.6"
              />
            ) : null;
          })}

          {/* Horizontal dimension line — top */}
          <line x1="0" y1="32" x2="1200" y2="32" stroke="white" strokeWidth="0.5" />

          {/* Major ticks */}
          {Array.from({ length: 13 }, (_, i) => i * 100).map((x) => (
            <line key={`tick-${x}`} x1={x} y1="28" x2={x} y2="40" stroke="white" strokeWidth="0.75" />
          ))}
          {/* Minor ticks */}
          {Array.from({ length: 49 }, (_, i) => i * 25).map((x) =>
            x % 100 !== 0 ? (
              <line key={`mt-${x}`} x1={x} y1="28" x2={x} y2="34" stroke="white" strokeWidth="0.4" />
            ) : null
          )}

          {/* Right vertical accent line */}
          <line x1="1198" y1="0" x2="1198" y2="600" stroke="white" strokeWidth="1" />

          {/* Bottom baseline */}
          <line x1="0" y1="568" x2="1200" y2="568" stroke="white" strokeWidth="0.5" />

          {/* Center cross */}
          <circle cx="600" cy="300" r="60" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="4 8" />
          <line x1="570" y1="300" x2="630" y2="300" stroke="white" strokeWidth="0.4" />
          <line x1="600" y1="270" x2="600" y2="330" stroke="white" strokeWidth="0.4" />
        </svg>
      </div>

      {/* ── Main body ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ── Col 1 — Brand ── */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Skyluxe Roofing — home">
              <Image
                src={images.logo}
                alt="Skyluxe Roofing & Sheet Metal"
                width={220}
                height={88}
                className="w-44 mb-6 brightness-0 invert opacity-90"
                style={{ height: "auto" }}
              />
            </Link>

            <p className="font-montserrat text-white/55 text-sm leading-relaxed mb-8 max-w-xs">
              Challenging the status quo in roofing since 2009. GAF Master Elite
              certified. Serving the Greater Toronto Area.
            </p>

            {/* Credential pills */}
            <div className="flex flex-col gap-2 mb-8">
              {BRAND_CREDENTIALS.map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-secondary-500 shrink-0" />
                  <span className="font-montserrat text-white/40 text-xs">{c}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-white/20 hover:border-secondary-500 flex items-center justify-center text-white/50 hover:text-secondary-400 transition-all duration-300"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 2 — Services ── */}
          <div>
            <FooterHeading>Services</FooterHeading>
            <nav aria-label="Services navigation">
              <ul className="space-y-3">
                {SERVICES_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Col 3 — Company ── */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <nav aria-label="Company navigation">
              <ul className="space-y-3">
                {COMPANY_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Col 4 — Contact ── */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>

            <ul className="space-y-5 mb-8">
              {/* Phone */}
              <li>
                <Link
                  href={BRAND_CONTACT.phoneHref}
                  className="group flex items-start gap-3 hover:text-white transition-colors duration-300"
                  aria-label="Call Skyluxe Roofing"
                >
                  <div className="w-7 h-7 border border-white/15 group-hover:border-secondary-500 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                    <FaPhone size={10} className="text-secondary-500" />
                  </div>
                  <div>
                    <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider mb-1">
                      Phone
                    </div>
                    <div className="font-julius text-white text-base">
                      {BRAND_CONTACT.phone}
                    </div>
                  </div>
                </Link>
              </li>

              {/* Email */}
              <li>
                <Link
                  href={BRAND_CONTACT.emailHref}
                  className="group flex items-start gap-3 hover:text-white transition-colors duration-300"
                  aria-label="Email Skyluxe Roofing"
                >
                  <div className="w-7 h-7 border border-white/15 group-hover:border-secondary-500 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                    <FaEnvelope size={10} className="text-secondary-500" />
                  </div>
                  <div>
                    <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider mb-1">
                      Email
                    </div>
                    <div className="font-montserrat text-white/80 text-sm break-all">
                      {BRAND_CONTACT.email}
                    </div>
                  </div>
                </Link>
              </li>

              {/* Address */}
              <li>
                <Link
                  href={BRAND_CONTACT.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 hover:text-white transition-colors duration-300"
                  aria-label="View Skyluxe Roofing on Google Maps"
                >
                  <div className="w-7 h-7 border border-white/15 group-hover:border-secondary-500 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                    <FaMapMarkerAlt size={10} className="text-secondary-500" />
                  </div>
                  <div>
                    <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider mb-1">
                      Address
                    </div>
                    <address className="font-montserrat text-white/60 text-sm not-italic leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      1941 Mattawa Ave<br />
                      Mississauga, ON L4X 1K8
                    </address>
                  </div>
                </Link>
              </li>
            </ul>

            {/* Quote CTA */}
            <Link
              href="/quote"
              className="group inline-flex items-center justify-center w-full gap-2 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-xs font-medium uppercase tracking-widest py-3 transition-all duration-300"
            >
              Request A Free Quote
              <svg
                viewBox="0 0 12 12"
                className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="font-montserrat text-white/35 text-xs">
            &copy; {year} Skyluxe Roofing &amp; Sheet Metal. All rights reserved.
          </p>

          {/* Service area */}
          <p className="font-montserrat text-white/25 text-xs text-center sm:text-right">
            Mississauga · Toronto · Oakville · Burlington · Etobicoke · North York · Brampton
          </p>
        </div>
      </div>
    </footer>
  );
}
