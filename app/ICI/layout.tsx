import React from 'react';

export const metadata = {
    title: "ICI Roofing | Skyluxe Roofing & Sheet Metal",
    description: "We specialize in Industrial, Commercial, and Institutional (ICI) roofing solutions delivering expert craftsmanship tailored to each project",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ICILayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}