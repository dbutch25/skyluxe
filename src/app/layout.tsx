import "./globals.css";
import { ReactNode } from "react";
import { Julius_Sans_One, Montserrat } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";

const juliusSansOne = Julius_Sans_One({ weight: "400", subsets: ["latin"], variable: "--font-julius" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Skyluxe Roofing & Sheet Metal",
  description: "We specialize in Industrial, Commercial, Institutional, and Residential projects with highly skilled staff and trusted resources.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Skyluxe Roofing & Sheet Metal",
    description: "We specialize in Industrial, Commercial, Institutional, and Residential projects with highly skilled staff and trusted resources.",
    url: "https://www.skyluxeroofing.com",
    siteName: "Skyluxe Roofing",
    images: [{ url: "https://www.skyluxeroofing.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const GOOGLE_ADS_ID = "AW-17526310370";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${juliusSansOne.variable} ${montserrat.variable}`}>
      <head>
        <Script id="google-ads-tag" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
        <Script id="google-ads-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}</Script>
        <Script strategy="afterInteractive" data-domain="skyluxeroofing.com" src="https://plausible.io/js/script.js" />
      </head>
      <body className="bg-[rgb(255,253,245)]">
        {children}
      </body>
    </html>
  );
}