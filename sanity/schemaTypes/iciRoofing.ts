import { defineField, defineType } from "sanity";

const ICIRoofing = defineType({
    name: "iciRoofing",
    type: "document",
    title: "ICI Roofing",
    fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({
            name: "content",
            type: "text",
            title: "Main Content",
        }),
        defineField({ name: "firstTitle", type: "string", title: "First Title" }),
        defineField({
            name: "firstContent",
            type: "text",
            title: "First Content",
        }),
        defineField({
            name: "firstImage",
            type: "object",
            title: "First Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({
            name: "secondImage",
            type: "object",
            title: "Second Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({
            name: "secondContent",
            type: "text",
            title: "Second Content",
        }),
        defineField({
            name: "thirdContent",
            type: "text",
            title: "Third Content",
        }),
        defineField({ name: "secondTitle", type: "string", title: "Second Title" }),
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
            name: "listItem",
            type: "text",
            title: "List Item",
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
    ],
});

export default ICIRoofing;