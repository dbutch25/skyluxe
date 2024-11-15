'use client';

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { PortableText } from "next-sanity";
import {getAboutUsHomeData} from "@/sanity/lib/queries";

interface AboutUsHome {
    content: Array<{ _key: string; _type: string; children: Array<{ _key: string; text: string }> }>;
}




export const AboutUs = () => {
    const [aboutUsData, setAboutUsData] = useState<AboutUsHome | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAboutUsHomeData();
            setAboutUsData(data);
        };

        // Call the async function
        fetchData().catch((error) => console.error("Error fetching data:", error));

    }, []); // Empty dependency array ensures this runs only once on component mount

    if (!aboutUsData) return null;

    return (
        <section className="container py-10 sm:py-20">
            <div
                className="flex text-sm text-secondary-800 items-center gap-2 border-b border-primary-400 mb-12 sm:mb-14 pb-4">
                <span className="h-1 w-6 bg-secondary-600 block "/>
                <span>About Us</span>
            </div>
            <div className="flex justify-end">
                <div className="max-w-3xl text-primary-950 text-base font-montserrat">
                    <PortableText value={aboutUsData.content} />
                    <div className="flex justify-end">
                        <Link href="/"
                              className="flex items-center pt-2.5 font-julius gap-3 text-lg text-secondary-900 hover:text-teal-800 font-julius-sans">
                            Our Team
                            <span
                                className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-secondary-900 text-secondary-900 hover:border-secondary-500 hover:text-secondary-500">
                                    <FaArrowRight size="18"/>
                                </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
