import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import { Marquee } from "@/components/elements/Marquee";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import {
  ServiceHero,
  ServiceCTA,
  Label,
  CheckItem,
} from "@/components/layouts/ServicePageShell";
import { getICIRoofingPage } from "@/lib/data";
import { images } from "@/constants";

export const metadata = {
  title: "ICI Roofing | Skyluxe Roofing & Sheet Metal — GTA",
  description:
    "Full-service ICI roofing contractor in Mississauga. Roof replacements, new construction, repairs, and maintenance for property managers, institutions, and general contractors across the Greater Toronto Area.",
};

const FALLBACK = {
  title: "ICI Roofing",
  content:
    "Skyluxe Roofing and Sheet Metal is a full-service ICI roofing contractor specializing in roof replacements, new construction installation, roof repairs and maintenance services. Our commitment to quality ensures you the best client experience by providing the most accurate and valuable solutions for your buildings using premium materials and superior workmanship.",
  firstTitle: "Roof Replacement & New Construction Installation",
  firstContent:
    "Skyluxe Roofing and Sheet Metal offers a wide range of roofing services in the Greater Toronto Area to property management firms, institutions, general contractors and property owners. We want to earn your trust as a client and we will go the extra mile to complete your roofing project on time and within budget. We strive on providing our clients with the most professional workmanship possible from start to finish. In the beginning stages of the project we ensure that all exterior and interior building elements are protected as well as any pedestrian walkway areas near the building.",
  secondContent:
    "Then we begin replacing or installing the new roof system which may be designed by a roof consultant/engineer who is co-working on the project or by one of our professional in-house staff members who will design the roof system to conform to your unique building requirements. Once the roof is complete our sheet metal division will then fabricate the necessary sheet metal flashings and begin installing them. We will then complete a final walk-through to address any deficiencies and for a final site cleanup.",
  thirdContent:
    "Performing your roof replacement without disrupting the normal course of operations inside the building is our top concern. This is accomplished by preparing a proper set-up and implementing a unique execution plan.",
  secondTitle: "We Specialize In",
  listItems: [
    "BUR",
    "SBS Modified Bitumen",
    "SEBS Modified Bitumen",
    "Cold Applied Modified Bitumen",
    "Thermoplastic Membranes",
    "EPDM",
    "Inverted Roof Systems",
    "Green Roof Systems",
  ],
  extraTitle: "Trusted Manufacturers",
};

