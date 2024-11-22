import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { PortableText } from "next-sanity";
import { getAboutUsHomeData } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { PortableTextBlock } from "@portabletext/types";

interface AboutUsHomeData {
    content: PortableTextBlock[];
}

const AboutUs = async () => {
    const aboutUsData: AboutUsHomeData | null = await client.fetch(getAboutUsHomeData);

    if (!aboutUsData) {
        return <div>No content available.</div>;
    }

    return (
        <section className="container py-10 sm:py-20">
            <div
                className="flex text-sm text-secondary-800 items-center gap-2 border-b border-primary-400 mb-12 sm:mb-14 pb-4">
                <span className="h-1 w-6 bg-secondary-600 block" />
                <span>About Us</span>
            </div>
            <div className="flex justify-end">
                <div className="max-w-3xl text-primary-950 text-base font-montserrat">
                    <PortableText value={aboutUsData.content} />
                    <div className="flex justify-end">
                        <Link
                            href="/about"
                            className="flex items-center pt-2.5 font-julius gap-3 text-lg text-secondary-900 hover:text-teal-800 font-julius-sans"
                        >
                            Our Team
                            <span
                                className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-secondary-900 text-secondary-900 hover:border-secondary-500 hover:text-secondary-500">
                <FaArrowRight size="18" />
              </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
