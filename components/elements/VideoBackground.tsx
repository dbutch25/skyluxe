"use client"

import { FaArrowDown } from "react-icons/fa";
import React, { useState } from "react";

const VideoBackground = ({
                             videoSrc,
                             fallbackImage,
                         }: {
    videoSrc: string;
    fallbackImage: string;
}) => {
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
            ) : (
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${fallbackImage})` }}
                ></div>
            )}
            <div
                className="absolute rounded-full bg-transparent p-2 text-white border-2 border-white shadow-lg inline-block animate-bounce bottom-12 left-1/2 transform -translate-x-1/2"
            >
                <FaArrowDown size="35" />
            </div>
        </div>
    );
};

export default VideoBackground;
