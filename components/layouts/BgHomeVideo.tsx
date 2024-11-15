'use client'

import React, {useEffect, useState} from 'react';
import { images } from "@/constants"
import Image from 'next/image'
import {FaArrowDown} from "react-icons/fa";
import Link from "next/link";
import {getHomeVideoData} from "@/sanity/lib/queries";

interface HomeVideo {
    videoUrl: string;
}



export const BgHomeVideo: React.FC = () => {
    const [videoError, setVideoError] = useState(false);
    const [videoData, setVideoData] = useState<HomeVideo | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            const data = await getHomeVideoData();
            setVideoData(data[0]); // assuming only one background video entry
        };
        fetchVideoData();
    }, []);

    if (!videoData) return null;

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {videoError ? (
                <Image
                    src={images.homeImage}
                    alt="Fallback Background"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            ) : (
                <video
                    className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover"
                    src={videoData.videoUrl}
                    autoPlay
                    controls={false}
                    loop
                    muted
                    playsInline
                    onError={() => setVideoError(true)}
                />
            )}

            <Link
                href='/'
                className='absolute rounded-full bg-transparent p-2 text-white border-2 border-white shadow-lg inline-block animate-bounce bottom-6 left-6'>
                <FaArrowDown size="24" />
            </Link>
        </div>
    );
};

export default BgHomeVideo;

