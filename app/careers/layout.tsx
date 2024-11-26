import React from 'react';

export const metadata = {
    title: "Careers | Skyluxe Roofing & Sheet Metal",
    description: "Interested in joining the family? E-mail your resume to info@skyluxeroofing.com for employment opportunities.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}