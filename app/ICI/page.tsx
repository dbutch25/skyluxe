import React from "react";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import Image from "next/image";
import {FaCircleCheck} from "react-icons/fa6";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import {Marquee} from "@/components";
import {getICIRoofingPage} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";

interface ICIImage {
    url: string;
    alt: string;
}

interface ICIListSection {
    items: string[];
}

interface ICIRoofingPageProps {
    title: string;
    content: string;
    firstTitle: string;
    firstContent: string;
    firstImage: ICIImage;
    secondImage: ICIImage;
    secondContent: string;
    thirdContent: string;
    secondTitle: string;
    listSections: ICIListSection[];
    listItem: string;
    galleryImages: ICIImage[];
    extraTitle: string;
    carouselMImages: ICIImage[];
}


const ICIPage = async () => {
    const iciRoofingData: ICIRoofingPageProps = await client.fetch(getICIRoofingPage);
    const {
        title,
        content,
        firstTitle,
        firstContent,
        firstImage,
        secondImage,
        secondContent,
        thirdContent,
        secondTitle,
        listSections,
        listItem,
        galleryImages,
        extraTitle,
        carouselMImages } = iciRoofingData
    console.log(firstImage)
    return (
        <section className="mx-auto container pt-40 pb-20">
            <div className="py-20">
                <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                    <h1 className="inline border-b-2 border-primary-800">{title}</h1>
                </div>

                <p className="text-lg font-montserrat text-center text-gray-600 pb-20">
                    {content}
                </p>
                <YouTubeEmbed videoId={"NGxrJwvH-j4"}/>
            </div>
            <div className="flex flex-col md:flex-row gap-5 pt-20 pb-10">
                <div className="w-full md:w-1/2">
                    <h2 className="text-xl font-julius text-primary-950 pb-10">{firstTitle}</h2>
                    <p className="text-base font-montserrat text-primary-950">
                        {firstContent}
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center h-96 object-cover">
                    <Image src={firstImage.url}
                           alt={firstImage.alt}
                           width={400}
                           height={400}
                           className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center md:flex-row-reverse gap-5 py-10">
                <div className="w-full md:w-1/2 py-10">
                    <p className="text-base font-montserrat text-primary-950">
                        {secondContent}
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center h-96 object-cover">
                    <Image src={secondImage.url} alt={secondImage.alt} width={400} height={400}
                           className="w-full h-full object-cover rounded-lg shadow-lg"/>
                </div>
            </div>
            <p className="font-montserrat text-primary-950 text-center text-base pt-10 pb-20">
                {thirdContent}

            </p>
            <YouTubeEmbed videoId={"6lN089WHx_A"}/>

            <div className="pt-20 pb-10 text-primary-950 font-julius text-lg">
                <h3>{secondTitle}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {listSections.map((section, index) => (
                    <div key={index}>
                        {section.items.map((item, idx) => (
                            <div key={idx} className="flex items-center text-base text-gray-700">
                                <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex items-center text-base text-gray-700 pt-4 pb-20">
                <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                <span>{listItem}</span>
            </div>
            <ServicePagesGallery images={galleryImages}/>
            <div>
                <h3 className="text-center text-primary-950 font-julius text-lg">{extraTitle}</h3>
                <Marquee images={carouselMImages}/>


            </div>


        </section>
    )
}

export default ICIPage;