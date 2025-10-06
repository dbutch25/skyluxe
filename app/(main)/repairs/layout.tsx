import React from 'react';

export const metadata = {
    title: "Repairs & Maintenance | Skyluxe Roofing & Sheet Metal",
    description: "Skyluxe Roofing offers 24/7 emergency roof repairs, leak detection, and maintenance programs to extend your roof's lifespan.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RepairsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}

