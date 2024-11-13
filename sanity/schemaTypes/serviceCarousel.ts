import { defineType, defineField } from 'sanity';

const serviceCarousel = defineType({
    name: 'serviceCarousel',
    title: 'Service Carousel',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'serviceLink',
            title: 'Service Link',
            type: 'string',
        }),
        defineField({
            name: 'requestLink',
            title: 'Request Link',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: 'main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Waterproofing', value: 'waterproofing' },
                    { title: 'Residential Roofing', value: 'residential-roofing' },
                    { title: 'ICI Roofing', value: 'ICI-roofing' },
                    { title: 'Repairs', value: 'repairs' },
                    { title: 'Architectural Cladding', value: 'architectural-cladding' },
                ],
                layout: 'radio',
            },
        }),
    ],
});

export default serviceCarousel;
