import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import { Marquee } from "@/components/elements/Marquee";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import { getICIRoofingPage } from "@/lib/data";
import { BRAND_CONTACT } from "@/constants/brand";
import { images } from "@/constants";

export const metadata = {
  title: "ICI Roofing | Skyluxe Roofing & Sheet Metal — GTA",
  description:
    "Full-service ICI roofing contractor. Roof replacements, new construction, BUR, SBS, TPO, EPDM, inverted systems. Serving property managers, institutions and GCs across the GTA.",
};

const FALLBACK = {
  title: "ICI Roofing",
  content: "Skyluxe Roofing and Sheet Metal is a full-service ICI roofing contractor specializing in roof replacements, new construction installation, roof repairs and maintenance services. Our commitment to quality ensures you the best client experience by providing the most accurate and valuable solutions for your buildings using premium materials and superior workmanship.",
  firstTitle: "Roof Replacement & New Construction Installation",
  firstContent: "Skyluxe Roofing and Sheet Metal offers a wide range of roofing services in the Greater Toronto Area to property management firms, institutions, general contractors and property owners. We want to earn your trust as a client and we will go the extra mile to complete your roofing project on time and within budget.",
  secondContent: "Then we begin replacing or installing the new roof system which may be designed by a roof consultant/engineer who is co-working on the project or by one of our professional in-house staff members who will design the roof system to conform to your unique building requirements. Once the roof is complete our sheet metal division will then fabricate the necessary sheet metal flashings and begin installing them. We will then complete a final walk-through to address any deficiencies and for a final site cleanup.",
  thirdContent: "Performing your roof replacement without disrupting the normal course of operations inside the building is our top concern. This is accomplished by preparing a proper set-up and implementing a unique execution plan.",
  secondTitle: "We Specialize In",
  listItems: ["BUR","SBS Modified Bitumen","SEBS Modified Bitumen","Cold Applied Modified Bitumen","Thermoplastic Membranes","EPDM","Inverted Roof Systems","Green Roof Systems"],
  extraTitle: "Trusted Manufacturers",
};

