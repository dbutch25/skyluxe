import {defineField, defineType} from "sanity";

const Cladding = defineType({
        name: "cladding",
        type: "document",
        title: "Cladding",
        fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" } }),
            defineField({ name: "content", type: "text", title: "Main Content" }),
            defineField({
                name: "listSections",
                type: "array",
                title: "List Sections",
                of: [
                    {
                        type: "object",
                        fields: [
                            { name: "items", type: "array", of: [{ type: "string" }] },
                        ],
                    },
                ],
            }),
            defineField({ name: "galleryImages", type: "array", of: [{ type: "image" }], title: "Gallery Images" }),
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "extraContent", type: "text", title: "Extra Content" }),
            defineField({ name: "carouselMImages", type: "array", of: [{ type: "image" }], title: "Carousel Manufacturers Images" }),
            defineField({ name: "carouselADImages", type: "array", of: [{ type: "image" }], title: "Carousel AD Images" }),

        ],
    }
);

export default Cladding;