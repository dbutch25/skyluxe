import LandingPageHeader from "@/components/sections/LandingPageHeader";
import Script from "next/script";
import "../globals.css";
import GclidTracker from "@/components/elements/GclidTracker";

export default function FlatRoofSpecialistLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17526310370"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17526310370');
          `}
        </Script>
      </head>
      <body className="bg-primary-50">
        <GclidTracker />
        <LandingPageHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}