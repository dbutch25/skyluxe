'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import {getServiceCarouselData} from "@/sanity/lib/queries";

interface Service {
    title: string;
    description: string;
    mainImageUrl: string;
    category: string;
    serviceLink: string;
    requestLink: string;
}

const categories = ["residential-roofing", "ICI-roofing", "repairs", "waterproofing", "architectural-cladding"];



export const ServiceSlider: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("residential-roofing");

    useEffect(() => {
        (async () => {
            try {
                const data = await getServiceCarouselData();
                setServices(data);
            } catch (error) {
                console.error("Failed to fetch service carousel data:", error);
            }
        })();
    }, []);

    const filteredServices = services.filter(service => service.category === activeCategory);

    return (
        <section className="w-full bg-primary-50">
            <div className="container py-10 sm:py-20">
                <div className="text-sm flex text-secondary-800 items-center gap-2 border-b border-primary-400 mb-12 sm:mb-14 pb-4">
                    <span className="h-1 w-6 bg-secondary-600 block rounded-full"/>
                    <span>What We Do</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 pb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 capitalize border-2 border-secondary-800 rounded-full text-base font-montserrat ${activeCategory === category ? "bg-secondary-900 text-white" : "bg-gray-200 text-gray-700"} transition-colors duration-300`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                <div className="container w-full h-full">
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerGroup={1}
                        spaceBetween={40}
                        autoplay={{ delay: 4000 }}
                        loop
                        className="w-full h-full mx-auto"
                    >
                        {filteredServices.map((service, index) => (
                            <SwiperSlide key={index} className="h-[400px] md:h-[500px] lg:h-[600px]">
                                <div className="flex flex-col md:flex-row items-center bg-primary-50 shadow-xl overflow-hidden gap-10">
                                    <div className="w-full md:w-1/2 h-full relative">
                                        <Image
                                            src={service.mainImageUrl}
                                            alt={service.title}
                                            className="w-full h-full object-cover rounded-lg shadow-lg"
                                            width={400}
                                            height={200}

                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 p-6">
                                        <h3 className="text-2xl font-julius text-primary-950 mb-4">{service.title}</h3>
                                        <p className="font-montserrat text-base text-primary-950 mb-6">{service.description}</p>
                                        <div className="flex pt-5 gap-6">
                                            <Link
                                                href={service.serviceLink}
                                                className="text-sm flex items-center text-secondary-900 border-b-2 border-secondary-900 hover:text-secondary-400 hover:border-secondary-400"
                                            >
                                                Learn More
                                                <FaArrowRight className="ml-2"/>
                                            </Link>
                                            <Link
                                                href={service.requestLink}
                                                className="text-sm flex items-center text-secondary-900 border-b-2 border-secondary-900 hover:text-teal-800"
                                            >
                                                Request Quote
                                                <FaArrowRight className="ml-2"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default ServiceSlider;
