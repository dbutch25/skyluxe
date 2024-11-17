import { defineField, defineType } from "sanity";

const Residential = defineType({
    name: "residential",
    type: "document",
    title: "Residential",
    fields: [
        defineField({
            name: "backgroundImage",
            type: "object",
            title: "Background Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({
            name: "residentialList",
            type: "array",
            title: "Residential List",
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
        defineField({ name: "residentialImages", type: "array", of: [{ type: "image" }], title: "Residential Images" }),

        defineField({ name: "asphaltTitle", type: "string", title: "Asphalt Title" }),
        defineField({
            name: "asphaltFirstContent",
            type: "text",
            title: "Asphalt First Content",
        }),
        defineField({
            name: "asphaltImage",
            type: "object",
            title: "Asphalt Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({ name: "asphaltImages", type: "array", of: [{ type: "image" }], title: "Asphalt Images" }),

        defineField({ name: "cedarTitle", type: "string", title: "Cedar Title" }),
        defineField({
            name: "cedarFirstContent",
            type: "text",
            title: "Cedar First Content",
        }),
        defineField({
            name: "cedarFirstImage",
            type: "object",
            title: "Cedar First Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({
            name: "cedarSecondImage",
            type: "object",
            title: "Cedar Second Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({ name: "cedarImages", type: "array", of: [{ type: "image" }], title: "Cedar Images" }),

        defineField({ name: "metalsTitle", type: "string", title: "Metals Title" }),
        defineField({
            name: "metalsList",
            type: "array",
            title: "Metals List",
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
            name: "metalsContent",
            type: "text",
            title: "Metals Content",
        }),
        defineField({
            name: "metalsFirstImage",
            type: "object",
            title: "Metals First Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({ name: "metalsImages", type: "array", of: [{ type: "image" }], title: "Metals Images" }),

        defineField({ name: "guttersTitle", type: "string", title: "Gutters Title" }),
        defineField({
            name: "guttersContent",
            type: "text",
            title: "Gutters Content",
        }),
        defineField({
            name: "guttersFirstImage",
            type: "object",
            title: "Gutters First Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({
            name: "guttersSecondImage",
            type: "object",
            title: "Gutters Second Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({ name: "guttersImages", type: "array", of: [{ type: "image" }], title: "Gutters Images" }),

        defineField({ name: "naturalTitle", type: "string", title: "Natural Title" }),
        defineField({
            name: "naturalContent",
            type: "text",
            title: "Natural Content",
        }),
        defineField({ name: "naturalImages", type: "array", of: [{ type: "image" }], title: "natural Images" }),

        defineField({ name: "syntheticTitle", type: "string", title: "Synthetic Title" }),
        defineField({
            name: "syntheticContent",
            type: "text",
            title: "Synthetic Content",
        }),
        defineField({
            name: "syntheticImage",
            type: "object",
            title: "Synthetic Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({ name: "syntheticImages", type: "array", of: [{ type: "image" }], title: "Synthetic Images" }),

        defineField({ name: "skylightTitle", type: "string", title: "Skylight Title" }),
        defineField({
            name: "skylightContent",
            type: "text",
            title: "Skylight Content",
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
    ],
});

export default Residential