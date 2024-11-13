import { defineField, defineType } from "sanity";

const listContent = defineType({
    name: "listContent",
    title: "List Content",
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

export default listContent;