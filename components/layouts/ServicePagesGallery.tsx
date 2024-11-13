import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa";
import React from "react";

interface ServicePagesGalleryProps {
    images: (string | StaticImageData)[];
}

export const ServicePagesGallery: React.FC<ServicePagesGalleryProps> = ({ images }) => {
    return (
        <div className="container py-20 mx-auto text-center">
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="relative w-full">
                        <Image
                            src={src}
                            alt={`Gallery Image ${index + 1}`}
                            width={500}
                            height={0}
                            className="rounded-lg object-cover h-auto"
                        />
                    </div>
                ))}
            </div>
            <div className="pt-2.5 flex justify-end">
                <Link href="/projects"
                      className="flex items-center pt-2.5 font-julius gap-3 text-lg text-secondary-900 hover:text-teal-800">
                    View Projects
                    <span
                        className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-secondary-900 text-secondary-900 hover:border-secondary-500 hover:text-secondary-500">
                        <FaArrowRight size="18"/>
                    </span>
                </Link>
            </div>
        </div>
    )

}

export default ServicePagesGallery;