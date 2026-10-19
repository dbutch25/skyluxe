import type { Metadata } from "next";
import { fetchProjects } from "@/lib/data";
import ProjectsClient from "./ProjectsClient";
import ProjectsCTA from "@/components/sections/ProjectsCTA";

export const metadata: Metadata = {
  title: "Projects | Skyluxe Roofing & Sheet Metal",
  description:
    "Industrial, commercial, institutional and high-end residential roofing, cladding and waterproofing projects across the Greater Toronto Area.",
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <>
      <ProjectsClient projects={projects} />
      <ProjectsCTA />
    </>
  );
}