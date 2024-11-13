import {defineField, defineType} from "sanity";

const Project = defineType({
    name: "project",
    type: "document",
    title: "Project",
    fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" } }),
        defineField({ name: "backgroundVideo", type: "file", title: "Background Video" }),
        defineField({ name: "content", type: "text", title: "Main Content" }),
        defineField({ name: "mainImage", type: "image", title: "Main Image" }),
        defineField({
            name: "listSections",
            type: "array",
            title: "List Sections",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", type: "string", title: "Title" },
                        { name: "items", type: "array", of: [{ type: "string" }] },
                    ],
                },
            ],
        }),
        defineField({ name: "extraContent", type: "text", title: "Extra Content" }),
        defineField({ name: "extraImage", type: "image", title: "Extra Image" }),
        defineField({ name: "fullWidthImage", type: "image", title: "Full-Width Image" }),
        defineField({ name: "centeredText", type: "text", title: "Centered Text" }),
        defineField({ name: "images", type: "array", of: [{ type: "image" }], title: "Images" }),
        defineField({ name: "carouselImages", type: "array", of: [{ type: "image" }], title: "Carousel Images" }),

    ],
}
);

export default Project;