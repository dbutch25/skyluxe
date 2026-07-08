import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Restoration | Skyluxe Roofing & Sheet Metal — GTA",
  description:
    "Skyluxe specializes in building envelope restoration across the Greater Toronto Area — masonry repair, facade renewal, sealant replacement, spandrel panel repair, and heritage building restoration. GAF Master Elite certified.",
  openGraph: {
    title: "Building Restoration | Skyluxe Roofing & Sheet Metal",
    description:
      "Expert facade and building envelope restoration in Mississauga, Toronto, and the GTA. Masonry, caulking, spandrel panels, and heritage renewal.",
    url: "https://www.skyluxeroofing.com/restoration",
  },
};

export default function RestorationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD — Service schema for GEO/AI readiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Building Restoration",
            provider: {
              "@type": "RoofingContractor",
              name: "Skyluxe Roofing & Sheet Metal",
              url: "https://www.skyluxeroofing.com",
              telephone: "+16476295893",
            },
            description:
              "Building envelope restoration including masonry repair, facade renewal, caulking replacement, spandrel panel repair, and heritage building restoration across the Greater Toronto Area.",
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
            serviceType: "Building Restoration",
            url: "https://www.skyluxeroofing.com/restoration",
          }),
        }}
      />
      <main>{children}</main>
    </>
  );
}
