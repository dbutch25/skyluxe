import { FaCircleCheck } from "react-icons/fa6";
import { client } from "@/sanity/lib/client";
import { getCladdingPage } from "@/sanity/lib/queries";
import React from "react";
import { Marquee } from "@/components";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";

interface CladdingListSection {
    items: string[]; // Array of list items
}

interface GalleryImage {
    url: string; // Image URL from the CMS
    alt: string; // Alt text for the image
}
interface CarouselMImage {
    url: string; // Image URL from the CMS
    alt: string; // Alt text for the image
}
interface CarouselADImage {
    url: string; // Image URL from the CMS
    alt: string; // Alt text for the image
}

interface CladdingPageData {
    title: string; // Title of the page
    content: string; // Main content description
    extraTitle: string;
    extraContent: string;
    listSections: CladdingListSection[]; // List sections for cladding items
    galleryImages: GalleryImage[]; // Gallery images with URL and alt text
    carouselMImages: CarouselMImage[]; // Carousel images for manufacturers
    carouselADImages: CarouselADImage[]; // Carousel images for architects/designers
}


const CladdingPage = async () => {
    const claddingData: CladdingPageData = await client.fetch(getCladdingPage);

    const { title, content, extraTitle, extraContent, listSections, galleryImages, carouselMImages, carouselADImages } = claddingData;

    return (
        <section className="pt-40 bg-gray-100">
            <div className="container mx-auto pb-20">
                <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                    <h1 className="inline border-b-2 border-primary-800">{title}</h1>
                </div>
                <p className="text-lg font-montserrat text-center text-gray-600 mb-12">
                    {content}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listSections?.map((section, index) => (
                        section.items.map((item, i) => (
                            <div key={`${index}-${i}`} className="flex items-center text-left text-base text-gray-700">
                                <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5" />
                                <span>{item}</span>
                            </div>
                        ))
                    ))}
                </div>
            </div>

            <ServicePagesGallery
                images={galleryImages.map(image => ({
                    url: image.url,
                    alt: image.alt,
                }))}
            />

            <div className="mx-auto container py-20">
                <div>
                    <YouTubeEmbed videoId={"V-16shpld_8"} />
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-20">
                    <div className="flex-1">
                        <YouTubeEmbed videoId={"XaYfYRqX_EM"} />
                    </div>
                    <div className="flex-1">
                        <YouTubeEmbed videoId={"s-0uXog0ZiQ"} />
                    </div>
                </div>
            </div>

            <div className="container">
                <div>
                    <h2 className="text-primary-950 font-julius text-2xl">
                        {extraTitle}
                    </h2>
                    <p className="font-montserrat text-base text-primary-950 pb-10">
                        {extraContent}
                    </p>
                </div>
                <div>
                    <h3 className="text-center text-primary-950 font-julius text-lg">Manufacturers</h3>
                    <Marquee
                        images={carouselMImages.map(img => ({
                            url: img.url,
                            alt: img.alt,
                        }))}
                    />
                </div>
                <div>
                    <h3 className="text-center text-primary-950 font-julius text-lg">Architects & Designers</h3>
                    <Marquee
                        images={carouselADImages.map(img => ({
                            url: img.url,
                            alt: img.alt,
                        }))}
                    />
                </div>
            </div>
        </section>
    );
};

export default CladdingPage;
