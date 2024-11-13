import {FaArrowDown} from "react-icons/fa";
import React from "react";

const VideoBackground = ({ videoSrc }: { videoSrc: string }) => (
    <div className="relative w-full h-screen overflow-hidden">
        <video
            src={videoSrc}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
            className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover"
        />
        <div
            className='absolute rounded-full bg-transparent p-2 text-white border-2 border-white shadow-lg inline-block animate-bounce bottom-6 left-6'>
            <FaArrowDown size="24" />
        </div>
    </div>
);

export default VideoBackground;
