// schemas/waterproofing.ts

import { defineType, defineField } from 'sanity';

export const waterproofing = defineType({
    name: 'waterproofing',
    title: 'Waterproofing',
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
            type: 'text',
        }),
        defineField({
            name: "accordionItems",
            type: "array",
            title: "Accordion Items",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "accordionTitle", type: "string", title: "Title" },
                        { name: "accordionContent", type: "array", of: [{ type: "string" }] },
                    ],
                },
            ],
        }),
        defineField({
            name: "gallery",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "galleryImage", type: "image", title: "Image" },
                        { name: 'galleryAlt', type: "string", title: 'Alt Text' },
                    ],
                },
            ],
            title: "Gallery",
        }),
        defineField({
            name: "manufacturersGallery",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "manufacturerImage", type: "image", title: "Image" },
                        { name: 'manufacturerAlt', type: "string", title: 'Alt Text' },
                    ],
                },
            ],
            title: "Manufacturer Gallery",
        }),
    ],
});
