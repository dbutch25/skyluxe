import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ReactNode } from "react";
import PageLoader from "@/components/elements/PageLoader"; 
import { LinkedInInsightTag } from "nextjs-linkedin-insight-tag";
import { GoogleTagManager } from '@next/third-parties/google';

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
        </head>
        <body className="bg-[rgb(255,253,245)]" data-barba="wrapper">
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`} />
        {/* PageLoader will show until content is ready */}
        <PageLoader />

        {/* Main content */}
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
