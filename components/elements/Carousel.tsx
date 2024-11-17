'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';

import { Navigation, Thumbs, FreeMode, Zoom } from 'swiper/modules';
import Image from 'next/image';

// Importing the SwiperCore type
import { Swiper as SwiperCore } from 'swiper';

interface CarouselProps {
    images: string[]; // Array of image URLs or StaticImageData
}

export const Carousel: React.FC<CarouselProps> = ({ images = [] }) => {
    // Correct type for thumbsSwiper
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Main Carousel */}
            <Swiper
                modules={[Navigation, Thumbs, Zoom]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                zoom={true}
                className="relative w-full h-96"
            >
                {images?.map((image, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <div className="swiper-zoom-container">
                            <Image
                                src={image}
                                alt={`Carousel Image ${index + 1}`}
                                width={800}
                                height={600}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </SwiperSlide>
                )) ||[]}
            </Swiper>

            {/* Thumbnail Carousel */}
            <Swiper
                modules={[FreeMode, Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                spaceBetween={10}
                freeMode={true}
                watchSlidesProgress={true}
                className="mt-2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="cursor-pointer">
                        <div className="relative w-full h-24">
                            <Image
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                fill // Uses the parent container's size
                                style={{ objectFit: 'cover' }} // Ensures the image covers the space without distortion
                                className="rounded-md"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
