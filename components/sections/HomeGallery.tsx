'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import {fetchHomeGalleryData, fetchHomeGalleryOneData} from "@/sanity/lib/queries";

interface HomeGalleryItem {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
}

interface HomeGalleryOneItem {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
}

export const HomeGallery: React.FC = () => {
    const [galleryItems, setGalleryItems] = useState<HomeGalleryItem[]>([]);
    const [largeGalleryItem, setLargeGalleryItem] = useState<HomeGalleryOneItem | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const galleryData = await fetchHomeGalleryData();
            setGalleryItems(galleryData);

            const largeGalleryData = await fetchHomeGalleryOneData();
            setLargeGalleryItem(largeGalleryData[0] || null);
        };

        fetchData();
    }, []);

    return (
        <section className="container w-full py-10 sm:py-20">
            <div className="text-sm flex text-secondary-800 items-center gap-2 border-b border-primary-400 mb-12 sm:mb-14 pb-4">
                <span className="h-1 w-6 bg-secondary-600 block rounded-full" />
                <span>What We've Done</span>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-3 gap-10">
                {largeGalleryItem && (
                    <div className="md:col-span-2 relative overflow-hidden rounded-lg">
                        <Link href={largeGalleryItem.slug}>
                            <Image
                                src={largeGalleryItem.imageUrl}
                                alt={largeGalleryItem.title || 'Gallery image'}
                                width={800}
                                height={600}
                                className="w-full h-[300px] md:h-[600px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out">
                                <span className="border-b-2 border-primary-50 text-primary-50 text-xl font-julius">{largeGalleryItem.title}</span>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="flex flex-col gap-10">
                    {galleryItems.map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-lg shadow-lg ">
                            <Link href={item.slug}>
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title || 'Gallery image'}
                                    width={450}
                                    height={300}
                                    className="w-full h-[280px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
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
