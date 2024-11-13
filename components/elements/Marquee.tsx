// components/Marquee.tsx
'use client'

import { motion } from 'framer-motion';
import React from "react";
import Image, { StaticImageData } from 'next/image';

interface MarqueeProps {
    images: (string | StaticImageData)[];
}

export const Marquee: React.FC<MarqueeProps> = ({ images }) => {
    // Define the animation for an infinite loop
    const marqueeVariants = {
        animate: {
            x: ['0%', '-100%'], // Move from 0% to -100% to create a seamless scroll
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                    duration: 30, // Adjust the speed by changing duration
                },
            },
        },
    };

    return (
        <div className="overflow-hidden w-full py-10">
            <motion.div
                className="flex gap-14 md:gap-20 lg:gap-28" // Flex container for images
                variants={marqueeVariants}
                animate="animate"
            >
                {/* Repeat images to fill marquee */}
                {images.concat(images).map((src, index) => (
                    <div key={index} className="flex-shrink-0">
                        <Image
                            src={src}
                            alt={`Marquee Image ${index + 1}`}
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
