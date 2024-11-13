import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import {claddingGallery, images} from "@/constants";
import {FaCircleCheck} from "react-icons/fa6";
import React from "react";
import Carousel from "@/components/layouts/CarouselSlider";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import {Marquee} from "@/components";


const residentialItems = [
    "New Construction Roof Installation",
    "Roof Replacement",
    "Roof Repairs"
]

const metals = [
    "Copper",
    "Lead",
    "Zinc",
    "Brass",
    "Bronze",
    "Alloys"
]

const ResidentRoofingPage = () => {
    return (
        <>
            <section>
                <div className="relative w-full h-screen overflow-hidden">
                    <Image
                        src={images.homeImage}
                        alt="Background"
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
                    <h1 className="inline border-b-2 border-primary-800">Residential Roofing</h1>
                </div>
                <div className="py-10">
                    <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-16 w-full">
                        {residentialItems.map((item, index) => (
                            <div key={index} className="flex items-center text-base text-gray-700">
                                <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">Flat Roofing</h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            Since we are experienced with the scale and difficulty of commercial projects, the
                            residential flat roof projects are a breeze. It is un-common to find a reputable commercial
                            contractor who also takes on residential projects. The commercial contractors are the pros
                            when it comes to flat roofing and we are one of them. T Modified bitumen is the most
                            commonly used residential flat roofing application these days. We are skilled in installing
                            all modified bitumen applications ranging from cold applied, heat welded and mop down. As
                            with the rest of our work, we install all of our residential flat roofs to manufacturers’
                            specification. Flat roof system manufacturers we use are Soprema, Polyglass, Bakor etc.
                        </p>
                    </div>
                    <div className='flex flex-col gap-10 md:flex-row py-5'>
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className="w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className=" w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="py-5 flex items-center justify-center">
                        <Carousel slides={claddingGallery}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">Asphalt Shingles</h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            Asphalt shingle roof systems are the most popular application for residential roofs. Asphalt
                            shingle systems consist of more than just shingles. They consist of roof sheathing, metal
                            flashings, underlayment, stack flashings, vent flashings and shingles. It is important that
                            the entire system gets addressed upon inspection. Our team attends all manufacturer training
                            sessions and is knowledgeable of manufacturer specifications and warranties from
                            Certainteed, GAF, IKO & BP. From designer to luxury shingles we have installed them all and
                            we install them all according to manufacturers’ specification.
                        </p>
                    </div>
                    <div className='py-5'>
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={1280}
                            height={720}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="py-5 flex items-center justify-center">
                        <Carousel slides={claddingGallery}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            Cedar Shakes & Shingles
                        </h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            Cedar shakes and shingles are more aesthetically pleasing and typically have a longer life
                            than a basic asphalt shingle. Cedar roofs have exceptional thermal insulation properties
                            which can help lower heating costs. There is more difficulty in installing a cedar roof in
                            comparison to an asphalt shingle roof. We follow the guidelines from the “Cedar Shake &
                            Shingle Bureau Roof Manual” which is the highest standard for cedar installation guidelines.
                        </p>
                    </div>
                    <div className='flex flex-col gap-10 md:flex-row py-5'>
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className="w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className=" w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="py-5 flex items-center justify-center">
                        <Carousel slides={claddingGallery}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            Custom Copper & Exotic Metals
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                            {metals.map((item, index) => (
                                <div key={index} className="flex items-center text-base text-gray-700">
                                    <FaCircleCheck size={20} className="text-secondary-500 mr-2 min-w-5 min-h-5"/>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            Copper and exotic metal work, when installed properly, is intended to last a lifetime. It is
                            important to find a coppersmith who can fabricate and install copper properly without too
                            much use of caulking, solder and petrochemical sealants. We fabricate and install it to
                            historical standards. We can fabricate and install exotic metals for many different
                            applications including: shingles, panels, flashings, gutters and downpipes.
                        </p>
                    </div>
                    <div className='flex flex-col gap-10 md:flex-row py-5'>
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className="w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className=" w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="py-5 flex items-center justify-center">
                        <Carousel slides={claddingGallery}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            Metal Roofing & Gutters
                        </h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            There are many different types of aluminum and steel roofing applications. We install all
                            metal roofing systems. We have our own machinery to fabricate many different types of metal
                            roof panels in our shop. We also install other manufacturer’s metal roof systems. We also
                            install many different aluminum and steel gutters and downpipes from basic to custom
                            profiles.

                        </p>
                    </div>
                    <div className='flex flex-col gap-10 md:flex-row py-5'>
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className="w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className=" w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="py-5 flex items-center justify-center">
                        <Carousel slides={claddingGallery}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            Natural Slate Tiles
                        </h3>
                        <p className="text-primary-950 font-montserrat text-base py-5">
                            Due to the nature of slate roofing tiles, installation difficulty, their cost, it is
                            important that only the highest skilled and experienced tradesmen should perform your slate
                            roof installation of repair. Slate tiles are available in several colours and sizes. A
                            properly installed slate roof can be the most aesthetically pleasing and longest lasting
                            option for your roof. All of our slate installations and slate repairs are completed
                            according to “The Slate Roof Bible” by Joseph Jenkins. We purchase our slate tiles from
                            North Country Slate in Toronto.
                        </p>
                    </div>
                    <div className="py-5 flex items-center justify-center">
                        <Carousel slides={claddingGallery}/>
                    </div>
                    <div className="py-5">
                        <YouTubeEmbed videoId={"J0_g6N3-WeU"}/>
                    </div>

                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            Synthetic Slate Tiles
                        </h3>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-10 md:flex-row py-5'>
                        <p className="flex justify-center text-primary-950 font-montserrat text-base w-full h-full md:w-1/2">
                            Synthetic Slate has been gaining tons of popularity over the last few years. We have lots of
                            experience in installing many different brands of synthetic slate from Eco-Star, Inspire
                            Slate, Da Vinci Single and Multi Width Tiles. We have also installed many Synthetic Shake
                            Tiles which mimics the look of a cedar roof. These synthetic products look gorgeous and also
                            last a lot longer than a typical asphalt shingle roof.
                        </p>
                        <Image
                            src={images.homeImage}
                            alt="placeholder"
                            width={500}
                            height={350}
                            className="w-full h-full md:w-1/2 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="py-5 flex items-center justify-center">
                        <Carousel slides={claddingGallery}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl font-julius text-primary-950 pt-10">
                            Skylight Installation
                        </h3>
                        <p className="text-primary-950 font-montserrat text-base w-full pt-2">
                            To install skylights properly you must complete the necessary framing/rough carpentry before you install the skylight. The framing/rough carpentry must be completed according to building code. Once you cut one or more roof rafters for the skylight tunnel you must make sure you follow procedures to keep the roof framing to building code. We specialize in the skylight installation of all manufacturers including:
                        </p>
                    </div>
                    <div className="py-5 flex items-center justify-center">
                        <Marquee images={claddingGallery} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResidentRoofingPage;