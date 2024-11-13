import { FaCircleCheck } from "react-icons/fa6";
import {claddingGallery} from "@/constants";
import React from "react";
import { Marquee } from "@/components";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";

const CladdingPage = () => {
    // Define the items for the three rows
    const claddingItems = [
        "Standing Seam Panels",
        "Corrugated Siding",
        "Insulated Wall Panels (IMP Panels)",
        "Custom sheet metal fabrication and installation",
        "Wood Panels",
        "Zinc Panels",
        "Copper and Exotic Metal Work",
        "Aluminum Composite Panels (ACM Panels)",
        "Fibre Cement Panels",
        "Wood Siding",
        "Composite Siding",
        "Concrete Panels"
    ];

    return (
        <section className="pt-40 bg-gray-100">
            <div className="container mx-auto pb-20">
                <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                    <h1 className="inline border-b-2 border-primary-800">Architectural Cladding</h1>
                </div>
                <p className="text-lg font-montserrat text-center text-gray-600 mb-12">
                    Skyluxe Roofing and Sheet Metal has extensive expertise in a variety of cladding applications. Our
                    large sheet metal shop is outfitted with state-of-the-art equipment to ensure high-quality results.
                </p>

                {/* Cladding Items List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {claddingItems.map((item, index) => (
                        <div key={index} className="flex items-center text-left text-base text-gray-700">
                            <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
            <ServicePagesGallery images={claddingGallery} />
            <div className="mx-auto container py-20">
                <div>
                    <YouTubeEmbed videoId={"V-16shpld_8"}/>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-20">
                    <div className="flex-1">
                        <YouTubeEmbed videoId={"XaYfYRqX_EM"}/>
                    </div>
                    <div className="flex-1">
                        <YouTubeEmbed videoId={"s-0uXog0ZiQ"}/>
                    </div>
                </div>
            </div>

                <div className="container">
                    <div>
                        <h2 className="text-primary-950 font-julius text-2xl">
                            Partners
                        </h2>
                        <p className="font-montserrat text-base text-primary-950 pb-10">
                            Our trusted partnerships with top manufacturers, architects, and designers ensure quality, innovation, and lasting value in every project. Collaborating closely with these industry experts allows us to bring cutting-edge materials and designs to life, creating roofing and cladding solutions that meet the highest standards of durability and aesthetic excellence.
                    </p>
                </div>
                <div>
                    <h3 className="text-center text-primary-950 font-julius text-lg">Manufacturers</h3>
                    <Marquee images={claddingGallery} />


                </div>
                <div>
                    <h3 className="text-center text-primary-950 font-julius text-lg">Architects & Designers</h3>
                    <Marquee images={claddingGallery} />

                </div>
            </div>
        </section>
    );
};

export default CladdingPage;
