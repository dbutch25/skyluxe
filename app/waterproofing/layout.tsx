import React from 'react';

export const metadata = {
    title: "Waterproofing | Skyluxe Roofing & Sheet Metal",
    description: "We specialize in comprehensive waterproofing solutions, including foundation systems, hot-applied membranes, traffic toppings, sealers, cementitious applications, and leak repairs",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function WaterproofingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}

