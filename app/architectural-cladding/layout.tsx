import React from 'react';

export const metadata = {
    title: "Architectural Cladding | Skyluxe Roofing & Sheet Metal",
    description: "We specialize in: · Standing Seam Panels · Corrugated Siding · Insulated Wall Panels (IMP Panels) · Custom sheet metal fabrication and installation.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ArchitecturalCladdingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}