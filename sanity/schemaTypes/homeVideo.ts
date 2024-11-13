import { defineField, defineType } from "sanity";

const homeVideo = defineType({
    name: "homeVideo",
    title: "Home Video",
    type: "document",
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

export default homeVideo;