export default async function ICIPage() {
  let data = null;
  try {
    data = await getICIRoofingPage();
  } catch {
    // fallback to static content
  }

  const title = data?.title ?? FALLBACK.title;
  const content = data?.content ?? FALLBACK.content;
  const firstTitle = data?.firstTitle ?? FALLBACK.firstTitle;
  const firstContent = data?.firstContent ?? FALLBACK.firstContent;
  const firstImageUrl = data?.firstImageUrl;
  const firstImageAlt = data?.firstImageAlt ?? "ICI commercial roofing project by Skyluxe";
  const secondImageUrl = data?.secondImageUrl;
  const secondImageAlt = data?.secondImageAlt ?? "Commercial roof installation by Skyluxe";
  const secondContent = data?.secondContent ?? FALLBACK.secondContent;
  const thirdContent = data?.thirdContent ?? FALLBACK.thirdContent;
  const secondTitle = data?.secondTitle ?? FALLBACK.secondTitle;
  const galleryImages = data?.galleryImages ?? [];
  const extraTitle = data?.extraTitle ?? FALLBACK.extraTitle;
  const carouselMImages = data?.carouselMImages ?? [];

  // Build checklist items from DB or fallback
  const allItems: string[] = data?.listSections
    ? data.listSections.flatMap((s) => s.items)
    : FALLBACK.listItems;
  if (data?.listItem) allItems.push(data.listItem);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "ICI Roofing",
            provider: {
              "@type": "RoofingContractor",
              name: "Skyluxe Roofing & Sheet Metal",
              url: "https://www.skyluxeroofing.com",
            },
            description: content,
            areaServed: ["Mississauga", "Toronto", "GTA"],
            serviceType: "ICI Roofing",
          }),
        }}
      />

      {/* Hero */}
      <ServiceHero
        category="ICI Roofing Services"
        title={title}
        subtitle="Full-service industrial, commercial and institutional roofing for property managers, institutions, and general contractors across the GTA."
        imageUrl={images.serviceHero}
        imageAlt="Commercial ICI roofing project by Skyluxe Roofing in the Greater Toronto Area"
      />

      {/* Intro */}
      <section className="w-full py-16 sm:py-24 bg-[rgb(255,253,245)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="40" x2="120" y2="40" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="40" x2="60" y2="100" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="40" x2="1080" y2="40" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="40" x2="1140" y2="100" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="360" x2="120" y2="360" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="60" y1="360" x2="60" y2="300" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="360" x2="1080" y2="360" stroke="#0b4e6f" strokeWidth="1" />
            <line x1="1140" y1="360" x2="1140" y2="300" stroke="#0b4e6f" strokeWidth="1" />
            <rect x="60" y="40" width="1080" height="320" fill="none" stroke="#0b4e6f" strokeWidth="0.5" strokeDasharray="6 6" />
          </svg>
        </div>
        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Label>About This Service</Label>
              <h2 className="font-julius text-primary-950 leading-tight mb-6" style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}>
                Built for the Scale of Commercial Projects.
              </h2>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                {content}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "200+", label: "ICI Projects", sub: "Completed across the GTA" },
                { n: "On", label: "Time & Budget", sub: "Every project, every time" },
                { n: "GAF", label: "Master Elite", sub: "Fewer than 3% qualify" },
                { n: "10yr", label: "Warranty", sub: "Industry-leading coverage" },
              ].map(({ n, label, sub }) => (
                <div key={label} className="bg-white border border-gray-100 p-6 text-center">
                  <div className="font-julius text-primary-950 text-2xl mb-1">
                    {n}<span className="text-secondary-600">.</span>
                  </div>
                  <div className="font-montserrat text-gray-700 text-xs font-medium uppercase tracking-wide mb-1">{label}</div>
                  <div className="font-montserrat text-gray-400 text-xs">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature section 1 */}
      <section className="w-full py-16 sm:py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Label>Roof Replacement</Label>
              <h2 className="font-julius text-primary-950 leading-tight mb-5" style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)" }}>
                {firstTitle}
              </h2>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                {firstContent}
              </p>
            </div>
            {firstImageUrl ? (
              <div className="relative overflow-hidden aspect-4/3">
                <Image src={firstImageUrl} alt={firstImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            ) : (
              <div className="bg-primary-950 aspect-4/3 flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  {[0,1,2,3,4].map(i => <line key={i} x1={80*i} y1="0" x2={80*i} y2="300" stroke="white" strokeWidth="0.5"/>)}
                  {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={60*i} x2="400" y2={60*i} stroke="white" strokeWidth="0.5"/>)}
                </svg>
                <div className="font-julius text-white/30 text-4xl z-10">ICI</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* YouTube 1 */}
      <section className="w-full py-8 bg-white">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10">
          <YouTubeEmbed videoId="NGxrJwvH-j4" />
        </div>
      </section>

      {/* Feature section 2 — reversed */}
      <section className="w-full py-16 sm:py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {secondImageUrl ? (
              <div className="relative overflow-hidden aspect-4/3">
                <Image src={secondImageUrl} alt={secondImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            ) : (
              <div className="bg-primary-800 aspect-4/3 flex items-center justify-center relative overflow-hidden">
                <div className="font-julius text-white/20 text-4xl">Project</div>
              </div>
            )}
            <div>
              <Label>Our Process</Label>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-5">{secondContent}</p>
              <p className="font-montserrat text-gray-600 text-base leading-relaxed">{thirdContent}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Systems checklist — dark navy */}
      <section className="w-full py-16 sm:py-24 bg-primary-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            <line x1="60" y1="60" x2="60" y2="340" stroke="white" strokeWidth="2" />
            <line x1="60" y1="60" x2="120" y2="60" stroke="white" strokeWidth="2" />
            <line x1="60" y1="340" x2="120" y2="340" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="60" x2="1140" y2="340" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="60" x2="1080" y2="60" stroke="white" strokeWidth="2" />
            <line x1="1140" y1="340" x2="1080" y2="340" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <Label light>Capabilities</Label>
              <h2 className="font-julius text-white leading-tight mb-6" style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}>
                {secondTitle}
              </h2>
              <p className="font-montserrat text-white/60 text-base leading-relaxed">
                We install all major flat roofing systems, engineered to meet your building's specific requirements and local code.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <FaCircleCheck size={14} className="text-secondary-400 shrink-0" />
                  <span className="font-montserrat text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YouTube 2 */}
      <section className="w-full py-12 bg-white">
        <div className="container max-w-5xl mx-auto px-6 lg:px-10">
          <YouTubeEmbed videoId="6lN089WHx_A" />
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="w-full bg-gray-50">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10 pt-16">
            <Label>Our Work</Label>
            <h2 className="font-julius text-primary-950 text-2xl mb-8">Project Gallery</h2>
          </div>
          <ServicePagesGallery images={galleryImages} />
        </section>
      )}

      {/* Manufacturers */}
      {carouselMImages.length > 0 && (
        <section className="w-full py-12 bg-white">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10">
            <h3 className="font-julius text-center text-primary-950 text-xl mb-2">{extraTitle}</h3>
            <p className="font-montserrat text-center text-gray-400 text-sm mb-6">
              We work with the best manufacturers in the industry.
            </p>
            <Marquee images={carouselMImages.map((img) => ({ url: img.url, alt: img.alt }))} />
          </div>
        </section>
      )}

      {/* CTA */}
      <ServiceCTA heading="Ready to Plan Your ICI Roof?" />
    </>
  );
}
