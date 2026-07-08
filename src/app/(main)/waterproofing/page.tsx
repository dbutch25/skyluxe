import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import { Marquee } from "@/components/elements/Marquee";
import { getWaterproofingPage } from "@/lib/data";
import { BRAND_CONTACT } from "@/constants/brand";

export const metadata = {
  title: "Waterproofing | Skyluxe Roofing & Sheet Metal — GTA",
  description: "Below and above-grade waterproofing systems. Foundation, hot rubber, traffic toppings, sealers, cementitious applications, and leak repairs. Led by Ben Serino — GTA waterproofing specialist.",
};

const SYSTEMS = [
  {
    id: "foundation",
    num: "01",
    title: "Foundation Waterproofing",
    subtitle: "Below-Grade Systems",
    content: "We specialize in providing below grade waterproofing systems for Conventional, Blindside and Tanked systems. These assemblies can be installed in various ways from Torch Applied, Self-Adhered, Liquid Applied, Trowel Applied and Spray Applied.",
    tags: ["Conventional","Blindside","Tanked","Torch Applied","Self-Adhered","Liquid Applied"],
    bg: "bg-primary-950",
    light: true,
  },
  {
    id: "hot-rubber",
    num: "02",
    title: "Hot Applied Membrane",
    subtitle: "Hot Rubber Systems",
    content: "Hot rubber is commonly used for waterproofing roofs, plaza decks and other flat surfaces. It can be applied to both new and existing structures making it a versatile option for a variety of construction and renovation projects. Provides seamless, monolithic coverage with excellent adhesion.",
    tags: ["Plaza Decks","Roof Decks","Podium Slabs","New Construction","Renovation"],
    bg: "bg-[rgb(255,253,245)]",
    light: false,
  },
  {
    id: "traffic",
    num: "03",
    title: "Traffic Topping",
    subtitle: "Vehicular & Pedestrian",
    content: "Traffic toppings are a type of flooring material designed to withstand heavy foot and vehicular traffic. Commonly used in parking garages, loading docks, warehouses, roofs and roads where durability and resistance to wear and tear are important considerations.",
    tags: ["Polyurethane","Epoxy","Cementitious","PMMA / PUMA","Parking Garages","Loading Docks"],
    bg: "bg-gray-50",
    light: false,
  },
  {
    id: "sealer",
    num: "04",
    title: "Sealer",
    subtitle: "Surface Protection",
    content: "Application of sealer on surfaces such as slabs on grade, balconies and service rooms. Penetrating silane/siloxane sealers provide deep protection against water, de-icing salts, and contaminants without altering surface appearance.",
    tags: ["Slabs on Grade","Balconies","Service Rooms","Penetrating","Film-Forming"],
    bg: "bg-white",
    light: false,
  },
  {
    id: "cementitious",
    num: "05",
    title: "Cementitious Applications",
    subtitle: "Rigid Waterproofing",
    content: "Cementitious waterproofing for stormwater tanks, elevator pits, and sump pits. Ideal for negative-side waterproofing applications where access to the positive side is not available. Can be applied to wet surfaces and allows substrate to breathe.",
    tags: ["Stormwater Tanks","Elevator Pits","Sump Pits","Negative-Side"],
    bg: "bg-[rgb(255,253,245)]",
    light: false,
  },
  {
    id: "leak",
    num: "06",
    title: "Leak Injections & Repairs",
    subtitle: "Emergency & Remedial",
    content: "Leak repairs on new or existing foundations. We identify and fix water infiltration issues using Polyurethane/Epoxy Injections, Cementitious coating, and cement/chemical grouting depending on conditions. Rapid response for active leaks.",
    tags: ["Polyurethane Injection","Epoxy Injection","Cementitious Coating","Chemical Grouting"],
    bg: "bg-primary-950",
    light: true,
  },
];

const FALLBACK_DESCRIPTION = "Skyluxe Waterproofing specializes in all building envelope restoration and below & above grade waterproofing systems. Led by Ben Serino — who pioneered the blindside waterproofing market in the GTA — our division brings over 20 years of hands-on expertise to every project.";

