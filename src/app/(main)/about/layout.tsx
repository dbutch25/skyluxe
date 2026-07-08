import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Skyluxe Roofing | GAF Master Elite Contractor — Mississauga, GTA",
  description:
    "Founded by Mark Goncalves to challenge the status quo in roofing. Skyluxe Roofing & Sheet Metal is a GAF Master Elite and Knudson Certified contractor serving the Greater Toronto Area since 2009.",
  openGraph: {
    title: "About Skyluxe Roofing & Sheet Metal",
    description:
      "Meet the Skyluxe team — Mark Goncalves, Jerry Stasicki, Ben Serino, and Saul Navarro. GAF Master Elite certified. Serving the GTA since 2009.",
    url: "https://www.skyluxeroofing.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Skyluxe Roofing & Sheet Metal",
            url: "https://www.skyluxeroofing.com/about",
            mainEntity: {
              "@type": "RoofingContractor",
              name: "Skyluxe Roofing & Sheet Metal",
              foundingDate: "2009",
              founder: {
                "@type": "Person",
                name: "Mark Goncalves",
                jobTitle: "President",
              },
              employee: [
                { "@type": "Person", name: "Mark Goncalves", jobTitle: "President" },
                { "@type": "Person", name: "Jerry Stasicki", jobTitle: "Vice President" },
                { "@type": "Person", name: "Ben Serino", jobTitle: "Waterproofing Operations" },
                { "@type": "Person", name: "Saul Navarro", jobTitle: "Project Manager" },
              ],
              hasCredential: ["GAF Master Elite Contractor", "Knudson Certified Installer"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "1941 Mattawa Ave",
                addressLocality: "Mississauga",
                addressRegion: "ON",
                postalCode: "L4X 1K8",
                addressCountry: "CA",
              },
            },
          }),
        }}
      />
      <main>{children}</main>
    </>
  );
}
