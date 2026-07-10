'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';
import { Navigation, Thumbs, FreeMode, Zoom } from 'swiper/modules';
import Image from 'next/image';
import { safeImageUrl } from '@/lib/utils';
import type { Swiper as SwiperCore } from 'swiper';

interface CarouselProps {
    images: string[];
}

export default function Carousel({ images = [] }: CarouselProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    if (!images.length) return null;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Swiper
                modules={[Navigation, Thumbs, Zoom]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                zoom
                className="relative w-full h-96"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <div className="swiper-zoom-container">
                            <Image
                                src={safeImageUrl(image)}
                                alt={`Carousel image ${index + 1}`}
                                width={800}
                                height={600}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                modules={[FreeMode, Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                spaceBetween={10}
                freeMode
                watchSlidesProgress
                className="mt-2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="cursor-pointer">
                        <div className="relative w-full h-24">
                            <Image
                                src={safeImageUrl(image)}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="rounded-md object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}