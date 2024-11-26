import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ReactNode } from "react";
import PlausibleProvider from 'next-plausible'
import Script from "next/script";

export const metadata = {
    title: "Skyluxe Roofing & Sheet Metal",
    description: "We specialize in Industrial, Commercial, Institutional, and Residential projects with highly skilled staff and trusted resources.",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "Skyluxe Roofing & Sheet Metal",
        description: "We specialize in Industrial, Commercial, Institutional, and Residential projects with highly skilled staff and trusted resources.",
        url: "https://www.skyluxeroofing.com",
        siteName: "Skyluxe Roofing",
        images: [
            {
                url: "/ava.jpg",
                width: 1200,
                height: 630,
                alt: "Skyluxe Roofing homepage banner",
            },
        ],
    }

};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
        <head>
            <PlausibleProvider taggedEvents={true} domain="skyluxeroofing.com"/>
        </head>
        <body className="bg-[rgb(255,253,245)] select-none " data-barba="wrapper">
        <Script
            strategy="beforeInteractive"
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}/`}

        />
        <Header/>
        <main data-barba="container" data-barba-namespace="home">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
};

export default RootLayout;
