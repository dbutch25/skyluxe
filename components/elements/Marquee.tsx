import React from "react";
import Image from 'next/image';

interface MarqueeImage {
    url: string;
    alt: string;
}

interface MarqueeProps {
    images: MarqueeImage[]; // Array of images
}

export const Marquee: React.FC<MarqueeProps> = ({ images }) => {
    console.log("Rendering Marquee with images:", images);
    return (
        <div className="overflow-hidden w-full py-10">
            {/* Container for the marquee */}
            <div className="marquee-wrapper">
                {/* Flex container for images */}
                <div className="marquee">
                    {images?.concat(images).map((image, index) =>(
                        <div key={index} className="flex-shrink-0">
                            <Image
                                src={image.url}
                                alt={image.alt}
                                width={200}
                                height={200}
                                className=" object-contain"
                            />
                        </div>
                    )) || []}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
