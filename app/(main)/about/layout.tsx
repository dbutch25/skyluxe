import React from 'react';

export const metadata = {
    title: "About | Skyluxe Roofing & Sheet Metal",
    description: "The concept behind Skyluxe Roofing and Sheet Metal originated from Mark Goncalves undivided desire to challenge the status quo within the roofing industry.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}

