'use client';

import Image from 'next/image';
import { FaArrowDown } from 'react-icons/fa';
import { useState } from 'react';

interface VideoBackgroundProps {
    videoSrc?: string;
    fallbackImage?: string;
}

export default function VideoBackground({ videoSrc, fallbackImage }: VideoBackgroundProps) {
    const [videoError, setVideoError] = useState(false);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {!videoError && videoSrc ? (
                <video
                    src={videoSrc}
                    autoPlay
                    controls={false}
                    loop
                    muted
                    playsInline
                    onError={() => setVideoError(true)}
                    className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover"
                />
            ) : fallbackImage ? (
                <Image
                    src={fallbackImage}
                    alt="Project background"
                    fill
                    className="object-cover"
                    priority
                />
            ) : (
                <div className="absolute inset-0 bg-primary-900" />
            )}

            <div className="absolute inset-x-0 bottom-14 flex justify-center">
                <div className="rounded-full bg-transparent p-2 text-white border-2 border-white shadow-lg animate-bounce">
                    <FaArrowDown size={35} />
                </div>
            </div>
        </div>
    );
}
