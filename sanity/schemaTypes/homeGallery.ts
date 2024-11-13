import { defineType, defineField } from "sanity";

const homeGallery = defineType({
    name: "homeGallery",
    title: "Home Gallery",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required().max(80).warning("Titles should be concise."),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required().error("Image is required."),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required().error("Slug is required."),
        }),
    ],
});

export default homeGallery;
