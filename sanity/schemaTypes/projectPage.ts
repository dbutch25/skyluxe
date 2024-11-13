import { defineType, defineField } from "sanity";

const projectPage = defineType({
    name: "projectPage",
    title: "Project Page",
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
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Waterproofing', value: 'waterproofing' },
                    { title: 'Residential Roofing', value: 'residential roofing' },
                    { title: 'ICI', value: 'ICI' },
                ],
                layout: 'radio',
            },
        }),
    ],
});

export default projectPage;
