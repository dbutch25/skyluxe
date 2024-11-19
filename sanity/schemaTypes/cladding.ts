import { defineField, defineType } from "sanity";

const Cladding = defineType({
    name: "cladding",
    type: "document",
    title: "Cladding",
    fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({
            name: "content",
            type: "text",
            title: "Main Content",
        }),
        defineField({
            name: "listSections",
            type: "array",
            title: "List Sections",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "items",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: "galleryImages",
            type: "array",
            title: "Gallery Images",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            type: "image",
                            title: "Image",
                        },
                        {
                            name: "alt",
                            type: "string",
                            title: "Alt Text",
                        },
                    ],
                },
            ],
        }),
        defineField({ name: "extraTitle", type: "string", title: "Extra Title" }),
        defineField({
            name: "extraContent",
            type: "text",
            title: "Extra Content",
        }),
        defineField({
            name: "carouselMImages",
            type: "array",
            title: "Carousel Manufacturers Images",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            type: "image",
                            title: "Image",
                        },
                        {
                            name: "alt",
                            type: "string",
                            title: "Alt Text",
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: "carouselADImages",
            type: "array",
            title: "Carousel AD Images",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            type: "image",
                            title: "Image",
                        },
                        {
                            name: "alt",
                            type: "string",
                            title: "Alt Text",
                        },
                    ],
                },
            ],
        }),
    ],
});

export default Cladding;
