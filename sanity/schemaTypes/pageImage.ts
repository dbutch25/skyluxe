import { defineField, defineType } from "sanity";

const pageImage = defineType({
    name: "pageImage",
    title: "Image with Alt Text",
    type: "object",
    fields: [
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
            name: "alt",
            title: "Alt Text",
            type: "string",
            validation: (Rule) => Rule.required().max(100).warning("Alt text should be concise."),
        }),
    ],
});

export default pageImage;