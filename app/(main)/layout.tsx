import "../globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ReactNode } from "react";
import PageLoader from "@/components/elements/PageLoader";
import Script from "next/script";

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
                <Script
                id="google-ads-tag"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=AW-17526310370`}
                />
                <Script id="google-ads-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-17526310370');
                `}
                </Script>
                <Script
                    strategy="afterInteractive"
                    data-domain="skyluxeroofing.com"
                    src="https://plausible.io/js/script.js"
                />
            </head>
            <body className="bg-[rgb(255,253,245)]" data-barba="wrapper">
                <PageLoader />

                <Header />
                <main data-barba="container" data-barba-namespace="home">
                    {children}
                </main>
                <Footer />
            </body>                    
        </html>
    );
};

export default RootLayout;
