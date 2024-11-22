import { client } from '@/sanity/lib/client';  // Assuming you have your sanity client setup
import { getWaterproofingPage } from '@/sanity/lib/queries';  // The query you provided
import Accordion from "@/components/elements/Accordion";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import { Marquee } from "@/components/elements/Marquee";

interface AccordionItem {
    accordionTitle: string;
    accordionContent: string[];
}

interface GalleryImage {
    url: string;
    galleryAlt: string;
}

interface ManufacturerGalleryItem {
    url: string;
    manufacturerAlt: string;
}

interface WaterproofingPageData {
    title: string;
    description: string;
    accordionItems: AccordionItem[] | null;
    gallery: GalleryImage[] | null;
    manufacturersGallery: ManufacturerGalleryItem[] | null;
}

const WaterproofingPage = async () => {
    const waterproofingData: WaterproofingPageData = await client.fetch(getWaterproofingPage);

    const { title, description, accordionItems, gallery, manufacturersGallery } = waterproofingData;

    return (
        <>
            <section className="container pt-40 mx-auto">
                <div className="pb-10">
                    <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                        <h1 className="inline border-b-2 border-primary-800">{title}</h1>
                    </div>
                    <p className="text-lg text-center font-montserrat text-gray-600">
                        {description}
                    </p>
                </div>

                <div className="py-10">
                    {accordionItems && accordionItems.length > 0 && (
                        <Accordion
                            items={accordionItems.map(item => ({
                                title: item.accordionTitle,
                                content: item.accordionContent.join(', ')  // Handle content properly
                            }))}
                        />
                    )}
                </div>

                <div className="py-10">
                    {gallery && gallery.length > 0 && (
                        <ServicePagesGallery
                            images={gallery.map(item => ({
                                url: item.url,
                                alt: item.galleryAlt
                            }))}
                        />
                    )}
                </div>

                <div className="pb-20 pt-10">
                    <h3 className="text-center text-primary-950 font-julius text-lg">Manufacturers</h3>
                    {manufacturersGallery && manufacturersGallery.length > 0 && (
                        <Marquee images={manufacturersGallery.map(item => ({
                            url: item.url,
                            alt: item.manufacturerAlt
                        }))} />
                    )}
                </div>
            </section>
        </>
    );
};
export default WaterproofingPage;
