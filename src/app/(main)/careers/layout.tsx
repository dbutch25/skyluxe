import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Skyluxe Roofing & Sheet Metal — Join Our Team",
  description:
    "Join the Skyluxe Roofing team in the Greater Toronto Area. We're looking for skilled roofers, estimators, project managers, and waterproofing specialists. View open positions and apply today.",
  openGraph: {
    title: "Careers at Skyluxe Roofing & Sheet Metal",
    description:
      "Work with some of the best tradespeople in Ontario on premium roofing, cladding, and waterproofing projects across the GTA.",
    url: "https://www.skyluxeroofing.com/careers",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
