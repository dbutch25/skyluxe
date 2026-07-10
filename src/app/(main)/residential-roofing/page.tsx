import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { Marquee } from "@/components/elements/Marquee";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import { fetchResidentialData } from "@/lib/data";
import { BRAND_CONTACT } from "@/constants/brand";
import { images } from "@/constants";

export const metadata = {
  title: "Residential Roofing | Skyluxe Roofing & Sheet Metal — GTA",
  description:
    "GAF Master Elite residential roofing in the GTA. Asphalt shingles, cedar shakes, natural slate, synthetic slate, standing seam metal, copper, flat roofing, and skylight installation.",
};

// ─── System definitions ───────────────────────────────────────────────────────

const SYSTEMS = [
  { id: "flat", label: "Flat Roofing", num: "01" },
  { id: "asphalt", label: "Asphalt Shingles", num: "02" },
  { id: "cedar", label: "Cedar Shakes", num: "03" },
  { id: "copper", label: "Copper & Exotic", num: "04" },
  { id: "metal", label: "Metal & Gutters", num: "05" },
  { id: "slate", label: "Natural Slate", num: "06" },
  { id: "synthetic", label: "Synthetic Slate", num: "07" },
  { id: "skylights", label: "Skylights", num: "08" },
];

// ─── Small image grid shown per system when no CMS gallery available ──────────
function SystemImageGrid({ urls, alts }: { urls: string[]; alts?: string[] }) {
  if (!urls.length) return null;
  return (
    <div
      className={`grid gap-3 ${
        urls.length === 1
          ? "grid-cols-1"
          : urls.length === 2
          ? "grid-cols-2"
          : "grid-cols-2 sm:grid-cols-3"
      }`}
    >
      {urls.slice(0, 6).map((url, i) => (
        <div key={i} className="relative overflow-hidden aspect-4/3">
          <Image
            src={url}
            alt={alts?.[i] ?? `Skyluxe residential roofing project ${i + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ResidentialPage() {
  let data: Record<string, unknown> | null = null;
  try {
    data = await fetchResidentialData() as Record<string, unknown> | null;
  } catch { /* static fallback */ }

  const getImages = (key: string): string[] => {
    const raw = data?.[key];
    if (!Array.isArray(raw)) return [];
    return raw
      .map((item: unknown) => {
        if (typeof item === "string") return item;
        const obj = item as { url?: string; image?: { asset?: { url?: string } } };
        return (obj?.url ?? obj?.image?.asset?.url ?? "") as string;
      })
      .filter(Boolean);
  };

  const carouselMImages = (data?.carouselMImages as { url: string; alt?: string }[]) ?? [];

  // Per-system gallery image arrays from CMS
  const flatImages = getImages("residentialImages");
  const asphaltImages = getImages("asphaltImages");
  const cedarImages = getImages("cedarImages");
  const copperImages = getImages("metalsImages");
  const metalImages = getImages("guttersImages");
  const slateImages = getImages("naturalImages");
  const syntheticImages = getImages("syntheticImages");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Residential Roofing",
            provider: { "@type": "RoofingContractor", name: "Skyluxe Roofing & Sheet Metal" },
            serviceType: "Residential Roofing",
            areaServed: "Greater Toronto Area",
          }),
        }}
      />

      {/* ── HERO ── full screen with pitched-roof SVG and overlay ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 600 }}>
        <Image
          src={images.homeImage}
          alt="Premium residential roofing by Skyluxe — GTA"
          fill className="object-cover object-center" priority sizes="100vw"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/70 via-primary-950/20 to-primary-950/80" />

        {/* Pitched roof SVG watermark */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg className="absolute bottom-0 w-full opacity-[0.08]" viewBox="0 0 1440 320" preserveAspectRatio="none">
            {/* Repeating house silhouettes across bottom */}
            {[0, 240, 480, 720, 960, 1200].map((x) => (
              <g key={x}>
                <polygon points={`${x},320 ${x+120},180 ${x+240},320`} fill="white" />
                <rect x={x+40} y={220} width={160} height={100} fill="white" />
                <rect x={x+100} y={255} width={40} height={65} fill="#0b1220" opacity="0.5" />
              </g>
            ))}
          </svg>
          {/* Shingle diagonal lines */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            {Array.from({length: 40}, (_, i) => (
              <line key={i} x1={i*40-400} y1={0} x2={i*40+200} y2={900} stroke="white" strokeWidth="1"/>
            ))}
            {Array.from({length: 25}, (_, i) => (
              <line key={`h${i}`} x1={0} y1={i*40} x2={1440} y2={i*40} stroke="white" strokeWidth="0.5"/>
            ))}
          </svg>
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-secondary-400" />
            <span className="font-montserrat text-secondary-300 text-xs uppercase tracking-[0.2em]">
              GAF Master Elite · Residential Division
            </span>
          </div>
          <h1 className="font-julius text-white leading-tight mb-5"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
            Residential<br />
            <span className="text-secondary-300">Roofing.</span>
          </h1>
          <p className="font-montserrat text-white/75 font-light leading-relaxed mb-10 max-w-lg"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}>
            Eight roofing systems. One certified team. Premium materials installed to manufacturer specification on every project across the GTA.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/quote"
              className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300">
              Request A Quote
              <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href={BRAND_CONTACT.phoneHref}
              className="inline-flex items-center gap-3 border border-white/40 hover:border-white text-white font-montserrat text-sm px-7 py-4 transition-all duration-300 hover:bg-white/10">
              <FaPhone size={11} className="text-secondary-300" />
              {BRAND_CONTACT.phone}
            </Link>
          </div>
        </div>

        {/* System jump nav — pinned to bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary-950/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-0 min-w-max">
              {SYSTEMS.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className="group flex flex-col items-center px-5 py-4 border-b-2 border-transparent hover:border-secondary-500 transition-all duration-300">
                  <span className="font-julius text-secondary-500 text-xs">{s.num}</span>
                  <span className="font-montserrat text-white/60 group-hover:text-white text-xs uppercase tracking-wider whitespace-nowrap transition-colors duration-300">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 FLAT ROOFING ── dark navy, horizontal rule layout ── */}
      <section id="flat" className="w-full bg-primary-950 relative overflow-hidden py-20 sm:py-28">
        {/* Blueprint marks */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="30" x2="1200" y2="30" stroke="white" strokeWidth="0.5"/>
            <line x1="0" y1="470" x2="1200" y2="470" strokeWidth="0.5" stroke="white"/>
            {Array.from({length: 13}, (_, i) => (
              <g key={i}>
                <line x1={i*100} y1="26" x2={i*100} y2="40" stroke="white" strokeWidth="0.75"/>
                <line x1={i*100} y1="460" x2={i*100} y2="474" stroke="white" strokeWidth="0.75"/>
              </g>
            ))}
            {Array.from({length: 49}, (_, i) => i*25).map((x) => x % 100 !== 0 ? (
              <g key={x}>
                <line x1={x} y1="26" x2={x} y2="34" stroke="white" strokeWidth="0.4"/>
                <line x1={x} y1="466" x2={x} y2="474" stroke="white" strokeWidth="0.4"/>
              </g>
            ) : null)}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex items-start gap-8 mb-12">
            <span className="font-julius text-secondary-600 leading-none shrink-0" style={{fontSize:"clamp(4rem,8vw,8rem)"}}>01</span>
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-secondary-600"/><span className="font-montserrat text-secondary-400 text-xs uppercase tracking-[0.18em]">Flat & Low-Slope</span>
              </div>
              <h2 className="font-julius text-white leading-tight" style={{fontSize:"clamp(2rem,4vw,3rem)"}}>Flat Roofing</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="font-montserrat text-white/75 text-base leading-relaxed mb-6">
                Since we are experienced with the scale and difficulty of commercial projects, the residential flat roof projects are a breeze. It is uncommon to find a reputable commercial contractor who also takes on residential projects — the commercial contractors are the pros when it comes to flat roofing, and we are one of them.
              </p>
              <p className="font-montserrat text-white/65 text-base leading-relaxed mb-8">
                Modified bitumen is the most commonly used residential flat roofing application. We are skilled in installing all applications — cold applied, heat welded, and mop down — to manufacturer specification.
              </p>
              <div className="grid grid-cols-3 gap-px bg-white/10">
                {["Cold Applied","Heat Welded","Mop Down"].map(m => (
                  <div key={m} className="bg-primary-950 p-4 text-center">
                    <div className="font-montserrat text-white/60 text-xs uppercase tracking-wider">{m}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="font-montserrat text-white/40 text-xs uppercase tracking-wider mb-2">Manufacturers</div>
                <div className="font-montserrat text-secondary-300 text-sm">Soprema · Polyglass · Bakor</div>
              </div>
            </div>
            <div>
              {flatImages.length > 0 ? (
                <SystemImageGrid urls={flatImages} />
              ) : (
                <div className="bg-primary-900 border border-white/10 aspect-4/3 flex items-center justify-center">
                  <span className="font-julius text-white/20 text-xl">Gallery</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 ASPHALT SHINGLES ── warm cream, large image left ── */}
      <section id="asphalt" className="w-full bg-[rgb(255,253,245)] relative overflow-hidden py-20 sm:py-28">
        {/* Shingle pattern SVG */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute right-0 top-0 w-1/3 h-full opacity-[0.04]" viewBox="0 0 300 600" preserveAspectRatio="xMaxYMid slice">
            {Array.from({length:20}, (_, row) =>
              Array.from({length:6}, (_, col) => (
                <rect key={`${row}-${col}`} x={col*55 - (row%2)*27} y={row*35} width={50} height={30} rx="2" fill="none" stroke="#0b4e6f" strokeWidth="0.75"/>
              ))
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Images */}
            <div className="order-2 lg:order-1">
              {asphaltImages.length > 0 ? (
                <SystemImageGrid urls={asphaltImages} />
              ) : (
                <div className="bg-primary-100 aspect-4/3 flex items-center justify-center">
                  <span className="font-julius text-primary-300 text-xl">Gallery</span>
                </div>
              )}
            </div>
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-julius text-secondary-200 leading-none" style={{fontSize:"clamp(3rem,6vw,6rem)"}}>02</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-px w-5 bg-secondary-600"/>
                    <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-wider">Most Popular</span>
                  </div>
                  <h2 className="font-julius text-primary-950 leading-tight" style={{fontSize:"clamp(1.75rem,3vw,2.5rem)"}}>Asphalt Shingles</h2>
                </div>
              </div>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-6">
                Asphalt shingle roof systems are the most popular application for residential roofs. They consist of more than just shingles: roof sheathing, metal flashings, underlayment, stack flashings, vent flashings, and shingles. It is important that the entire system gets addressed upon inspection.
              </p>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-8">
                Our team attends all manufacturer training sessions and is knowledgeable of manufacturer specifications and warranties. From designer to luxury shingles we have installed them all to manufacturer specification.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {["GAF","CertainTeed","IKO","BP"].map(b => (
                  <div key={b} className="border border-secondary-200 bg-white p-3 text-center">
                    <span className="font-julius text-secondary-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <div className="bg-secondary-800 p-4">
                <div className="font-montserrat text-white/60 text-xs uppercase tracking-wider mb-1">GAF Master Elite</div>
                <div className="font-montserrat text-white text-sm">Authorized to offer the Golden Pledge Warranty — the strongest available.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 CEDAR ── gray-50, full-width image strip top ── */}
      <section id="cedar" className="w-full bg-gray-50 relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            {Array.from({length:16}, (_, c) =>
              Array.from({length:9}, (_, r) => {
                const x=c*80+40, y=r*80+40;
                return <g key={`${c}-${r}`}>
                  <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="#0b4e6f" strokeWidth="0.75"/>
                  <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="#0b4e6f" strokeWidth="0.75"/>
                </g>;
              })
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex items-center gap-6 mb-10">
            <span className="font-julius text-primary-100 leading-none shrink-0" style={{fontSize:"clamp(4rem,7vw,7rem)"}}>03</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-px w-5 bg-secondary-600"/>
                <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-wider">Premium</span>
              </div>
              <h2 className="font-julius text-primary-950 leading-tight" style={{fontSize:"clamp(1.75rem,3vw,2.5rem)"}}>Cedar Shakes &amp; Shingles</h2>
            </div>
          </div>

          {/* Gallery strip at top */}
          {cedarImages.length > 0 && (
            <div className="mb-10">
              <SystemImageGrid urls={cedarImages} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-5">
                Cedar shakes and shingles are more aesthetically pleasing and typically have a longer life than a basic asphalt shingle. Cedar roofs have exceptional thermal insulation properties which can help lower heating costs. There is more difficulty in installing a cedar roof in comparison to an asphalt shingle roof.
              </p>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                We follow the guidelines from the <em>Cedar Shake &amp; Shingle Bureau Roof Manual</em> — the highest standard for cedar installation guidelines.
              </p>
            </div>
            <div className="bg-primary-950 p-6">
              <div className="font-montserrat text-secondary-400 text-xs uppercase tracking-wider mb-3">Why Cedar</div>
              {["Longer lifespan than asphalt","Superior thermal insulation","Naturally beautiful appearance","Increased home value"].map(i => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <FaCircleCheck size={12} className="text-secondary-400 shrink-0 mt-0.5"/>
                  <span className="font-montserrat text-white/75 text-sm">{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 COPPER & EXOTIC ── very dark, full bleed feel ── */}
      <section id="copper" className="w-full bg-primary-900 relative overflow-hidden py-20 sm:py-28">
        {/* Angular brackets + decorative lines */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="60" x2="60" y2="440" stroke="white" strokeWidth="2"/>
            <line x1="60" y1="60" x2="130" y2="60" stroke="white" strokeWidth="2"/>
            <line x1="60" y1="440" x2="130" y2="440" stroke="white" strokeWidth="2"/>
            <line x1="1140" y1="60" x2="1140" y2="440" stroke="white" strokeWidth="2"/>
            <line x1="1140" y1="60" x2="1070" y2="60" stroke="white" strokeWidth="2"/>
            <line x1="1140" y1="440" x2="1070" y2="440" stroke="white" strokeWidth="2"/>
            <circle cx="600" cy="250" r="100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="6 8"/>
            <circle cx="600" cy="250" r="60" fill="none" stroke="white" strokeWidth="0.5"/>
            <line x1="560" y1="250" x2="640" y2="250" stroke="white" strokeWidth="0.5"/>
            <line x1="600" y1="210" x2="600" y2="290" stroke="white" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-julius text-secondary-700 leading-none" style={{fontSize:"clamp(3rem,5vw,5rem)"}}>04</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-px w-5 bg-secondary-600"/>
                    <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-wider">Lifetime Materials</span>
                  </div>
                  <h2 className="font-julius text-white leading-tight" style={{fontSize:"clamp(1.75rem,3vw,2.5rem)"}}>Custom Copper<br />&amp; Exotic Metals</h2>
                </div>
              </div>
              <p className="font-montserrat text-white/70 text-base leading-relaxed mb-5">
                Copper and exotic metal work, when installed properly, is intended to last a lifetime. It is important to find a copper-smith who can fabricate and install copper properly without too much use of caulking, solder and petrochemical sealants.
              </p>
              <p className="font-montserrat text-white/65 text-base leading-relaxed mb-8">
                We fabricate and install to historical standards. Applications include: shingles, panels, flashings, gutters and downpipes.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Copper Shingles","Copper Panels","Copper Flashings","Custom Gutters","Exotic Metals"].map(a => (
                  <span key={a} className="font-montserrat text-xs border border-secondary-700 text-secondary-400 px-3 py-1.5">{a}</span>
                ))}
              </div>
            </div>
            <div>
              {copperImages.length > 0 ? (
                <SystemImageGrid urls={copperImages} />
              ) : (
                <div className="bg-primary-800 aspect-4/3 flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <div className="font-julius text-white/20 text-2xl mb-2">Copper &amp; Metal</div>
                    <div className="font-montserrat text-white/20 text-xs">Gallery — add via admin panel</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 METAL ROOFING & GUTTERS ── white, wide layout ── */}
      <section id="metal" className="w-full bg-white relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Standing seam line pattern */}
          <svg className="absolute right-0 top-0 w-1/2 h-full opacity-[0.04]" viewBox="0 0 600 800" preserveAspectRatio="xMaxYMid slice">
            {Array.from({length:20}, (_, i) => (
              <g key={i}>
                <line x1={i*32} y1="0" x2={i*32} y2="800" stroke="#0b4e6f" strokeWidth="2"/>
                <line x1={i*32+4} y1="0" x2={i*32+4} y2="800" stroke="#0b4e6f" strokeWidth="0.5"/>
                <line x1={i*32+28} y1="0" x2={i*32+28} y2="800" stroke="#0b4e6f" strokeWidth="0.5"/>
              </g>
            ))}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="mb-10">
            <div className="flex items-center gap-4">
              <span className="font-julius text-gray-100 leading-none" style={{fontSize:"clamp(4rem,7vw,7rem)"}}>05</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-px w-5 bg-secondary-600"/>
                  <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-wider">Fabricated In-House</span>
                </div>
                <h2 className="font-julius text-primary-950 leading-tight" style={{fontSize:"clamp(1.75rem,3vw,2.5rem)"}}>Metal Roofing &amp; Gutters</h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2">
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-5">
                There are many different types of aluminum and steel roofing applications. We install all metal roofing systems and have our own machinery to fabricate many different types of metal roof panels in our shop. We also install other manufacturers&apos; metal roof systems.
              </p>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                We also install many different aluminum and steel gutters and downpipes from basic to custom profiles. Custom concealed gutters, recessed downpipes, and architectural profiles are all fabricated in-house.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 p-6">
              <div className="font-montserrat text-gray-400 text-xs uppercase tracking-wider mb-3">What We Fabricate</div>
              {["Standing seam panels","Corrugated panels","Custom box profiles","K-style gutters","Square downpipes","Concealed systems"].map(i => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <FaCircleCheck size={11} className="text-secondary-600 shrink-0"/>
                  <span className="font-montserrat text-gray-600 text-xs">{i}</span>
                </div>
              ))}
            </div>
          </div>

          {metalImages.length > 0 && <SystemImageGrid urls={metalImages} />}
        </div>
      </section>

      {/* ── 06 NATURAL SLATE ── cream, editorial quote layout ── */}
      <section id="slate" className="w-full bg-[rgb(255,253,245)] relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="40" x2="120" y2="40" stroke="#0b4e6f" strokeWidth="1"/>
            <line x1="60" y1="40" x2="60" y2="100" stroke="#0b4e6f" strokeWidth="1"/>
            <line x1="1140" y1="40" x2="1080" y2="40" stroke="#0b4e6f" strokeWidth="1"/>
            <line x1="1140" y1="40" x2="1140" y2="100" stroke="#0b4e6f" strokeWidth="1"/>
            <line x1="60" y1="560" x2="120" y2="560" stroke="#0b4e6f" strokeWidth="1"/>
            <line x1="60" y1="560" x2="60" y2="500" stroke="#0b4e6f" strokeWidth="1"/>
            <line x1="1140" y1="560" x2="1080" y2="560" stroke="#0b4e6f" strokeWidth="1"/>
            <line x1="1140" y1="560" x2="1140" y2="500" stroke="#0b4e6f" strokeWidth="1"/>
            <rect x="60" y="40" width="1080" height="520" fill="none" stroke="#0b4e6f" strokeWidth="0.5" strokeDasharray="6 6"/>
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-julius text-secondary-200 leading-none" style={{fontSize:"clamp(3rem,5vw,5rem)"}}>06</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-px w-5 bg-secondary-600"/>
                    <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-wider">Heritage Standard</span>
                  </div>
                  <h2 className="font-julius text-primary-950 leading-tight" style={{fontSize:"clamp(1.75rem,3vw,2.5rem)"}}>Natural Slate Tiles</h2>
                </div>
              </div>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-5">
                Due to the nature of slate roofing tiles, installation difficulty, and their cost, it is important that only the highest skilled and experienced tradesmen should perform your slate installation or repair. Slate tiles are available in several colours and sizes.
              </p>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-8">
                A properly installed slate roof can be the most aesthetically pleasing and longest lasting option for your roof. All installations follow <em>The Slate Roof Bible</em> by Joseph Jenkins. We source from North Country Slate in Toronto.
              </p>
              <div className="border-l-4 border-secondary-600 pl-5 py-2">
                <div className="font-montserrat text-secondary-800 text-sm italic leading-relaxed">
                  &ldquo;The standard reference for proper slate installation — we follow it on every project.&rdquo;
                </div>
                <div className="font-montserrat text-gray-400 text-xs mt-2">The Slate Roof Bible · Joseph Jenkins</div>
              </div>
            </div>
            <div>
              {slateImages.length > 0 ? (
                <SystemImageGrid urls={slateImages} />
              ) : (
                <div className="aspect-4/3 bg-primary-50 border border-primary-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="font-julius text-primary-200 text-2xl mb-2">Natural Slate</div>
                    <div className="font-montserrat text-primary-300 text-xs">Add gallery images via admin panel</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 SYNTHETIC SLATE ── gray-50 ── */}
      <section id="synthetic" className="w-full bg-gray-50 relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            {Array.from({length:16}, (_, c) =>
              Array.from({length:8}, (_, r) => {
                const x=c*80+40, y=r*70+40;
                return <g key={`${c}-${r}`}>
                  <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="#0b4e6f" strokeWidth="0.75"/>
                  <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="#0b4e6f" strokeWidth="0.75"/>
                </g>;
              })
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          {syntheticImages.length > 0 && (
            <div className="mb-10">
              <SystemImageGrid urls={syntheticImages} />
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-julius text-secondary-200 leading-none" style={{fontSize:"clamp(3rem,5vw,5rem)"}}>07</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-px w-5 bg-secondary-600"/>
                    <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-wider">Modern Alternative</span>
                  </div>
                  <h2 className="font-julius text-primary-950 leading-tight" style={{fontSize:"clamp(1.75rem,3vw,2.5rem)"}}>Synthetic Slate Tiles</h2>
                </div>
              </div>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                Synthetic slate has been gaining tons of popularity over the last few years. We have lots of experience installing many different brands. Synthetic products look gorgeous and also last a lot longer than a typical asphalt shingle roof.
              </p>
            </div>
            <div>
              <div className="font-montserrat text-gray-400 text-xs uppercase tracking-wider mb-4">Brands We Install</div>
              <div className="grid grid-cols-2 gap-3">
                {["Eco-Star","Inspire Slate","Da Vinci Single Width","Da Vinci Multi Width","Synthetic Shake Tiles"].map(b => (
                  <div key={b} className="bg-white border border-gray-100 p-4">
                    <div className="font-montserrat text-gray-700 text-sm">{b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 SKYLIGHTS ── dark navy, centered ── */}
      <section id="skylights" className="w-full bg-primary-950 relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            {/* Skylight grid pattern */}
            {Array.from({length:6}, (_, col) =>
              Array.from({length:3}, (_, row) => {
                const x=col*200+100, y=row*130+70;
                return <g key={`${col}-${row}`}>
                  <rect x={x-60} y={y-40} width={120} height={80} fill="none" stroke="white" strokeWidth="0.75"/>
                  <line x1={x-60} y1={y} x2={x+60} y2={y} stroke="white" strokeWidth="0.4"/>
                  <line x1={x} y1={y-40} x2={x} y2={y+40} stroke="white" strokeWidth="0.4"/>
                </g>;
              })
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-secondary-600"/>
              <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-[0.18em]">08 · Skylight Installation</span>
              <span className="h-px w-8 bg-secondary-600"/>
            </div>
            <h2 className="font-julius text-white leading-tight mb-6" style={{fontSize:"clamp(2rem,4vw,3rem)"}}>Skylight Installation</h2>
            <p className="font-montserrat text-white/70 text-base leading-relaxed mb-5">
              To install skylights properly you must complete the necessary framing and rough carpentry before you install the skylight. The framing must be completed according to building code. Once you cut one or more roof rafters for the skylight tunnel you must follow procedures to keep the roof framing to building code.
            </p>
            <p className="font-montserrat text-white/60 text-base leading-relaxed mb-10">
              We specialize in skylight installation for all major manufacturers. All framing and roofing work is self-performed by our team.
            </p>
            <Link href="/quote"
              className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-8 py-4 transition-all duration-300">
              Request A Skylight Quote
              <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300"/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── YouTube ── */}
      <section className="w-full py-12 bg-white">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10">
          <YouTubeEmbed videoId="J0_g6N3-WeU" />
        </div>
      </section>

      {/* ── Manufacturers ── */}
      {carouselMImages.length > 0 && (
        <section className="w-full py-12 bg-gray-50 border-t border-gray-100">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10">
            <h3 className="font-julius text-center text-primary-950 text-xl mb-2">Manufacturers We Install</h3>
            <p className="font-montserrat text-center text-gray-400 text-xs mb-6 uppercase tracking-widest">GAF · CertainTeed · Soprema · Da Vinci · North Country Slate · IKO · BP</p>
            <Marquee images={carouselMImages.map(i => ({ url: i.url, alt: i.alt ?? "" }))} />
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
                <span className="font-montserrat text-white/60 text-xs uppercase tracking-[0.18em]">GAF Master Elite Certified</span>
              </div>
              <h2 className="font-julius text-white leading-tight mb-4" style={{fontSize:"clamp(1.75rem,2.5vw,2.5rem)"}}>
                Ready to Replace Your Roof?
              </h2>
              <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
                Free site visit, honest assessment, detailed written proposal. GAF Golden Pledge warranty available on eligible projects.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:shrink-0">
              <Link href="/quote"
                className="group inline-flex items-center justify-center gap-3 bg-white text-secondary-900 hover:bg-primary-50 font-montserrat text-sm font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300">
                Request A Free Quote
                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300"/>
              </Link>
              <Link href={BRAND_CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm px-8 py-4 transition-all duration-300 hover:bg-white/10">
                <FaPhone size={11}/>{BRAND_CONTACT.phone}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}