import type { Metadata } from "next";
import BgHomeVideo from "@/components/layouts/BgHomeVideo";
import StatsStrip from "@/components/sections/StatsStrip";
import AboutUs from "@/components/sections/AboutUs";
import ServicesGrid from "@/components/sections/ServicesGrid";
import HomeGallery from "@/components/sections/HomeGallery";
import ProjectsMap from "@/components/sections/ProjectsMap";
import Testimonials from "@/components/sections/Testimonials";
import HomeCTA from "@/components/sections/HomeCTA";
import NewsAndCharity from "@/components/sections/NewsAndCharity";
import {
  getHomeVideoData,
  getAboutUsHomeData,
  getServiceCarouselData,
  fetchHomeGalleryData,
  fetchHomeGalleryOneData,
  fetchMapProjects,
  fetchLatestPosts,
  getCharitySpotlight,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Skyluxe Roofing & Sheet Metal | GAF Master Elite Contractor — GTA",
  description:
    "Skyluxe is a Toronto-area roofing contractor specializing in ICI, residential, architectural cladding, waterproofing, and emergency repairs. GAF Master Elite certified. Serving Mississauga, Toronto, Oakville, and the GTA.",
  openGraph: {
    title: "Skyluxe Roofing & Sheet Metal | GAF Master Elite Contractor — GTA",
    description:
      "Premium roofing, cladding, and waterproofing services across the Greater Toronto Area. GAF Master Elite & Knudson Certified.",
    url: "https://www.skyluxeroofing.com",
    siteName: "Skyluxe Roofing & Sheet Metal",
    locale: "en_CA",
    type: "website",
  },
};

export default async function Home() {
  const [
    videoData,
    aboutUsData,
    services,
    galleryItems,
    largeGalleryItems,
    projects,
    latestPosts,
    charity,
  ] =
    await Promise.all([
      getHomeVideoData(),
      getAboutUsHomeData(),
      getServiceCarouselData(),
      fetchHomeGalleryData(),
      fetchHomeGalleryOneData(),
      fetchMapProjects(),
      fetchLatestPosts(3),
      getCharitySpotlight(),
    ]);

  return (
    <>
      {/* JSON-LD — Organization schema for GEO/AI readiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["RoofingContractor", "LocalBusiness"],
            name: "Skyluxe Roofing & Sheet Metal",
            url: "https://www.skyluxeroofing.com",
            logo: "https://www.skyluxeroofing.com/images/Skyluxe_Logo.png",
            telephone: "+16476295893",
            email: "info@skyluxeroofing.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1941 Mattawa Ave",
              addressLocality: "Mississauga",
              addressRegion: "ON",
              postalCode: "L4X 1K8",
              addressCountry: "CA",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 43.6252,
              longitude: -79.6337,
            },
            areaServed: [
              "Mississauga",
              "Toronto",
              "Oakville",
              "Burlington",
              "Etobicoke",
              "North York",
              "Brampton",
              "Greater Toronto Area",
            ],
            priceRange: "$$$$",
            openingHours: "Mo-Fr 08:00-17:00",
            hasCredential: [
              "GAF Master Elite Contractor",
              "Knudson Certified Installer",
            ],
            sameAs: [
              "https://www.facebook.com/SkyluxeRoofing/",
              "https://www.instagram.com/skyluxeroofing/",
              "https://www.youtube.com/@skyluxeroofing",
            ],
          }),
        }}
      />

      <main className="no-scrollbar overflow-x-hidden">
        {/* 1. Hero — full-screen video with overlay text + CTAs */}
        <BgHomeVideo video={videoData} />

        {/* 2. Stats strip — dark navy trust signals */}
        <StatsStrip />

        {/* 3. About Us — improved layout */}
        <AboutUs data={aboutUsData} />

        {/* 4. Services — card grid, replaces tab slider */}
        <ServicesGrid services={services} />

        {/* 5. Featured Projects — gallery */}
        <HomeGallery
          galleryItems={galleryItems}
          largeGalleryItem={largeGalleryItems[0] ?? null}
        />

        {/* 6. Projects map — interactive GTA map with project pins */}
        <ProjectsMap projects={projects} />

        {/* 7. News & charity — community spotlight + latest 3 posts */}
        <NewsAndCharity charity={charity} posts={latestPosts} />

        {/* 8. Testimonials — with star ratings */}
        <Testimonials />

        {/* 9. CTA banner */}
        <HomeCTA />
      </main>
    </>
  );
}