// components/HomeGallery.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

export const fetchHomeGalleryData = async () => {
    const query = `*[_type == "homeGallery"]{
        _id,
        title,
        "slug": slug.current,
        "imageUrl": image.asset->url
    }`;
    return await client.fetch(query);
};

interface HomeGalleryItem {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
}

export const HomeGallery: React.FC = () => {
    const [galleryItems, setGalleryItems] = useState<HomeGalleryItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchHomeGalleryData();
            setGalleryItems(data);
        };
        fetchData();
    }, []);

    return (
        <section className="container w-full py-10 sm:py-20">
            <div className="text-sm flex text-secondary-800 items-center gap-2 border-b border-primary-400 mb-12 sm:mb-14 pb-4">
                <span className="h-1 w-6 bg-secondary-600 block rounded-full" />
                <span>What We've Done</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Large Image */}
                {galleryItems[0] && (
                    <div className="col-span-2 relative overflow-hidden rounded-lg shadow-lg">
                        <Link href={galleryItems[0].slug}>
                            <Image
                                src={galleryItems[0].imageUrl}
                                alt={galleryItems[0].title}
                                width={800}
                                height={600}
                                className="w-full h-[300px] md:h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out">
                                <span className="border-b-2 border-primary-50 text-primary-50 text-xl font-julius">{galleryItems[0].title}</span>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Small Images */}
                <div className="flex flex-col gap-10">
                    {galleryItems.slice(1, 3).map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-lg shadow-lg flex-1">
                            <Link href={item.slug}>
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-full md:w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out">
                                    <span className="border-b-2 border-primary-50 text-primary-50 text-xl font-julius">{item.title}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end">
                <Link href="/projects" className="flex items-center pt-2.5 font-julius gap-3 text-lg text-secondary-900 hover:text-teal-800">
                    View Projects
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-secondary-900 text-secondary-900 hover:border-secondary-500 hover:text-secondary-500">
                        <FaArrowRight size="18" />
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default HomeGallery;
