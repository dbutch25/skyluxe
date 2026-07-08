import type { Metadata } from "next";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";
import RequestForm from "@/components/elements/RequestForm";
import { BRAND_CONTACT, BRAND_CREDENTIALS } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Request A Quote | Skyluxe Roofing & Sheet Metal — GTA",
  description:
    "Request a free, no-obligation quote from Skyluxe Roofing & Sheet Metal. GAF Master Elite certified. Serving Mississauga, Toronto, Oakville, Burlington, and the Greater Toronto Area.",
};

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Submit this form",
    description: "Tell us about your project — service type, building, and any details you have. The more context, the better.",
  },
  {
    number: "02",
    title: "We review & follow up",
    description: "A member of our team reviews your request and follows up within one business day — usually the same day.",
  },
  {
    number: "03",
    title: "Site visit & proposal",
    description: "We schedule a site visit, assess the scope, and deliver a detailed written proposal at no charge.",
  },
];

export default function QuotePage() {
  return (
    <>
      {/* ── Page header ── */}
      <div className="w-full bg-primary-950 relative overflow-hidden pt-32 pb-14">
        {/* SVG background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="32" x2="1200" y2="32" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="248" x2="1200" y2="248" stroke="white" strokeWidth="0.5" />
            {Array.from({ length: 13 }, (_, i) => i * 100).map((x) => (
              <g key={x}>
                <line x1={x} y1="28" x2={x} y2="44" stroke="white" strokeWidth="0.75" />
                <line x1={x} y1="236" x2={x} y2="252" stroke="white" strokeWidth="0.75" />
              </g>
            ))}
            {Array.from({ length: 49 }, (_, i) => i * 25).map((x) =>
              x % 100 !== 0 ? (
                <g key={x}>
                  <line x1={x} y1="28" x2={x} y2="36" stroke="white" strokeWidth="0.4" />
                  <line x1={x} y1="244" x2={x} y2="252" stroke="white" strokeWidth="0.4" />
                </g>
              ) : null
            )}
            <line x1="0" y1="140" x2="1200" y2="140" stroke="white" strokeWidth="0.3" strokeDasharray="6 12" opacity="0.4" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-secondary-600" />
                <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-[0.18em]">
                  Free, no obligation
                </span>
              </div>
              <h1
                className="font-julius text-white leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Request A
                <br />
                <span className="text-secondary-300">Free Quote.</span>
              </h1>
            </div>

            {/* Direct contact option */}
            <div className="flex items-center gap-4 lg:pb-1">
              <div className="h-px w-8 bg-white/20 hidden lg:block" />
              <div>
                <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider mb-1.5">
                  Prefer to call?
                </div>
                <Link
                  href={BRAND_CONTACT.phoneHref}
                  className="group inline-flex items-center gap-2 font-julius text-white hover:text-secondary-300 transition-colors duration-300 text-lg"
                >
                  <FaPhone size={13} className="text-secondary-500" />
                  {BRAND_CONTACT.phone}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="w-full bg-[rgb(255,253,245)] relative overflow-hidden">
        {/* Blueprint + grid background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 16 }, (_, c) =>
              Array.from({ length: 12 }, (_, r) => {
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

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ── Left — Process + trust ── */}
            <div className="lg:col-span-2">
              <h2 className="font-julius text-primary-950 text-xl mb-8 leading-tight">
                How It Works
              </h2>

              {/* Process steps */}
              <div className="space-y-0 mb-12">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={step.number} className="flex gap-5">
                    {/* Step indicator */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-primary-950 flex items-center justify-center shrink-0">
                        <span className="font-julius text-secondary-400 text-xs">{step.number}</span>
                      </div>
                      {i < PROCESS_STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-2 min-h-10" />
                      )}
                    </div>

                    {/* Step content */}
                    <div className="pb-8">
                      <h3 className="font-julius text-primary-950 text-base mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-montserrat text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-8 mb-8">
                <h3 className="font-julius text-primary-950 text-base mb-4">
                  Why Choose Skyluxe
                </h3>
                <div className="flex flex-col gap-2.5">
                  {BRAND_CREDENTIALS.map((c) => (
                    <div key={c} className="flex items-center gap-2.5">
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-secondary-600 shrink-0" aria-hidden="true">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                        <polyline points="5,8 7,10 11,6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-montserrat text-gray-600 text-sm">{c}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2.5">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-secondary-600 shrink-0" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                      <polyline points="5,8 7,10 11,6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-montserrat text-gray-600 text-sm">Response within 1 business day</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-secondary-600 shrink-0" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                      <polyline points="5,8 7,10 11,6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-montserrat text-gray-600 text-sm">No obligation, no pressure</span>
                  </div>
                </div>
              </div>

              {/* Service area */}
              <div className="bg-white border border-gray-100 p-5">
                <div className="font-montserrat text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Service Area
                </div>
                <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
                  Mississauga · Toronto · Oakville · Burlington
                  · Etobicoke · North York · Brampton · GTA
                </p>
              </div>
            </div>

            {/* ── Right — Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-100 p-8 sm:p-10">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-6 bg-secondary-600" />
                    <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                      Quote Request
                    </span>
                  </div>
                  <p className="font-montserrat text-gray-500 text-sm leading-relaxed">
                    Fill in the details below. The more you can tell us about your
                    project, the faster we can turn around an accurate proposal.
                  </p>
                </div>

                <RequestForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="w-full bg-gray-50 border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
          <p className="font-montserrat text-gray-400 text-xs">
            All consultations and proposals are complimentary with no obligation to proceed.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 font-montserrat text-xs font-medium text-secondary-800 uppercase tracking-widest hover:text-secondary-600 transition-colors duration-300"
          >
            General inquiry instead?
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
