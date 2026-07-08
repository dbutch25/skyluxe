import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface GalleryImage {
    url: string;
    alt?: string;
}

interface ServicePagesGalleryProps {
    images: GalleryImage[];
}

export default function ServicePagesGallery({ images }: ServicePagesGalleryProps) {
    return (
        <div className="container py-20 mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative w-full h-96">
                        <Image
                            src={image.url}
                            alt={image.alt ?? ""}
                            fill
                            className="rounded-lg object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>

            <div className="pt-2.5 flex justify-end">
                <Link href="/projects" className="flex items-center pt-2.5 font-julius gap-3 text-lg text-secondary-900 hover:text-teal-800">
                    View Projects
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-secondary-900 text-secondary-900 hover:border-secondary-500 hover:text-secondary-500">
                        <FaArrowRight size={18} />
                    </span>
                </Link>
            </div>
        </div>
    );
}
