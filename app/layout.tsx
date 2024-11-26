import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ReactNode } from "react";

export const metadata = {
    title: "Skyluxe Roofing & Sheet Metal",
    description: "We specialize in Industrial, Commercial, Institutional, and Residential projects with highly skilled staff and trusted resources.",
    icons: {
        icon: "/favicon.ico",
    },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
        <body className="bg-[rgb(255,253,245)] select-none " data-barba="wrapper">
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
