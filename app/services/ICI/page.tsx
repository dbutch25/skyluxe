import React from "react";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import Image from "next/image";
import {claddingGallery, images} from "@/constants";
import {FaCircleCheck} from "react-icons/fa6";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import {Marquee} from "@/components";

const iciItems = [

    "Thermoplastic Membranes",
    "EPDM",
    "Inverted Roof Systems",
    "Green Roof Systems",
    "BUR",
    "SBS Modified Bitumen",
    "SEBS Modified Bitumen",
    "Cold Applied Modified Bitumen",

];

const iciItem2 = "Performing your roof replacement without disrupting the normal course of operations inside the building is our top concern. This is accomplished by preparing a proper set-up and implementing a unique execution plan"

const ICIPage = () => {
    return (
        <section className="mx-auto container pt-40 pb-20">
            <div className="py-20">
                <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                    <h1 className="inline border-b-2 border-primary-800">ICI Roofing</h1>
                </div>

                <p className="text-lg font-montserrat text-center text-gray-600 pb-20">
                    Skyluxe Roofing and Sheet metal is a full-service ICI roofing contractor specializing in roof
                    replacements, new construction installation, roof repairs and maintenance services. Our commitment
                    to quality ensures you the best client experience by providing the most accurate and valuable
                    solutions for your buildings using premium materials and superior workmanship
                </p>
                <YouTubeEmbed videoId={"NGxrJwvH-j4"}/>
            </div>
            <div className="flex flex-col md:flex-row gap-5 pt-20 pb-10">
                <div className="w-full md:w-1/2">
                    <h2 className="text-xl font-julius text-primary-950 pb-10">Roof Replacement & New Construction
                        Installation</h2>
                    <p className="text-base font-montserrat text-primary-950">
                        Skyluxe Roofing and Sheet Metal offers a wide range of roofing services in the Greater Toronto
                        Area to property management firms, institutions, general contractors and property owners. We
                        want to earn your trust as a client and we will go the extra mile to complete your roofing
                        project on time and within budget.
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center h-full object-cover">
                    <Image src={images.homeImage}
                           alt="ICI Roofing"
                           width={400}
                           height={400}
                           className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center md:flex-row-reverse gap-5 py-10">
                <div className="w-full md:w-1/2 py-10">
                    <p className="text-base font-montserrat text-primary-950">
                        We strive on providing our clients with the most professional workmanship possible from start to
                        finish. In the beginning stages of the project we ensure that all exterior and interior building
                        elements are protected as well as any pedestrian walkway areas near the building. We also ensure
                        that our team is following all safety guidelines and requirements.

                    </p>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center h-full object-cover">
                    <Image src={images.homeImage} alt="ICI Roofing" width={400} height={400}
                           className="w-full h-full object-cover"/>
                </div>
            </div>
            <p className="font-montserrat text-primary-950 text-center text-base pt-10 pb-20">
                Then we begin replacing or installing the new roof system which may be designed by a roof
                consultant/engineer who is co-working on the project or by one of our professional in-house staff
                members who will design the roof system to conform to your unique building requirements. Once the roof
                is complete our sheet metal division will then fabricate the necessary sheet metal flashings and begin
                installing them. We will then complete a final walkthrough to address any deficiencies and for a final
                site cleanup.

            </p>
            <YouTubeEmbed videoId={"6lN089WHx_A"}/>

            <div className="pt-20 pb-10 text-primary-950 font-julius text-lg">
                <h3>What we Specialize in:</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {iciItems.map((item, index) => (
                    <div key={index} className="flex items-center text-base text-gray-700">
                        <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center text-base text-gray-700 pt-4 pb-20">
                <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                <span>{iciItem2}</span>
            </div>
            <ServicePagesGallery images={claddingGallery}/>
            <div>
                <h3 className="text-center text-primary-950 font-julius text-lg">Manufacturers</h3>
                <Marquee images={claddingGallery}/>


            </div>


        </section>
    )
}

export default ICIPage;