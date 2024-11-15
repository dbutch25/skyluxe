// app/layout.tsx

import "./globals.css"; // Import global styles
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ReactNode } from "react";

export const metadata = {
    title: "My Site",
    description: "An amazing Next.js website",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
        <body className="bg-[rgb(255,253,245)] select-none" data-barba="wrapper">
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
