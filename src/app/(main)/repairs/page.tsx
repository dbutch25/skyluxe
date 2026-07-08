import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import { getRepairsPage } from "@/lib/data";
import { BRAND_CONTACT } from "@/constants/brand";
import { images } from "@/constants";

export const metadata = {
  title: "Repairs & Maintenance | Skyluxe Roofing & Sheet Metal — GTA",
  description:
    "24-hour emergency roof repair across the GTA. Infrared moisture detection, leak diagnosis, HVAC curb installation, and semi-annual maintenance programs for all major roofing systems.",
};

const FALLBACK = {
  firstContent:
    "Our experienced workforce is trained to repair any roof system. We offer 24 hour emergency service for those unexpected situations and we also provide asset management and maintenance programs to ensure your roof investment will last.",
  secondContent:
    "We use advanced expertise in sourcing, detecting and diagnosing leaks. Once we have identified the roof issues we provide solutions for your review. Infrared moisture detection is a proven method for detecting trapped moisture in a flat roofing system. When you find trapped moisture early you can catch smaller issues early on before they become big issues.",
  thirdContent:
    "Our preventative maintenance programs are thorough and valuable. The programs are calculated based on the program's duration and the roof's size. The service includes a regular inspection by a professional roof inspector. The service consists of cleaning the roof of any debris and re-caulking where necessary. We then provide an in-depth written report with photo documentation.",
  services: [
    "24 Hour Emergency Service",
    "HVAC & Mechanical Cone Installation",
    "Retro-fit Curb Installation",
    "Skylight Installation",
    "Destructive and Non-Destructive Moisture Testing",
    "Roof Inspections, Evaluations & Reports",
    "Semi-Annual Preventative Maintenance Programs",
  ],
};

