import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import Accordion from "@/components/elements/Accordion";
import { images } from "@/constants";
import { getRestorationPage } from "@/lib/data";
import { BRAND_CONTACT } from "@/constants/brand";

// ─── Static content ───────────────────────────────────────────────────────────
// Used as fallback when DB has no restoration entry yet.

const CAPABILITIES = [
  {
    title: "Masonry Repair & Repointing",
    description:
      "Deteriorated mortar joints allow water to penetrate the wall assembly causing structural damage and interior leaks. We cut and repoint joints with mortar matched to the original in composition, colour, and texture — critical for heritage buildings.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="4" y="12" width="32" height="7" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="21" width="32" height="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="12" x2="20" y2="19" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <path d="M28 6 L34 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 8 L28 6 L34 12 L32 14 Z" fill="currentColor" opacity="0.25" />
      </svg>
    ),
  },
  {
    title: "Caulking & Sealant Replacement",
    description:
      "Failed sealants at window perimeters, expansion joints, curtain wall interfaces, and through-wall penetrations are a leading cause of water intrusion. We remove all deteriorated material and apply high-performance sealants rated for the specific substrate and movement joint.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="6" y="6" width="28" height="28" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="12" width="16" height="16" stroke="currentColor" strokeWidth="1" />
        <line x1="6" y1="6" x2="12" y2="12" stroke="currentColor" strokeWidth="0.75" />
        <line x1="34" y1="6" x2="28" y2="12" stroke="currentColor" strokeWidth="0.75" />
        <line x1="6" y1="34" x2="12" y2="28" stroke="currentColor" strokeWidth="0.75" />
        <line x1="34" y1="34" x2="28" y2="28" stroke="currentColor" strokeWidth="0.75" />
        <path d="M30 4 L36 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="33" cy="7" r="2" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "Facade Cleaning & Coating Systems",
    description:
      "Staining, biological growth, and weathering affect both appearance and material integrity. We use low-pressure washing, chemical cleaning, and anti-carbonation or silane/siloxane penetrating coatings to protect and renew concrete, brick, and stone facades.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="6" y="8" width="28" height="24" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 16 Q20 12 34 16" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M6 24 Q20 20 34 24" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M14 8 L14 32" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <path d="M26 8 L26 32" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Spandrel Panel Repair",
    description:
      "Glass spandrel panels and their perimeter sealants are a critical point in curtain wall systems. We repair or replace failed sealant, address condensation damage, and restore both the weather seal and the thermal performance of the assembly.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="4" y="4" width="32" height="32" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="8" width="11" height="11" stroke="currentColor" strokeWidth="1" />
        <rect x="21" y="8" width="11" height="11" stroke="currentColor" strokeWidth="1" />
        <rect x="8" y="21" width="11" height="11" stroke="currentColor" strokeWidth="1" />
        <rect x="21" y="21" width="11" height="11" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.08" />
        <line x1="21" y1="21" x2="32" y2="32" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Through-Wall Flashing",
    description:
      "Corroded or improperly installed through-wall flashings are a primary source of water penetration at shelf angles, lintels, and copings. We remove masonry, replace deteriorated flashings with stainless or copper systems, and rebuild the wall assembly.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="4" y="18" width="32" height="6" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="14" x2="36" y2="14" stroke="currentColor" strokeWidth="1" />
        <line x1="4" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="1" />
        {[8, 14, 20, 26, 32].map((x) => (
          <line key={x} x1={x} y1="8" x2={x} y2="18" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        ))}
        {[8, 14, 20, 26, 32].map((x) => (
          <line key={`b${x}`} x1={x} y1="28" x2={x} y2="34" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        ))}
      </svg>
    ),
  },
  {
    title: "Heritage & Modern Buildings",
    description:
      "From Victorian-era masonry to 1970s concrete curtain walls, each era presents unique restoration challenges. Our team matches historic materials, understands heritage designation requirements, and works with building owners and heritage consultants throughout the process.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="8" y="18" width="24" height="18" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="4,18 20,6 36,18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <rect x="17" y="24" width="6" height="12" stroke="currentColor" strokeWidth="1" />
        <rect x="11" y="21" width="5" height="5" stroke="currentColor" strokeWidth="0.75" />
        <rect x="24" y="21" width="5" height="5" stroke="currentColor" strokeWidth="0.75" />
        <line x1="20" y1="6" x2="20" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Condition Assessment",
    description:
      "We inspect the facade using both visual survey and probing — identifying cracks, failed sealants, delamination, moisture infiltration, and corrosion. Where needed, we use borescopes or infrared scanning.",
  },
  {
    number: "02",
    title: "Scope & Specification",
    description:
      "We prepare a detailed scope of work with material specifications, repair methods, and staging. For heritage buildings we coordinate with conservation architects to ensure compliance.",
  },
  {
    number: "03",
    title: "Mobilization",
    description:
      "Swing stage, mast climber, or scaffold is installed. Perimeter protection and pedestrian hoarding are set up. Site safety plan submitted.",
  },
  {
    number: "04",
    title: "Restoration Work",
    description:
      "All work is executed per specification — crack injection, joint raking and repointing, caulking removal and replacement, flashing installation, and coating application.",
  },
  {
    number: "05",
    title: "Quality & Sign-off",
    description:
      "Final inspection with the client and building manager. We document all completed repairs with photographs and issue a written warranty for our workmanship.",
  },
];

