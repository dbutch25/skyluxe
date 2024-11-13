import { defineField, defineType } from "sanity";

const aboutUsHome = defineType({
    name: "aboutUsHome",
    title: "About Us Home",
    type: "document",
    fields: [
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
});

export default aboutUsHome;