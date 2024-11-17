import { defineField, defineType } from "sanity";

const Repairs = defineType({
    name: "repairs",
    type: "document",
    title: "Repairs",
    fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: { source: "title" },
        }),
        defineField({ name: "firstContent", type: "text", title: "First Content" }),
        defineField({ name: "secondContent", type: "text", title: "Second Content" }),
        defineField({
            name: "firstImage",
            type: "object",
            title: "First Image",
            fields: [
                { name: "image", type: "image", title: "Image" },
                { name: "alt", type: "string", title: "Alt Text" },
            ],
        }),
        defineField({ name: "thirdContent", type: "text", title: "Third Content" }),
        defineField({
            name: "images",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "image", type: "image", title: "Image" },
                        { name: "alt", type: "string", title: "Alt Text" },
                    ],
                },
            ],
            title: "Images",
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
    ],
});

export default Repairs;