const FAQ_ITEMS = [
  {
    title: "How do I know if my building needs restoration?",
    content:
      "Common signs include visible cracks in masonry or caulking joints, water stains on interior walls or ceilings near windows, spalling brick or concrete, rust staining from embedded steel, and biological growth on the facade. A condition assessment by our team will identify the extent of deterioration and what needs to be addressed.",
  },
  {
    title: "What is the difference between restoration and waterproofing?",
    content:
      "Waterproofing refers to membrane systems applied to below-grade or horizontal surfaces (foundations, plaza decks) to prevent water penetration. Restoration focuses on the above-grade building envelope — repairing existing materials like masonry, cladding, and sealant joints that have deteriorated over time. Many restoration projects include waterproofing elements as part of the scope.",
  },
  {
    title: "Can you work on heritage-designated buildings?",
    content:
      "Yes. Heritage restoration requires matching original materials and methods — specific mortar mixes, compatible sealants, and repair approaches that preserve the character of the building. We work with building owners, heritage consultants, and municipal heritage offices to ensure all work meets approval requirements.",
  },
  {
    title: "How long does a facade restoration project take?",
    content:
      "Timelines vary significantly based on building height, extent of deterioration, and staging requirements. A typical mid-rise restoration project ranges from 4–12 weeks on site. We provide a detailed schedule at project award and maintain daily communication with the building manager throughout.",
  },
  {
    title: "Do you offer warranties on restoration work?",
    content:
      "Yes. We provide written workmanship warranties on all restoration work. The warranty period depends on the scope — typically 2–5 years for sealant replacement and repointing, and up to 10 years for coating systems depending on the product specified.",
  },
];

