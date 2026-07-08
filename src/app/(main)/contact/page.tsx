import type { Metadata } from "next";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ContactForm from "@/components/elements/ContactForm";
import { BRAND_CONTACT, BRAND_CREDENTIALS } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Contact Skyluxe Roofing | Mississauga, GTA",
  description:
    "Contact Skyluxe Roofing & Sheet Metal in Mississauga. Call (647) 629 5893, email info@skyluxeroofing.com, or send us a message. Serving the Greater Toronto Area.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="w-full bg-primary-950 relative overflow-hidden pt-32 pb-14">
        {/* Ruler tick SVG */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06]"
            viewBox="0 0 1200 220"
            preserveAspectRatio="xMidYMid slice"
          >
            <line x1="0" y1="28" x2="1200" y2="28" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="192" x2="1200" y2="192" stroke="white" strokeWidth="0.5" />
            {Array.from({ length: 13 }, (_, i) => i * 100).map((x) => (
              <g key={x}>
                <line x1={x} y1="24" x2={x} y2="38" stroke="white" strokeWidth="0.75" />
                <line x1={x} y1="182" x2={x} y2="196" stroke="white" strokeWidth="0.75" />
              </g>
            ))}
            {Array.from({ length: 49 }, (_, i) => i * 25).map((x) =>
              x % 100 !== 0 ? (
                <g key={x}>
                  <line x1={x} y1="24" x2={x} y2="32" stroke="white" strokeWidth="0.4" />
                  <line x1={x} y1="188" x2={x} y2="196" stroke="white" strokeWidth="0.4" />
                </g>
              ) : null
            )}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-secondary-600" />
            <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-[0.18em]">
              Get in Touch
            </span>
          </div>
          <h1
            className="font-julius text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Let&apos;s Connect.
          </h1>
        </div>
      </section>

      {/* ── Main content — constrained, centered ── */}
      <section className="w-full bg-[rgb(255,253,245)] relative overflow-hidden">
        {/* + grid background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            viewBox="0 0 1200 900"
            preserveAspectRatio="xMidYMid slice"
          >
            {Array.from({ length: 16 }, (_, c) =>
              Array.from({ length: 12 }, (_, r) => {
                const x = c * 80 + 40;
                const y = r * 80 + 40;
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

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* ── Left — contact info panel ── */}
            <div className="lg:col-span-2">
              <div className="bg-primary-950 relative overflow-hidden p-8 sm:p-10 h-full">

                {/* Blueprint SVG inside the card */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <svg
                    className="absolute inset-0 w-full h-full opacity-[0.07]"
                    viewBox="0 0 400 600"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <line x1="24" y1="24" x2="70" y2="24" stroke="white" strokeWidth="1" />
                    <line x1="24" y1="24" x2="24" y2="70" stroke="white" strokeWidth="1" />
                    <line x1="376" y1="24" x2="330" y2="24" stroke="white" strokeWidth="1" />
                    <line x1="376" y1="24" x2="376" y2="70" stroke="white" strokeWidth="1" />
                    <line x1="24" y1="576" x2="70" y2="576" stroke="white" strokeWidth="1" />
                    <line x1="24" y1="576" x2="24" y2="530" stroke="white" strokeWidth="1" />
                    <line x1="376" y1="576" x2="330" y2="576" stroke="white" strokeWidth="1" />
                    <line x1="376" y1="576" x2="376" y2="530" stroke="white" strokeWidth="1" />
                    <rect
                      x="24" y="24" width="352" height="552"
                      fill="none" stroke="white"
                      strokeWidth="0.5" strokeDasharray="6 6"
                    />
                    <circle cx="200" cy="300" r="8" fill="none" stroke="white" strokeWidth="0.5" />
                    <line x1="184" y1="300" x2="216" y2="300" stroke="white" strokeWidth="0.4" />
                    <line x1="200" y1="284" x2="200" y2="316" stroke="white" strokeWidth="0.4" />
                  </svg>
                </div>

                <div className="relative">
                  <h2
                    className="font-julius text-white leading-tight mb-10"
                    style={{ fontSize: "clamp(1.25rem, 1.75vw, 1.5rem)" }}
                  >
                    Contact
                    <br />
                    <span className="text-secondary-300">Information</span>
                  </h2>

                  {/* Contact rows */}
                  <ul className="space-y-8 mb-10">
                    <li>
                      <Link
                        href={BRAND_CONTACT.phoneHref}
                        className="group flex items-start gap-4"
                        aria-label="Call Skyluxe Roofing"
                      >
                        <div className="w-9 h-9 border border-white/20 group-hover:border-secondary-500 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                          <FaPhone size={11} className="text-secondary-400" />
                        </div>
                        <div>
                          <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider mb-1">
                            Phone
                          </div>
                          <div className="font-julius text-white text-lg group-hover:text-secondary-300 transition-colors duration-300">
                            {BRAND_CONTACT.phone}
                          </div>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href={BRAND_CONTACT.emailHref}
                        className="group flex items-start gap-4"
                        aria-label="Email Skyluxe Roofing"
                      >
                        <div className="w-9 h-9 border border-white/20 group-hover:border-secondary-500 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                          <FaEnvelope size={11} className="text-secondary-400" />
                        </div>
                        <div>
                          <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider mb-1">
                            Email
                          </div>
                          <div className="font-montserrat text-white/85 text-sm group-hover:text-secondary-300 transition-colors duration-300 break-all">
                            {BRAND_CONTACT.email}
                          </div>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href={BRAND_CONTACT.mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4"
                        aria-label="View Skyluxe Roofing on Google Maps"
                      >
                        <div className="w-9 h-9 border border-white/20 group-hover:border-secondary-500 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                          <FaMapMarkerAlt size={11} className="text-secondary-400" />
                        </div>
                        <div>
                          <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider mb-1">
                            Address
                          </div>
                          <address className="font-montserrat text-white/75 text-sm not-italic leading-relaxed group-hover:text-white transition-colors duration-300">
                            1941 Mattawa Ave<br />
                            Mississauga, ON L4X 1K8
                          </address>
                        </div>
                      </Link>
                    </li>
                  </ul>

                  {/* Map */}
                  <div className="mb-8">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.7285302531!2d-79.6337425845117!3d43.62524887912374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3d33c122ad35%3A0x3c3a2cbbf0ddca93!2s1941%20Mattawa%20Ave%2C%20Mississauga%2C%20ON%20L4X%201K8%2C%20Canada!5e0!3m2!1sen!2sus!4v1614727802147!5m2!1sen!2sus"
                      width="100%"
                      height="160"
                      allowFullScreen
                      loading="lazy"
                      className="border-0 grayscale opacity-60 hover:opacity-90 hover:grayscale-0 transition-all duration-500"
                      aria-label="Skyluxe Roofing location on Google Maps"
                      title="Skyluxe Roofing location"
                    />
                  </div>

                  {/* Credentials */}
                  <div className="border-t border-white/10 pt-6 flex flex-col gap-2">
                    {BRAND_CREDENTIALS.map((c) => (
                      <div key={c} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-secondary-500 shrink-0" />
                        <span className="font-montserrat text-white/35 text-xs">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right — form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-100 p-8 sm:p-10 h-full">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-6 bg-secondary-600" />
                    <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                      Send a Message
                    </span>
                  </div>
                  <p className="font-montserrat text-gray-500 text-sm leading-relaxed">
                    Have a question or want to discuss a project? Fill in the form and
                    we&apos;ll get back to you within one business day. For urgent matters,
                    call us directly.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom strip ── */}
      <div className="w-full bg-gray-50 border-t border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
          <p className="font-montserrat text-gray-400 text-xs">
            Serving Mississauga, Toronto, Oakville, Burlington, Etobicoke, North York, Brampton, and the GTA
          </p>
          <Link
            href="/quote"
            className="group inline-flex items-center gap-2 font-montserrat text-xs font-medium text-secondary-800 uppercase tracking-widest hover:text-secondary-600 transition-colors duration-300"
          >
            Need a quote instead?
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