export default async function RepairsPage() {
  let data = null;
  try { data = await getRepairsPage(); } catch { /* fallback */ }

  const firstContent = data?.firstContent ?? FALLBACK.firstContent;
  const secondContent = data?.secondContent ?? FALLBACK.secondContent;
  const firstImageUrl = data?.firstImageUrl;
  const firstImageAlt = data?.firstImageAlt ?? "Infrared moisture detection on flat roof";
  const thirdContent = data?.thirdContent ?? FALLBACK.thirdContent;
  const additionalImages = data?.images ?? [];
  const serviceItems: string[] = data?.listSections?.length
    ? data.listSections.flatMap(s => s.items)
    : FALLBACK.services;

  return (
    <>
      {/* ── HERO — split: left dark urgent, right emergency phone ── */}
      <section className="relative w-full overflow-hidden bg-primary-950" style={{ minHeight: "80vh" }}>
        {/* Concentric detection circle SVG — radar feel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-150 h-150 opacity-[0.06]" viewBox="0 0 600 600">
            {[280, 230, 180, 130, 80, 40].map((r, i) => (
              <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="white" strokeWidth={i === 0 ? 1 : 0.75} strokeDasharray={i % 2 === 0 ? "none" : "6 6"}/>
            ))}
            {/* Cross hairs */}
            <line x1="20" y1="300" x2="580" y2="300" stroke="white" strokeWidth="0.5"/>
            <line x1="300" y1="20" x2="300" y2="580" stroke="white" strokeWidth="0.5"/>
            {/* IR detection dot */}
            <circle cx="380" cy="240" r="8" fill="none" stroke="#4799c2" strokeWidth="1.5"/>
            <circle cx="380" cy="240" r="3" fill="#4799c2" opacity="0.7"/>
            <line x1="388" y1="232" x2="420" y2="200" stroke="#4799c2" strokeWidth="0.75"/>
            <rect x="420" y="185" width="80" height="18" fill="none" stroke="#4799c2" strokeWidth="0.75"/>
            <text x="460" y="198" textAnchor="middle" fill="#4799c2" fontFamily="monospace" fontSize="9" opacity="0.8">MOISTURE</text>
          </svg>
          {/* Structural crack line pattern — left */}
          <svg className="absolute left-0 bottom-0 w-48 h-48 opacity-[0.08]" viewBox="0 0 200 200" aria-hidden="true">
            <path d="M20,180 L60,140 L50,110 L90,70 L80,40 L120,20" fill="none" stroke="white" strokeWidth="1.5"/>
            <path d="M60,140 L90,155 L110,130" fill="none" stroke="white" strokeWidth="0.75"/>
            <path d="M90,70 L120,85 L130,65" fill="none" stroke="white" strokeWidth="0.75"/>
          </svg>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-600"/>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-secondary-600"/>
                <span className="font-montserrat text-secondary-300 text-xs uppercase tracking-[0.2em]">Emergency &amp; Preventative</span>
              </div>
              <h1 className="font-julius text-white leading-none mb-6" style={{fontSize:"clamp(3rem,7vw,6rem)"}}>
                Repairs &amp;<br/>
                <span className="text-secondary-300">Maintenance.</span>
              </h1>
              <p className="font-montserrat text-white/70 text-base leading-relaxed mb-8 max-w-lg">{firstContent}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={BRAND_CONTACT.phoneHref}
                  className="group inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white font-montserrat text-sm font-medium uppercase tracking-widest px-7 py-4 transition-all duration-300">
                  <FaPhone size={11}/> Call Now — 24/7
                </Link>
                <Link href="/quote"
                  className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm px-7 py-4 transition-all duration-300 hover:bg-white/10">
                  Request A Quote <FaArrowRight size={11}/>
                </Link>
              </div>
            </div>

            {/* Right — Emergency contact card */}
            <div className="bg-secondary-800 relative overflow-hidden p-8">
              {/* Pulse rings */}
              <div className="absolute top-6 right-6" aria-hidden="true">
                <div className="w-4 h-4 rounded-full bg-green-400 relative">
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60"/>
                </div>
              </div>
              <div className="font-montserrat text-white/50 text-xs uppercase tracking-widest mb-4">Available Right Now</div>
              <div className="font-julius text-white text-3xl mb-1">24/7</div>
              <div className="font-montserrat text-secondary-300 text-sm mb-6">Emergency Response</div>
              <div className="border-t border-white/10 pt-6 mb-6">
                <Link href={BRAND_CONTACT.phoneHref}
                  className="group inline-flex items-center gap-3 font-julius text-white hover:text-secondary-200 transition-colors duration-300"
                  style={{fontSize:"1.5rem"}}>
                  <FaPhone size={18} className="text-secondary-400"/>
                  {BRAND_CONTACT.phone}
                </Link>
                <div className="font-montserrat text-white/40 text-xs mt-1 ml-8">Direct to our team — no call centre</div>
              </div>
              <div className="flex flex-col gap-2">
                {["Active leaks — residential & commercial","Roof damage after storms","HVAC penetration failures","Emergency tarping & protection"].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <FaCircleCheck size={11} className="text-secondary-400 shrink-0"/>
                    <span className="font-montserrat text-white/70 text-xs">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFRARED DETECTION — feature section, image + tech copy ── */}
      <section className="w-full bg-white relative overflow-hidden py-20 sm:py-24">
        {/* Scan line SVG */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            {Array.from({length:25}, (_, i) => (
              <line key={i} x1="0" y1={i*22} x2="1200" y2={i*22} stroke="#0b4e6f" strokeWidth="0.75"/>
            ))}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              {firstImageUrl ? (
                <div className="relative overflow-hidden aspect-4/3">
                  <Image src={firstImageUrl} alt={firstImageAlt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
                </div>
              ) : (
                /* Infrared detection illustration */
                <div className="bg-primary-950 aspect-4/3 relative overflow-hidden flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 640 480" aria-label="Infrared moisture detection diagram">
                    {/* Roof plane */}
                    <rect x="0" y="180" width="640" height="300" fill="#0b1220"/>
                    {/* Grid lines on roof */}
                    {Array.from({length:8}, (_, i) => (
                      <line key={`h${i}`} x1="0" y1={180+i*37} x2="640" y2={180+i*37} stroke="#172640" strokeWidth="0.75"/>
                    ))}
                    {Array.from({length:10}, (_, i) => (
                      <line key={`v${i}`} x1={i*72} y1="180" x2={i*72} y2="480" stroke="#172640" strokeWidth="0.75"/>
                    ))}
                    {/* Moisture zone — glowing */}
                    <ellipse cx="350" cy="290" rx="90" ry="60" fill="#4799c2" opacity="0.15"/>
                    <ellipse cx="350" cy="290" rx="60" ry="40" fill="#4799c2" opacity="0.25"/>
                    <ellipse cx="350" cy="290" rx="30" ry="20" fill="#4799c2" opacity="0.5"/>
                    <ellipse cx="350" cy="290" rx="8" ry="5" fill="#4799c2" opacity="0.9"/>
                    {/* IR camera icon */}
                    <rect x="280" y="80" width="80" height="60" rx="4" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7"/>
                    <circle cx="320" cy="110" r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.7"/>
                    <circle cx="320" cy="110" r="8" fill="none" stroke="white" strokeWidth="0.75" opacity="0.5"/>
                    {/* Scan line from camera to moisture */}
                    <line x1="320" y1="140" x2="350" y2="260" stroke="#4799c2" strokeWidth="0.75" strokeDasharray="6 4" opacity="0.6"/>
                    {/* Labels */}
                    <text x="395" y="295" fill="#4799c2" fontFamily="monospace" fontSize="10" opacity="0.8">MOISTURE DETECTED</text>
                    <text x="325" y="78" fill="white" fontFamily="monospace" fontSize="9" opacity="0.5">IR CAMERA</text>
                    <text x="50" y="198" fill="white" fontFamily="monospace" fontSize="9" opacity="0.35">ROOF MEMBRANE</text>
                  </svg>
                </div>
              )}
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-secondary-800 px-5 py-3">
                <div className="font-julius text-white text-sm">Infrared</div>
                <div className="font-montserrat text-secondary-300 text-xs">Moisture Detection</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-secondary-600"/>
                <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">Advanced Diagnostics</span>
              </div>
              <h2 className="font-julius text-primary-950 leading-tight mb-6" style={{fontSize:"clamp(1.75rem,2.5vw,2.25rem)"}}>
                Find It Before<br/>It Finds You.
              </h2>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-5">{secondContent}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  {n:"Non-destructive", label:"Testing method"},
                  {n:"Thermal", label:"Imaging technology"},
                  {n:"Early", label:"Detection saves cost"},
                  {n:"Written", label:"Report with photos"},
                ].map(({n, label}) => (
                  <div key={n} className="border-l-2 border-secondary-600 pl-3">
                    <div className="font-julius text-primary-950 text-base">{n}<span className="text-secondary-500">.</span></div>
                    <div className="font-montserrat text-gray-400 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── YouTube ── */}
      <section className="w-full py-10 bg-gray-50">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10">
          <YouTubeEmbed videoId="_p-8Mr9HjcI"/>
        </div>
      </section>

      {/* ── MAINTENANCE PROGRAMS — two column split ── */}
      <section className="w-full bg-[rgb(255,253,245)] relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            {Array.from({length:16}, (_, c) =>
              Array.from({length:8}, (_, r) => {
                const x=c*80+40, y=r*70+40;
                return <g key={`${c}-${r}`}>
                  <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="#0b4e6f" strokeWidth="0.75"/>
                  <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="#0b4e6f" strokeWidth="0.75"/>
                </g>;
              })
            )}
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Maintenance card */}
            <div className="bg-white border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-950 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-secondary-400" aria-hidden="true">
                    <path d="M8 6L8 18M12 4V20M16 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className="font-montserrat text-secondary-700 text-xs uppercase tracking-wider">Scheduled</div>
                  <h3 className="font-julius text-primary-950 text-lg">Semi-Annual Programs</h3>
                </div>
              </div>
              <p className="font-montserrat text-gray-600 text-sm leading-relaxed mb-5">{thirdContent}</p>
              <div className="border-t border-gray-100 pt-5 flex flex-col gap-2">
                {["Debris removal & drainage clearing","Re-caulking of flashings & penetrations","Professional roof inspector review","In-depth written report with photos","Program priced by size & duration"].map(i => (
                  <div key={i} className="flex items-center gap-2">
                    <FaCircleCheck size={11} className="text-secondary-600 shrink-0"/>
                    <span className="font-montserrat text-gray-600 text-xs">{i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset management card */}
            <div className="bg-primary-950 relative overflow-hidden p-8">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 400 400">
                  {[160,130,100,70,40].map(r => (
                    <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="white" strokeWidth="0.75" strokeDasharray="4 6"/>
                  ))}
                  <line x1="40" y1="200" x2="360" y2="200" stroke="white" strokeWidth="0.4"/>
                  <line x1="200" y1="40" x2="200" y2="360" stroke="white" strokeWidth="0.4"/>
                </svg>
              </div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-secondary-400" aria-hidden="true">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-montserrat text-secondary-400 text-xs uppercase tracking-wider">Ongoing</div>
                    <h3 className="font-julius text-white text-lg">Asset Management</h3>
                  </div>
                </div>
                <p className="font-montserrat text-white/70 text-sm leading-relaxed mb-5">
                  For property managers overseeing multiple buildings, we offer comprehensive asset management programs that track roof conditions, schedule maintenance, and provide long-term capital planning support.
                </p>
                <div className="flex flex-col gap-2">
                  {["Multi-building portfolio management","Condition assessment & reporting","Capital expenditure planning","Emergency response priority","Year-round coverage"].map(i => (
                    <div key={i} className="flex items-center gap-2">
                      <FaCircleCheck size={11} className="text-secondary-400 shrink-0"/>
                      <span className="font-montserrat text-white/75 text-xs">{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project images ── */}
      {additionalImages.length > 0 && (
        <section className="w-full bg-white py-12">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {additionalImages.slice(0,2).map((img, i) => (
                <div key={i} className="relative overflow-hidden aspect-4/3">
                  <Image src={img.url} alt={img.alt ?? "Skyluxe repair project"} fill className="object-cover" sizes="(max-width:640px) 100vw, 50vw"/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FULL SERVICE LIST — dark navy with angular bracket SVG ── */}
      <section className="w-full bg-primary-950 relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="60" x2="60" y2="440" stroke="white" strokeWidth="2"/>
            <line x1="60" y1="60" x2="130" y2="60" stroke="white" strokeWidth="2"/>
            <line x1="60" y1="440" x2="130" y2="440" stroke="white" strokeWidth="2"/>
            <line x1="1140" y1="60" x2="1140" y2="440" stroke="white" strokeWidth="2"/>
            <line x1="1140" y1="60" x2="1070" y2="60" stroke="white" strokeWidth="2"/>
            <line x1="1140" y1="440" x2="1070" y2="440" stroke="white" strokeWidth="2"/>
            {/* Centre cross */}
            <line x1="560" y1="220" x2="640" y2="220" stroke="white" strokeWidth="0.5" opacity="0.4"/>
            <line x1="600" y1="200" x2="600" y2="300" stroke="white" strokeWidth="0.5" opacity="0.4"/>
            <line x1="60" y1="250" x2="1140" y2="250" stroke="white" strokeWidth="0.3" strokeDasharray="8 8" opacity="0.2"/>
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-secondary-600"/>
                <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-[0.18em]">Everything We Cover</span>
              </div>
              <h2 className="font-julius text-white leading-tight mb-5" style={{fontSize:"clamp(1.75rem,2.5vw,2.25rem)"}}>
                Full Scope of<br/>Repair Services.
              </h2>
              <p className="font-montserrat text-white/60 text-base leading-relaxed mb-8">
                From a single flashing repair to a 24-hour emergency call on an active commercial leak — our crew handles it all with the same level of detail and accountability.
              </p>
              <Link href={BRAND_CONTACT.phoneHref}
                className="group inline-flex items-center gap-3 border border-secondary-600 hover:bg-secondary-800 text-secondary-300 hover:text-white font-montserrat text-sm font-medium uppercase tracking-widest px-6 py-3.5 transition-all duration-300">
                <FaPhone size={10}/>Call {BRAND_CONTACT.phone}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {serviceItems.map((item, i) => (
                <div key={item}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-4 hover:bg-white/8 hover:border-secondary-700 transition-all duration-300">
                  <span className="font-julius text-secondary-600 text-sm w-6 shrink-0">{String(i+1).padStart(2,"0")}</span>
                  <div className="w-px h-6 bg-white/20 shrink-0"/>
                  <span className="font-montserrat text-white/85 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── YouTube 2 ── */}
      <section className="w-full py-10 bg-white">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10">
          <YouTubeEmbed videoId="_2aLooK4DMk"/>
        </div>
      </section>

      {/* ── CTA ── urgent tone ── */}
      <section className="w-full bg-secondary-800 relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.05]" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMid slice">
            {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={60*i} x2="400" y2={60*i} stroke="white" strokeWidth="0.5"/>)}
            {[0,1,2,3,4,5].map(i => <line key={`v${i}`} x1={80*i} y1="0" x2={80*i} y2="300" stroke="white" strokeWidth="0.5"/>)}
          </svg>
        </div>
        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                <span className="font-montserrat text-green-400 text-xs uppercase tracking-widest">Lines Open 24/7</span>
              </div>
              <h2 className="font-julius text-white leading-tight mb-4" style={{fontSize:"clamp(1.75rem,2.5vw,2.5rem)"}}>
                Have a Leak? Call Us Now.
              </h2>
              <p className="font-montserrat text-white/70 text-base max-w-lg leading-relaxed">
                We respond to active leaks any time of day. Property managers, building owners, and GCs across the GTA trust us for reliable emergency service.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0">
              <Link href={BRAND_CONTACT.phoneHref}
                className="group inline-flex items-center justify-center gap-3 bg-white text-secondary-900 hover:bg-primary-50 font-montserrat text-sm font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300">
                <FaPhone size={11}/>{BRAND_CONTACT.phone}
              </Link>
              <Link href="/quote"
                className="inline-flex items-center justify-center gap-3 border border-white/30 hover:border-white text-white font-montserrat text-sm px-8 py-4 transition-all duration-300 hover:bg-white/10">
                Schedule Maintenance <FaArrowRight size={11}/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
