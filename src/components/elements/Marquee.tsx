import Image from 'next/image';
import { safeImageUrl } from '@/lib/utils';

interface MarqueeImage {
    url: string;
    alt?: string;
}

interface MarqueeProps {
    images: MarqueeImage[];
}

export function Marquee({ images }: MarqueeProps) {
    if (!images?.length) return null;

    return (
        <div className="overflow-hidden w-full py-10">
            <div className="marquee-wrapper">
                <div className="marquee">
                    {[...images, ...images].map((image, index) => (
                        <div key={index} className="shrink-0">
                            <Image
                                src={safeImageUrl(image.url)}
                                alt={image.alt ?? ""}
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Marquee;