export default async function ICIPage() {
  let data = null;
  try { data = await getICIRoofingPage(); } catch { /* fallback */ }

  const title = data?.title ?? FALLBACK.title;
  const content = data?.content ?? FALLBACK.content;
  const firstTitle = data?.firstTitle ?? FALLBACK.firstTitle;
  const firstContent = data?.firstContent ?? FALLBACK.firstContent;
  const firstImageUrl = data?.firstImageUrl;
  const firstImageAlt = data?.firstImageAlt ?? "ICI commercial roofing project by Skyluxe";
  const secondImageUrl = data?.secondImageUrl;
  const secondImageAlt = data?.secondImageAlt ?? "Commercial roof installation";
  const secondContent = data?.secondContent ?? FALLBACK.secondContent;
  const thirdContent = data?.thirdContent ?? FALLBACK.thirdContent;
  const secondTitle = data?.secondTitle ?? FALLBACK.secondTitle;
  const galleryImages = data?.galleryImages ?? [];
  const extraTitle = data?.extraTitle ?? FALLBACK.extraTitle;
  const carouselMImages = data?.carouselMImages ?? [];
  const listItems: string[] = data?.listSections ? data.listSections.flatMap(s => s.items) : FALLBACK.listItems;
  if (data?.listItem) listItems.push(data.listItem);

  return (
    <>
      {/* ── HERO — full dark, large industrial typography ── */}
      <section className="relative w-full overflow-hidden bg-primary-950" style={{ minHeight: "90vh" }}>
        {/* Isometric building grid SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
            {/* Isometric grid — horizontal lines */}
            {Array.from({length:20}, (_, i) => (
              <line key={`h${i}`} x1={0} y1={i*40} x2={1200} y2={i*40} stroke="white" strokeWidth="0.5"/>
            ))}
            {/* Isometric grid — diagonal lines left to right */}
            {Array.from({length:30}, (_, i) => (
              <line key={`d1-${i}`} x1={i*80-600} y1={0} x2={i*80+400} y2={700} stroke="white" strokeWidth="0.4"/>
            ))}
            {/* Isometric grid — diagonal lines right to left */}
            {Array.from({length:30}, (_, i) => (
              <line key={`d2-${i}`} x1={i*80+1800} y1={0} x2={i*80+800} y2={700} stroke="white" strokeWidth="0.4"/>
            ))}
            {/* Building silhouette */}
            <rect x="700" y="200" width="400" height="440" fill="white" opacity="0.03"/>
            <rect x="720" y="180" width="360" height="460" fill="none" stroke="white" strokeWidth="1" opacity="0.15"/>
            <line x1="900" y1="180" x2="900" y2="640" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            {[200,240,280,320,360,400,440,480,520,560,600].map(y => (
              <line key={`w${y}`} x1="720" y1={y} x2="1080" y2={y} stroke="white" strokeWidth="0.5" opacity="0.08"/>
            ))}
          </svg>
        </div>

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-600" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-40 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-secondary-600"/>
                <span className="font-montserrat text-secondary-300 text-xs uppercase tracking-[0.2em]">ICI Roofing Services</span>
              </div>
              <h1 className="font-julius text-white leading-none mb-6" style={{fontSize:"clamp(3.5rem,8vw,7rem)"}}>
                ICI<br />Roofing.
              </h1>
              <p className="font-montserrat text-white/70 text-base leading-relaxed mb-8 max-w-lg">{content}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300">
                  Request A Quote <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300"/>
                </Link>
                <Link href={BRAND_CONTACT.phoneHref} className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm px-7 py-4 transition-all duration-300 hover:bg-white/10">
                  <FaPhone size={11} className="text-secondary-300"/>{BRAND_CONTACT.phone}
                </Link>
              </div>
            </div>
            {/* Stats right panel */}
            <div className="grid grid-cols-2 gap-px bg-white/10">
              {[
                {n:"200+", label:"ICI Projects", sub:"Completed across the GTA"},
                {n:"On Time", label:"Guaranteed", sub:"Every project, every time"},
                {n:"GAF", label:"Master Elite", sub:"Fewer than 3% qualify"},
                {n:"10yr", label:"Warranty", sub:"Industry-leading coverage"},
              ].map(({n,label,sub}) => (
                <div key={label} className="bg-primary-950 p-6 text-center hover:bg-primary-900 transition-colors duration-300">
                  <div className="font-julius text-white text-2xl mb-1">{n}<span className="text-secondary-500">.</span></div>
                  <div className="font-montserrat text-white/70 text-xs font-medium uppercase tracking-wide mb-1">{label}</div>
                  <div className="font-montserrat text-white/35 text-xs">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT SPLIT 1 — white, 60/40 ── */}
      <section className="w-full bg-white py-20 sm:py-28">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-secondary-600"/>
                <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">Roof Replacement</span>
              </div>
              <h2 className="font-julius text-primary-950 leading-tight mb-6" style={{fontSize:"clamp(1.75rem,2.5vw,2.25rem)"}}>
                {firstTitle}
              </h2>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-5">{firstContent}</p>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">{secondContent}</p>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {firstImageUrl ? (
                <div className="relative overflow-hidden aspect-4/3">
                  <Image src={firstImageUrl} alt={firstImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw"/>
                </div>
              ) : (
                <div className="bg-primary-950 aspect-4/3 flex items-center justify-center">
                  <div className="font-julius text-white/20 text-2xl">ICI Project</div>
                </div>
              )}
              {secondImageUrl && (
                <div className="relative overflow-hidden aspect-video">
                  <Image src={secondImageUrl} alt={secondImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw"/>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── YouTube 1 ── */}
      <section className="w-full py-8 bg-gray-50">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10">
          <YouTubeEmbed videoId="NGxrJwvH-j4"/>
        </div>
      </section>

      {/* ── SYSTEMS — dark navy technical grid ── */}
      <section className="w-full bg-primary-950 relative overflow-hidden py-20 sm:py-28">
        {/* Technical elevation lines SVG */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="30" x2="1200" y2="30" stroke="white" strokeWidth="0.5"/>
            <line x1="0" y1="470" x2="1200" y2="470" stroke="white" strokeWidth="0.5"/>
            {Array.from({length:13}, (_, i) => (
              <g key={i}>
                <line x1={i*100} y1="25" x2={i*100} y2="42" stroke="white" strokeWidth="0.75"/>
                <line x1={i*100} y1="458" x2={i*100} y2="475" stroke="white" strokeWidth="0.75"/>
              </g>
            ))}
            {Array.from({length:49}, (_, i) => i*25).map(x => x%100!==0 ? (
              <g key={x}>
                <line x1={x} y1="25" x2={x} y2="33" stroke="white" strokeWidth="0.4"/>
                <line x1={x} y1="467" x2={x} y2="475" stroke="white" strokeWidth="0.4"/>
              </g>
            ) : null)}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-secondary-600"/>
                <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-[0.18em]">Technical Capabilities</span>
              </div>
              <h2 className="font-julius text-white leading-tight" style={{fontSize:"clamp(1.75rem,2.5vw,2.25rem)"}}>
                {secondTitle}
              </h2>
            </div>
            <div>
              <p className="font-montserrat text-white/60 text-base leading-relaxed">{thirdContent}</p>
            </div>
          </div>

          {/* Systems — 2-col checklist with large numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listItems.map((item, i) => (
              <div key={item} className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-4 hover:bg-white/8 transition-colors duration-300">
                <span className="font-julius text-secondary-600 text-lg w-8 shrink-0">{String(i+1).padStart(2,"0")}</span>
                <div className="w-px h-8 bg-white/20 shrink-0"/>
                <span className="font-montserrat text-white/85 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YouTube 2 ── */}
      <section className="w-full py-10 bg-white">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10">
          <YouTubeEmbed videoId="6lN089WHx_A"/>
        </div>
      </section>

      {/* ── Gallery ── */}
      {galleryImages.length > 0 && (
        <section className="w-full bg-gray-50">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10 pt-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-secondary-600"/>
              <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">Project Gallery</span>
            </div>
            <h2 className="font-julius text-primary-950 text-2xl mb-8">ICI Projects Across the GTA</h2>
          </div>
          <ServicePagesGallery images={galleryImages}/>
        </section>
      )}

      {/* ── Manufacturers ── */}
      {carouselMImages.length > 0 && (
        <section className="w-full py-12 bg-white border-t border-gray-100">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10">
            <h3 className="font-julius text-center text-primary-950 text-xl mb-2">{extraTitle}</h3>
            <Marquee images={carouselMImages.map(i => ({url:i.url, alt:i.alt??""}))}/>
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
                <span className="font-montserrat text-white/60 text-xs uppercase tracking-[0.18em]">Property Managers · Institutions · GCs</span>
              </div>
              <h2 className="font-julius text-white leading-tight mb-4" style={{fontSize:"clamp(1.75rem,2.5vw,2.5rem)"}}>Ready to Plan Your ICI Roof?</h2>
              <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">Free assessment and detailed written proposal. We respond within 24 hours and serve the full GTA.</p>
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
