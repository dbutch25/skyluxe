export const metadata = {
    title: "Skyluxe Roofing | About",
    description: "The concept behind Skyluxe Roofing and Sheet Metal originated from the founder's undivided desire to challenge the status quo within the roofing industry.",
    icons: {
        icon: "/favicon.ico",
    },
};

// app/about/layout.tsx
export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="about-section-layout">
            <header>About Section Header</header>
            <main>{children}</main>
        </div>
    );
}

