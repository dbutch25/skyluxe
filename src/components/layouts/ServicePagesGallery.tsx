import GallerySlider from '@/components/elements/GallerySlider';
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
            {/* One image at a time; click to view full screen */}
            <GallerySlider
                images={images}
                aspect="aspect-4/3 sm:aspect-video"
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="mx-auto max-w-5xl rounded-lg"
            />

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