import React from 'react';

export const metadata = {
    title: "Residential Roofing | Skyluxe Roofing & Sheet Metal",
    description: "Skyluxe Roofing's Residential Roofing services provide top-quality roof installations, replacements, and repairs. Learn more here.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ResidentialRoofingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}

