import { defineField, defineType } from "sanity";

const videoType = defineType({
    name: "video",
    type: "object",
    fields: [
        defineField({
            name: "videoLabel",
            type: "string",
        }),
        defineField({
            name: "url",
            type: "file",
            title: "URL",
        }),
    ],
});

export default videoType;