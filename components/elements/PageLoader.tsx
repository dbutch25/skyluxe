"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/constants";

const PageLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <div
            id="loader"
            className={`fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-1000 ease-out ${
                isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="mb-4">
                <Image
                    src={images.logo}
                    alt="Logo"
                    width={300}
                    height={300}
                    className="animate-pulse"
                />
            </div>

            <div className="w-10 h-10 border-4 border-t-white border-gray-400 rounded-full animate-spin"></div>
        </div>
    );
};

export default PageLoader;