const CHECKLIST = [
  "Mortar joint raking and repointing",
  "Expansion and control joint replacement",
  "Window perimeter sealant replacement",
  "Curtain wall sealant restoration",
  "Spandrel panel perimeter sealing",
  "Through-wall flashing replacement",
  "Shelf angle and lintel restoration",
  "Brick and stone crack injection",
  "Concrete crack repair and patching",
  "Anti-carbonation coating application",
  "Silane/siloxane penetrating sealers",
  "Biocide treatment and facade cleaning",
  "Coping cap replacement and sealing",
  "Parapet wall reconstruction",
  "Sealant injection and cavity drain systems",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-secondary-600" />
      <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
        {children}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RestorationPage() {
  // Attempt to load CMS data — gracefully falls back if model doesn't exist yet
  let cmsData = null;
  try {
    cmsData = await getRestorationPage();
  } catch {
    // DB model not yet created — page renders with static content
  }

  const heroImageUrl = cmsData?.heroImageUrl ?? images.about2;
  const introText =
    cmsData?.introText ??
    "Buildings deteriorate. Mortar erodes, sealants fail, facades stain, and flashings corrode. Left unaddressed, what starts as minor weathering becomes major structural damage and costly interior repairs. Skyluxe provides comprehensive building envelope restoration — halting deterioration, renewing performance, and extending the life of your building for decades.";

  const galleryImages =
    cmsData?.galleryImages && cmsData.galleryImages.length > 0
      ? cmsData.galleryImages
      : [];

  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "70vh", minHeight: 500 }}
        aria-labelledby="restoration-hero-heading"
      >
        <Image
          src={heroImageUrl}
          alt="Building facade restoration by Skyluxe Roofing in the Greater Toronto Area"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-primary-950/30 to-primary-950/10" />
        {/* Left accent bar */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-secondary-600" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-16 max-w-7xl mx-auto">
          <SectionLabel>
            <span className="text-secondary-300">Building Envelope Services</span>
          </SectionLabel>
          <h1
            className="font-julius text-white leading-tight mb-4"
            id="restoration-hero-heading"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            Restoration.
            <br />
            <span className="text-secondary-300">Renewed Performance.</span>
          </h1>
          <p className="font-montserrat text-white/80 font-light max-w-xl leading-relaxed mb-8"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}>
            Masonry repair, facade renewal, sealant systems, and heritage restoration
            — across the Greater Toronto Area.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300"
            >
              Request A Quote
              <FaArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
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

      {/* ── 2. Intro ── */}
      <section className="w-full py-16 sm:py-24 bg-[rgb(255,253,245)] relative overflow-hidden">
        {/* Blueprint crop marks */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="30" x2="120" y2="30" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="30" x2="60" y2="90" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="30" x2="1080" y2="30" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="30" x2="1140" y2="90" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="270" x2="120" y2="270" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="270" x2="60" y2="210" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="270" x2="1080" y2="270" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="270" x2="1140" y2="210" stroke="#0b4e6f" strokeWidth="1" />
            <rect x="60" y="30" width="1080" height="240" fill="none" stroke="#0b4e6f" strokeWidth="0.5" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionLabel>What Is Restoration</SectionLabel>
              <h2
                className="font-julius text-primary-950 leading-tight mb-6"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                When Buildings Age,
                <br />
                <span className="text-secondary-800">We Restore Them.</span>
              </h2>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-6">
                {introText}
              </p>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                Our restoration division works on everything from post-war masonry apartment
                buildings and 1970s concrete office towers to heritage-designated churches and
                modern curtain wall systems. We bring the same standards and project management
                discipline to every job regardless of size.
              </p>
            </div>

            {/* Right — stat panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "20+", label: "Years of combined experience", sub: "Across the team" },
                { stat: "10yr", label: "Workmanship warranty", sub: "On coating systems" },
                { stat: "24/7", label: "Emergency response", sub: "For active leaks" },
                { stat: "GTA", label: "Service area", sub: "Mississauga to Toronto" },
              ].map(({ stat, label, sub }) => (
                <div key={label} className="bg-white border border-gray-100 p-6">
                  <div
                    className="font-julius text-primary-950 leading-none mb-2"
                    style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
                  >
                    {stat}
                    <span className="text-secondary-600">.</span>
                  </div>
                  <div className="font-montserrat text-gray-700 text-sm font-medium leading-tight mb-1">
                    {label}
                  </div>
                  <div className="font-montserrat text-gray-400 text-xs">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Capabilities ── */}
      <section className="w-full py-16 sm:py-24 bg-gray-50 relative overflow-hidden" aria-labelledby="capabilities-heading">
        {/* + grid background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 16 }, (_, col) =>
              Array.from({ length: 11 }, (_, row) => {
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
          <div className="mb-14">
            <SectionLabel>What We Restore</SectionLabel>
            <h2
              id="capabilities-heading"
              className="font-julius text-primary-950 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
            >
              Six Core Capabilities.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="group bg-white border border-gray-100 p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="text-secondary-600 mb-5 group-hover:text-secondary-500 transition-colors duration-300">
                  {cap.icon}
                </div>
                <h3 className="font-julius text-primary-950 text-lg mb-3 group-hover:text-secondary-800 transition-colors duration-300">
                  {cap.title}
                </h3>
                <p className="font-montserrat text-gray-500 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Full checklist ── */}
      <section className="w-full py-16 sm:py-24 bg-primary-950 relative overflow-hidden" aria-labelledby="checklist-heading">
        {/* Angular bracket background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="60" x2="60" y2="340" stroke="white" strokeWidth="2" />
            <line x1="60" y1="60" x2="130" y2="60" stroke="white" strokeWidth="2" />
            <line x1="60" y1="340" x2="130" y2="340" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="60" x2="1140" y2="340" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="60" x2="1070" y2="60" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="340" x2="1070" y2="340" stroke="white" strokeWidth="2" />
            <line x1="60" y1="200" x2="1140" y2="200" stroke="white" strokeWidth="0.5" strokeDasharray="8 8" opacity="0.3" />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionLabel>
                <span className="text-secondary-400">Full Scope</span>
              </SectionLabel>
              <h2
                id="checklist-heading"
                className="font-julius text-white leading-tight mb-6"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                Every Repair Type
                <br />
                <span className="text-secondary-300">We Handle.</span>
              </h2>
              <p className="font-montserrat text-white/70 text-base leading-relaxed mb-8">
                Our restoration crews are trained in all aspects of building envelope repair.
                Whether your project needs one trade or a full multi-system restoration, we
                self-perform the work with our own certified teams.
              </p>
              <Link
                href="/quote"
                className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300"
              >
                Get a Free Assessment
                <FaArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CHECKLIST.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <FaCircleCheck size={14} className="text-secondary-400 shrink-0 mt-1" />
                  <span className="font-montserrat text-white/80 text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Process ── */}
      <section className="w-full py-16 sm:py-24 bg-white" aria-labelledby="process-heading">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-14">
            <SectionLabel>How It Works</SectionLabel>
            <h2
              id="process-heading"
              className="font-julius text-primary-950 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
            >
              Our Process.
            </h2>
          </div>

          {/* Horizontal step row on desktop, vertical on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gray-100 z-0" style={{ width: "calc(100% - 2rem)" }} />
                )}

                <div className="relative z-10">
                  {/* Step number */}
                  <div className="w-12 h-12 bg-primary-950 flex items-center justify-center mb-4">
                    <span className="font-julius text-secondary-400 text-sm">{step.number}</span>
                  </div>
                  <h3 className="font-julius text-primary-950 text-base mb-2">{step.title}</h3>
                  <p className="font-montserrat text-gray-500 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Gallery ── */}
      {galleryImages.length > 0 && (
        <section className="w-full bg-gray-50" aria-labelledby="gallery-heading">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10 pt-16 sm:pt-20">
            <SectionLabel>Our Work</SectionLabel>
            <h2
              id="gallery-heading"
              className="font-julius text-primary-950 leading-tight mb-12"
              style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
            >
              Restoration Projects.
            </h2>
          </div>
          <ServicePagesGallery images={galleryImages} />
        </section>
      )}

      {/* ── 7. FAQ ── */}
      <section className="w-full py-16 sm:py-24 bg-[rgb(255,253,245)]" aria-labelledby="faq-heading">
        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((faq) => ({
                "@type": "Question",
                name: faq.title,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.content,
                },
              })),
            }),
          }}
        />

        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionLabel>FAQs</SectionLabel>
              <h2
                id="faq-heading"
                className="font-julius text-primary-950 leading-tight mb-6"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
              >
                Common Questions
                <br />
                <span className="text-secondary-800">About Restoration.</span>
              </h2>
              <p className="font-montserrat text-gray-500 text-base leading-relaxed mb-8">
                Not sure if your building needs restoration work? Here are the
                questions we get asked most often.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-montserrat text-sm font-medium text-primary-950 uppercase tracking-widest border-b-2 border-secondary-600 pb-1 hover:text-secondary-700 hover:border-secondary-400 transition-colors duration-300"
              >
                Ask us directly
                <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div>
              <Accordion items={FAQ_ITEMS} />
            </div>
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
                  Ready to restore?
                </span>
              </div>
              <h2
                className="font-julius text-white leading-tight mb-4"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)" }}
              >
                Book a Free
                <br />
                Condition Assessment.
              </h2>
              <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
                We&apos;ll inspect your building, identify what needs attention, and
                provide a detailed scope and proposal — with no obligation.
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
