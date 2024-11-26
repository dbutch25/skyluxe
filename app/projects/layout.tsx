import React from 'react';

export const metadata = {
    title: "Projects | Skyluxe Roofing & Sheet Metal",
    description: "View our state of the art projects to help you get a better idea of what roofing services we can provide you with.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}

