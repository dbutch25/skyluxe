import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ReactNode } from "react";
import PlausibleProvider from "next-plausible";
import PageLoader from "@/components/elements/PageLoader";
import { LinkedInInsightTag } from "nextjs-linkedin-insight-tag";
import Script from "next/script"; // ✅ Import Next.js Script

export const metadata = {
    title: "Skyluxe Roofing & Sheet Metal",
    description:
        "We specialize in Industrial, Commercial, Institutional, and Residential projects with highly skilled staff and trusted resources.",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "Skyluxe Roofing & Sheet Metal",
        description:
            "We specialize in Industrial, Commercial, Institutional, and Residential projects with highly skilled staff and trusted resources.",
        url: "https://www.skyluxeroofing.com",
        siteName: "Skyluxe Roofing",
        images: [
            {
                url: "",
                width: 1200,
                height: 630,
                alt: "Skyluxe Roofing homepage banner",
            },
        ],
    },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <head>
                <PlausibleProvider taggedEvents={true} domain="skyluxeroofing.com" />

                {/* ✅ Google Analytics + Google Ads */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
                    strategy="afterInteractive"
                />
                <Script id="ga-ads" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        // Google Ads
                        gtag('config', 'AW-17526310370');
                    `}
                </Script>
            </head>
            <body className="bg-[rgb(255,253,245)]" data-barba="wrapper">
                <PageLoader />

                <Header />
                <main data-barba="container" data-barba-namespace="home">
                    {children}
                    <LinkedInInsightTag />
                </main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
