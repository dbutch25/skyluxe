import { defineArrayMember, defineField, defineType } from "sanity";

const page = defineType({
    name: "page",
    type: "document",
    title: "Page",
    fields: [
        defineField({
            name: "title",
            type: "string" }),

        defineField({
            name: "mainImage",
            title: "Main Image",
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
            name: "pageBuilder",
            type: "array",
            title: "Page builder",
            of: [

                defineArrayMember({
                    name: "video",
                    type: "video",
                }),

                defineArrayMember({
                    name: "gallery",
                    type: "gallery",
                }),

                defineArrayMember({
                    name: "sectionContent",
                    type: "sectionContent",
                }),
                defineArrayMember({
                    name: "pageImage",
                    type: "pageImage",
                }),
            ],
        }),
    ],
});
export default page;