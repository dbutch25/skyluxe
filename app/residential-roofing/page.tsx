import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import {FaCircleCheck} from "react-icons/fa6";
import React from "react";
import Carousel from "@/components/elements/Carousel";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import Marquee from "@/components/elements/Marquee";
import {client} from "@/sanity/lib/client";
import {fetchResidentialData} from "@/sanity/lib/queries";

interface ImageData {
    image: {
        asset: {
            _id: string;
            url: string;
        };
    };
    alt: string;
}
interface CarouselMImage {
    url: string; // Image URL from the CMS
    alt: string; // Alt text for the image
}

interface ListItem {
    items: string[];
}

interface ResidentialPageData {
    title: string;
    backgroundImage: ImageData;
    residentialList: ListItem[];
    firstTitle: string;
    firstContent: string;
    firstImage: ImageData;
    secondImage: ImageData;
    residentialImages: string[];
    asphaltTitle: string;
    asphaltFirstContent: string;
    asphaltImage: ImageData;
    asphaltImages: string[];
    cedarTitle: string;
    cedarFirstContent: string;
    cedarFirstImage: ImageData;
    cedarSecondImage: ImageData;
    cedarImages: string[];
    metalsTitle: string;
    metalsList: ListItem[];
    metalsContent: string;
    metalsFirstImage: ImageData;
    metalsImages: string[];
    guttersTitle: string;
    guttersContent: string;
    guttersFirstImage: ImageData;
    guttersSecondImage: ImageData;
    guttersImages: string[];
    naturalTitle: string;
    naturalContent: string;
    naturalImages: string[];
    syntheticTitle: string;
    syntheticContent: string;
    syntheticImage: ImageData;
    syntheticImages: string[];
    skylightTitle: string;
    skylightContent: string;
    carouselMImages: CarouselMImage[];
}



