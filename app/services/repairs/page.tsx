import React from "react";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import Image from "next/image";
import {images} from "@/constants";
import {FaCircleCheck} from "react-icons/fa6";

const repairItems = [
    "24 hour Emergency Service",
    "HVAC & Mechanical Cone Installation",
    "Retro-fit Curb Installation",
    "Skylight Installation",
    "Destructive and Non-Destructive Moisture Testing",
    "Roof Inspections, Evaluations & Reports",
    "Semi-Annual Preventative Maintenance Programs",

]

const RepairsPage = () => {
    return (
        <>
            <section className="container mx-auto pt-40 pb-20">
                <div className="pb-10">
                    <div className="text-3xl font-julius text-primary-950 text-center">
                        <h1 className="inline border-b-2 border-primary-800">Repairs & Maintenance</h1>
                    </div>
                    <p className="text-lg text-center font-montserrat text-gray-600">
                        Our experienced workforce is trained to repair any roof system. We offer 24 hour emergency
                        service for those unexpected situations and we also provide asset management and maintenance
                        programs to ensure your roof investment will last.
                    </p>
                </div>
                <div className="py-10">
                    <YouTubeEmbed videoId={"_p-8Mr9HjcI"}/>
                </div>
                <div className="flex flex-col justify-center items-center md:flex-row gap-5 py-10">
                    <div className="w-full md:w-1/2 py-10">
                        <p className="text-base font-montserrat text-primary-950">
                            We use advanced expertise in sourcing, detecting and diagnosing leaks. Once we have identified the roof issues we provide solutions for your review. Infrared moisture detection is a proven method for detecting trapped moisture in a flat roofing system. When you find trapped moisture early you can catch smaller issues early on before they become big issues.

                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center justify-center h-full object-cover">
                        <Image src={images.homeImage} alt="ICI Roofing" width={400} height={400}
                               className="w-full h-full object-cover"/>
                    </div>
                </div>
                <div className="text-center py-10 ">
                    <p className="text-base text-center font-montserrat text-primary-950">
                        We use advanced expertise in sourcing, detecting and diagnosing leaks. Once we have identified
                        the roof issues we provide solutions for your review. Infrared moisture detection is a proven
                        method for detecting trapped moisture in a flat roofing system. When you find trapped moisture
                        early you can catch smaller issues early on before they become big issues.
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center md:flex-row gap-8 py-10">
                    <div className="w-full md:w-1/2 flex items-center justify-center h-full object-cover">
                        <Image src={images.homeImage} alt="ICI Roofing" width={400} height={400}
                               className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center justify-center h-full object-cover">
                        <Image src={images.homeImage} alt="ICI Roofing" width={400} height={400}
                               className="w-full h-full object-cover"/>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center md:flex-row gap-8 py-10">
                    <div className="grid grid-cols-1 gap-4 w-full md:w-1/2 ">
                        {repairItems.map((item, index) => (
                            <div key={index} className="flex items-center text-base text-gray-700">
                                <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/2 ">
                        <YouTubeEmbed videoId={"_2aLooK4DMk"} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default RepairsPage;