import React from 'react';

export const metadata = {
    title: "Contact | Skyluxe Roofing & Sheet Metal",
    description: "Let's Connect at +1 647 629 5893. | info@skyluxeroofing.com. | 1941 Mattawa Ave, Mississauga ON, Canada.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}