export default async function WaterproofingPage() {
  let data = null;
  try { data = await getWaterproofingPage(); } catch { /* fallback */ }

  const description = data?.description ?? FALLBACK_DESCRIPTION;
  const gallery = data?.gallery ?? [];
  const manufacturersGallery = data?.manufacturersGallery ?? [];

  // If CMS has accordion items, use those for system content
  const cmsAccordion = data?.accordionItems ?? [];

  // Merge CMS content into system definitions where available
  const systems = SYSTEMS.map((s, i) => {
    const cms = cmsAccordion[i];
    return cms ? { ...s, title: cms.accordionTitle, content: cms.accordionContent } : s;
  });

  return (
    <>
      {/* ── HERO — wave/water SVG, deep navy ── */}
      <section className="relative w-full overflow-hidden bg-primary-950" style={{ minHeight: "80vh" }}>
        {/* Water/wave cross-section SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg className="absolute bottom-0 left-0 w-full opacity-[0.08]" viewBox="0 0 1440 320" preserveAspectRatio="none">
            {/* Ground layer */}
            <path d="M0,200 Q360,180 720,200 Q1080,220 1440,200 L1440,320 L0,320 Z" fill="white"/>
            {/* Water table line */}
            <path d="M0,160 Q360,140 720,160 Q1080,180 1440,160" fill="none" stroke="white" strokeWidth="1.5"/>
            {/* Foundation lines */}
            {[0,200,400,600,800,1000,1200].map(x => (
              <g key={x}>
                <rect x={x+20} y={200} width={160} height={120} fill="none" stroke="white" strokeWidth="0.75" opacity="0.5"/>
                <line x1={x+20} y1={240} x2={x+180} y2={240} stroke="white" strokeWidth="0.5" opacity="0.3"/>
              </g>
            ))}
            {/* Membrane indicator */}
            <path d="M0,195 Q360,175 720,195 Q1080,215 1440,195" fill="none" stroke="#4799c2" strokeWidth="2.5"/>
          </svg>
          {/* Horizontal structural lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
            {Array.from({length:18}, (_, i) => (
              <line key={i} x1="0" y1={i*40} x2="1200" y2={i*40} stroke="white" strokeWidth="0.5"/>
            ))}
            {/* Diagonal hatch in corner */}
            {Array.from({length:15}, (_, i) => (
              <line key={`d${i}`} x1={i*20} y1={0} x2={0} y2={i*20} stroke="white" strokeWidth="0.5"/>
            ))}
          </svg>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-600"/>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-40 pb-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-secondary-600"/>
            <span className="font-montserrat text-secondary-300 text-xs uppercase tracking-[0.2em]">Below & Above Grade</span>
          </div>
          <h1 className="font-julius text-white leading-none mb-3" style={{fontSize:"clamp(3rem,7vw,6rem)"}}>
            Water<span className="text-secondary-400">proofing.</span>
          </h1>
          <p className="font-montserrat text-white/70 text-base leading-relaxed mb-10 max-w-2xl">{description}</p>

          {/* Ben Serino quote */}
          <div className="border-l-4 border-secondary-600 pl-5 py-2 mb-10 max-w-xl">
            <div className="font-montserrat text-white/80 text-sm italic leading-relaxed">
              &ldquo;Pioneering the blindside waterproofing market in the GTA — and continuing to push the standard forward.&rdquo;
            </div>
            <div className="font-montserrat text-secondary-400 text-xs mt-2">Ben Serino · Waterproofing Operations</div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/quote" className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300">
              Request A Quote <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300"/>
            </Link>
            <Link href={BRAND_CONTACT.phoneHref} className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm px-7 py-4 transition-all duration-300 hover:bg-white/10">
              <FaPhone size={11} className="text-secondary-300"/>{BRAND_CONTACT.phone}
            </Link>
          </div>
        </div>
      </section>

      {/* ── SIX SYSTEMS — full-width alternating sections ── */}
      {systems.map((system, i) => (
        <section
          key={system.id}
          id={system.id}
          className={`w-full relative overflow-hidden py-16 sm:py-20 ${system.bg}`}
        >
          {/* Unique background per section */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {system.light ? (
              // Dark sections: wave lines
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
                {Array.from({length:8}, (_, i) => (
                  <path key={i} d={`M0,${50+i*45} Q300,${30+i*45} 600,${50+i*45} Q900,${70+i*45} 1200,${50+i*45}`} fill="none" stroke="white" strokeWidth="0.75"/>
                ))}
                <line x1="80" y1="40" x2="80" y2="360" stroke="white" strokeWidth="1"/>
                <line x1="80" y1="40" x2="140" y2="40" stroke="white" strokeWidth="1"/>
                <line x1="1120" y1="40" x2="1120" y2="360" stroke="white" strokeWidth="1"/>
                <line x1="1120" y1="360" x2="1060" y2="360" stroke="white" strokeWidth="1"/>
              </svg>
            ) : (
              // Light sections: + grid dots
              <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
                {Array.from({length:16}, (_, c) =>
                  Array.from({length:6}, (_, r) => {
                    const x=c*80+40, y=r*80+40;
                    return <g key={`${c}-${r}`}>
                      <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="#0b4e6f" strokeWidth="0.75"/>
                      <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="#0b4e6f" strokeWidth="0.75"/>
                    </g>;
                  })
                )}
              </svg>
            )}
          </div>

          <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`font-julius leading-none shrink-0 ${system.light ? "text-secondary-700" : "text-secondary-200"}`}
                    style={{fontSize:"clamp(3rem,5vw,4rem)"}}>
                    {system.num}
                  </span>
                  <div>
                    <div className={`font-montserrat text-xs uppercase tracking-wider mb-1 ${system.light ? "text-secondary-400" : "text-secondary-700"}`}>
                      {system.subtitle}
                    </div>
                    <h2 className={`font-julius leading-tight ${system.light ? "text-white" : "text-primary-950"}`}
                      style={{fontSize:"clamp(1.5rem,2.5vw,2rem)"}}>
                      {system.title}
                    </h2>
                  </div>
                </div>
                <p className={`font-montserrat text-base leading-relaxed mb-6 ${system.light ? "text-white/70" : "text-gray-600"}`}>
                  {system.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {system.tags.map(tag => (
                    <span key={tag}
                      className={`font-montserrat text-xs px-3 py-1.5 border ${
                        system.light
                          ? "border-secondary-700 text-secondary-400"
                          : "border-secondary-200 bg-white text-secondary-700"
                      }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual block */}
              <div className={`relative overflow-hidden aspect-video ${system.light ? "bg-primary-900 border border-white/10" : "bg-primary-950"}`}>
                {/* Architectural cross-section illustration per system */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 640 360" aria-label={`${system.title} diagram`}>
                  {system.id === "foundation" && <>
                    {/* Ground surface */}
                    <rect x="0" y="0" width="640" height="140" fill="#172640" opacity="0.5"/>
                    {/* Membrane layer */}
                    <rect x="0" y="140" width="640" height="12" fill="#4799c2" opacity="0.8"/>
                    {/* Foundation wall */}
                    <rect x="200" y="140" width="240" height="220" fill="#0b1220" stroke="#2c4568" strokeWidth="2"/>
                    {/* Soil */}
                    <rect x="0" y="152" width="200" height="208" fill="#111c30" opacity="0.7"/>
                    <rect x="440" y="152" width="200" height="208" fill="#111c30" opacity="0.7"/>
                    <text x="320" y="260" textAnchor="middle" fill="#4799c2" fontFamily="monospace" fontSize="12" opacity="0.6">FOUNDATION WALL</text>
                    <text x="100" y="300" textAnchor="middle" fill="#4799c2" fontFamily="monospace" fontSize="11" opacity="0.5">MEMBRANE</text>
                    <line x1="100" y1="290" x2="100" y2="152" stroke="#4799c2" strokeWidth="0.75" opacity="0.4" strokeDasharray="3 3"/>
                  </>}
                  {system.id === "hot-rubber" && <>
                    <rect x="0" y="0" width="640" height="80" fill="#172640" opacity="0.4"/>
                    <rect x="0" y="80" width="640" height="20" fill="#0b4e6f" opacity="0.9"/>
                    <rect x="0" y="100" width="640" height="15" fill="#4799c2" opacity="0.7"/>
                    <rect x="0" y="115" width="640" height="180" fill="#0b1220"/>
                    {Array.from({length:8}, (_, i) => (
                      <line key={i} x1="0" y1={120+i*20} x2="640" y2={120+i*20} stroke="#1e3250" strokeWidth="0.75"/>
                    ))}
                    <text x="320" y="220" textAnchor="middle" fill="#4799c2" fontFamily="monospace" fontSize="11" opacity="0.5">STRUCTURAL SLAB</text>
                    <text x="320" y="108" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="11" opacity="0.7">HOT RUBBER MEMBRANE</text>
                  </>}
                  {/* Generic for other systems */}
                  {!["foundation","hot-rubber"].includes(system.id) && <>
                    <rect x="0" y="0" width="640" height="360" fill="#0b1220"/>
                    {Array.from({length:18}, (_, i) => (
                      <line key={i} x1="0" y1={i*20} x2="640" y2={i*20} stroke="#172640" strokeWidth="0.75"/>
                    ))}
                    <text x="320" y="185" textAnchor="middle" fill="#4799c2" fontFamily="monospace" fontSize="14" opacity="0.4">{system.num}</text>
                    <text x="320" y="205" textAnchor="middle" fill="#4799c2" fontFamily="monospace" fontSize="11" opacity="0.3">{system.subtitle.toUpperCase()}</text>
                  </>}
                </svg>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Gallery ── */}
      {gallery.length > 0 && (
        <section className="w-full bg-white">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10 pt-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-secondary-600"/>
              <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">Project Gallery</span>
            </div>
            <h2 className="font-julius text-primary-950 text-2xl mb-8">Waterproofing Projects</h2>
          </div>
          <ServicePagesGallery images={gallery.map(i => ({url:i.url, alt:i.galleryAlt??""}))}/>
        </section>
      )}

      {/* ── Manufacturers ── */}
      {manufacturersGallery.length > 0 && (
        <section className="w-full py-12 bg-gray-50 border-t border-gray-100">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10">
            <h3 className="font-julius text-center text-primary-950 text-xl mb-2">Manufacturers</h3>
            <p className="font-montserrat text-center text-gray-400 text-xs mb-6 uppercase tracking-widest">Soprema · Carlisle · Tremco · W.R. Meadows · Henry Bakor · Kelso</p>
            <Marquee images={manufacturersGallery.map(i => ({url:i.url, alt:i.manufacturerAlt??""}))}/>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="w-full bg-secondary-800 relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.05]" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMid slice">
            {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={60*i} x2="400" y2={60*i} stroke="white" strokeWidth="0.5"/>)}
            {[0,1,2,3,4,5].map(i => <line key={`v${i}`} x1={80*i} y1="0" x2={80*i} y2="300" stroke="white" strokeWidth="0.5"/>)}
            <polyline points="0,300 200,80 400,300" stroke="white" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-white/40"/>
                <span className="font-montserrat text-white/60 text-xs uppercase tracking-[0.18em]">GTA Waterproofing Specialists</span>
              </div>
              <h2 className="font-julius text-white leading-tight mb-4" style={{fontSize:"clamp(1.75rem,2.5vw,2.5rem)"}}>Protect Your Building.</h2>
              <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
                Free assessment and detailed scope. We handle everything from active leak injection to full below-grade membrane systems.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0">
              <Link href="/quote" className="group inline-flex items-center justify-center gap-3 bg-white text-secondary-900 hover:bg-primary-50 font-montserrat text-sm font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300">
                Request A Free Quote <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300"/>
              </Link>
              <Link href={BRAND_CONTACT.phoneHref} className="inline-flex items-center justify-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm px-8 py-4 transition-all duration-300 hover:bg-white/10">
                <FaPhone size={11}/>{BRAND_CONTACT.phone}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
