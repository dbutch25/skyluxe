import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { client } from "@/sanity/lib/client";
import { getRepairsPage } from "@/sanity/lib/queries";
import React from "react";

interface Repairs {
    _id: string;
    title: string;
    slug: { current: string };
    firstContent: string;
    secondContent: string;
    firstImage: { url: string; alt: string };
    thirdContent: string;
    images: { url: string; alt: string }[];
    listSections: { items: string[] }[];
}

// Fetch data in a server component
const RepairsPage = async () => {
    const repairsData: Repairs[] = await client.fetch(getRepairsPage);

    if (!repairsData || repairsData.length === 0) {
        return <p className="text-center py-20">No repair data available.</p>;
    }

    const data = repairsData[0]; // Assuming a single document is fetched
    const { title, firstContent, secondContent, firstImage, thirdContent, images, listSections } = data;

    return (
        <section className="container mx-auto pt-40 pb-20">
            <div className="pb-10">
                <div className="text-3xl font-julius text-primary-950 text-center">
                    <h1 className="inline border-b-2 border-primary-800">{title}</h1>
                </div>
                <p className="text-lg text-center font-montserrat text-gray-600">{firstContent}</p>
            </div>

            <div className="py-10">
                <YouTubeEmbed videoId="_p-8Mr9HjcI"/>
            </div>

            <div className="flex flex-col md:flex-row gap-5 py-10">
                <div className="w-full md:w-1/2">
                    <p className="text-base font-montserrat text-primary-950">{secondContent}</p>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <Image
                        src={firstImage.url}
                        alt={firstImage.alt || "Repair Image"}
                        width={400}
                        height={400}
                        className="object-cover max-h-96 rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <div className="text-center py-10">
                <p className="text-base font-montserrat text-primary-950">{thirdContent}</p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-8 pb-0 pt-10 md:pb-10 px-4">
                {images.map((image, index) => (
                    <div key={index} className="w-full md:w-1/2">
                        <Image
                            src={image.url}
                            alt={image.alt || "Repair Image"}
                            width={600}
                            height={400}
                            className="object-cover max-h-96 rounded-lg shadow-lg"
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-center items-center md:flex-row gap-8 py-10">
                <div className="grid grid-cols-1 gap-4 w-full md:w-1/2 ">
                    {listSections.map((section, index) => (
                        <div key={index}>
                            {section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center text-base text-gray-700">
                                    <FaCircleCheck size={20} className="text-secondary-500 mr-2"/>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-1/2 ">
                    <YouTubeEmbed videoId={"_2aLooK4DMk"}/>
                </div>
            </div>
        </section>
    );
};

export default RepairsPage;