const ResidentRoofingPage = async () => {
    const residentialData: ResidentialPageData = await client.fetch(fetchResidentialData)

    const { title, backgroundImage, residentialList, firstTitle, firstContent, firstImage, secondImage, residentialImages, asphaltTitle, asphaltFirstContent, asphaltImage, asphaltImages, cedarTitle, cedarFirstContent, cedarFirstImage, cedarSecondImage, cedarImages, metalsTitle, metalsList, metalsContent, metalsFirstImage, metalsImages, guttersTitle, guttersContent, guttersFirstImage, guttersSecondImage, guttersImages, naturalTitle, naturalContent, naturalImages, syntheticTitle, syntheticContent, syntheticImage, syntheticImages, skylightTitle, skylightContent, carouselMImages} = residentialData
    return (
        <>
            <section>
                <div className="relative w-full h-screen overflow-hidden">
                    <Image
                        src={backgroundImage?.image?.asset?.url}
                        alt={backgroundImage?.alt}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        fill
                        priority
                    />

                    <div className='absolute rounded-full bg-transparent p-2 text-white border-2 border-white shadow-lg inline-block animate-bounce bottom-6 left-6'>
                        <FaArrowDown size="24"/>
                    </div>
                </div>
            </section>
            <section className="container mx-auto pt-20">
                <div className="text-3xl font-julius text-primary-950 text-center">
                    <h1 className="inline border-b-2 border-primary-800">{title}</h1>
                </div>
                <div className="py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {residentialList?.map((section, index) => (
                            section?.items.map((item, i) => (
                                <div key={`${index}-${i}`} className="flex items-center text-base text-gray-700">
                                    <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                                    <span>{item}</span>
                                </div>
                            ))

                        ))}
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">{firstTitle}</h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            {firstContent}
                        </p>
                    </div>
                    <div className='flex flex-col gap-10 md:flex-row py-5'>
                        <Image
                            src={firstImage?.image?.asset?.url}
                            alt={firstImage?.alt}
                            width={500}
                            height={350}
                            className="w-full h-96 md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                        <Image
                            src={secondImage?.image?.asset?.url}
                            alt={secondImage?.alt}
                            width={500}
                            height={350}
                            className=" w-full h-96 md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="pb-20 md:py-5 flex items-center justify-center">
                        <Carousel images={residentialImages} />
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">{asphaltTitle}</h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            {asphaltFirstContent}
                        </p>
                    </div>
                    <div className='py-5'>
                        <Image
                            src={asphaltImage?.image?.asset?.url}
                            alt={asphaltImage?.alt}
                            width={1080}
                            height={720}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="pb-10 md:py-5 flex items-center justify-center">
                        <Carousel images={asphaltImages}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            {cedarTitle}
                        </h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            {cedarFirstContent}
                        </p>
                    </div>
                    <div className='flex flex-col gap-10 md:flex-row py-5'>
                        <Image
                            src={cedarFirstImage?.image?.asset?.url}
                            alt={cedarFirstImage?.alt}
                            width={500}
                            height={350}
                            className="w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                        <Image
                            src={cedarSecondImage?.image?.asset?.url}
                            alt={cedarSecondImage?.alt}
                            width={500}
                            height={350}
                            className=" w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="pb-10 md:py-5 flex items-center justify-center">
                        <Carousel images={cedarImages}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            {metalsTitle}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                            {metalsList?.map((section, index) => (
                                section?.items?.map((item, i) => (
                                    <div key={`${index}-${i}`} className="flex items-center text-left text-base text-gray-700">
                                        <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5" />
                                        <span>{item}</span>
                                    </div>
                                ))
                            ))}
                        </div>

                    </div>
                    <div className='flex flex-col gap-10 md:flex-row py-5'>
                        <Image
                            src={metalsFirstImage?.image?.asset?.url}
                            alt={metalsFirstImage?.alt}
                            width={500}
                            height={350}
                            className="w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                        <p className="w-full h-full md:w-1/2 text-primary-950 font-montserrat text-base py-5">
                            {metalsContent}
                        </p>
                    </div>
                    <div className="pb-10 md:py-5 flex items-center justify-center">
                        <Carousel images={metalsImages}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            {guttersTitle}
                        </h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            {guttersContent}
                        </p>
                    </div>
                    <div className='flex flex-col gap-10 md:flex-row py-5'>
                        <Image
                            src={guttersFirstImage?.image?.asset?.url}
                            alt={guttersFirstImage?.alt}
                            width={500}
                            height={350}
                            className="w-full h-96 md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                        <Image
                            src={guttersSecondImage?.image?.asset?.url}
                            alt={guttersSecondImage?.alt}
                            width={500}
                            height={350}
                            className=" w-full h-96 md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="pb-10 md:py-5 flex items-center justify-center">
                        <Carousel images={guttersImages}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            {naturalTitle}
                        </h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            {naturalContent}
                        </p>
                    </div>
                    <div className="pb-10 md:py-5 flex items-center justify-center">
                        <Carousel images={naturalImages}/>
                    </div>
                    <div className="py-5">
                        <YouTubeEmbed videoId={"J0_g6N3-WeU"}/>
                    </div>

                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            {syntheticTitle}
                        </h3>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-10 md:flex-row py-5'>
                        <p className="flex justify-center text-primary-950 font-montserrat text-base w-full h-full md:w-1/2">
                            {syntheticContent}
                        </p>
                        <Image
                            src={syntheticImage?.image?.asset?.url}
                            alt={syntheticImage?.alt}
                            width={500}
                            height={350}
                            className="w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="pb-10 md:py-5 flex items-center justify-center">
                        <Carousel images={syntheticImages}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            {skylightTitle}
                        </h3>
                        <p className="text-primary-950 font-montserrat text-base w-full pt-2">
                            {skylightContent}
                        </p>
                    </div>
                    <div className="py-20 flex items-center justify-center">
                        <Marquee
                            images={carouselMImages?.map(img => ({
                                url: img.url,
                                alt: img.alt,
                            }))}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResidentRoofingPage;