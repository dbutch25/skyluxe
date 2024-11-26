import React from 'react';

export const metadata = {
    title: "Services | Skyluxe Roofing & Sheet Metal",
    description: "Waterproofing | ICI Roofing | Residential Roofing | Architectural Cladding | Repairs & Maintenance | Restoration. Learn more.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}

