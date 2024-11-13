import { defineField, defineType } from "sanity";

const sectionContent = defineType({
    name: "sectionContent",
    title: "Section Content",
    type: "object",
    fields: [
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
});

export default sectionContent;