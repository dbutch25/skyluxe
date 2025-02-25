import { defineType, defineField } from "sanity";

const projectList = defineType({
  name: "projectList",
  title: "Project List",
  type: "document",
  fields: [
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "projectPage" }] }],
      options: {
        sortable: true, // Enables drag-and-drop sorting
      },
    }),
  ],
});

export default projectList;
