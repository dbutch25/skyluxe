import type { Metadata } from "next";
import { fetchMapProjects, fetchProjects } from "@/lib/data";
import ProjectsClient from "./ProjectsClient";
import ProjectsMap from "@/components/sections/ProjectsMap";
import ProjectsCTA from "@/components/sections/ProjectsCTA";

export const metadata: Metadata = {
  title: "Projects | Skyluxe Roofing & Sheet Metal",
  description:
    "Industrial, commercial, institutional and high-end residential roofing, cladding and waterproofing projects across the Greater Toronto Area.",
};

export default async function ProjectsPage() {
  const [projects, mapProjects] = await Promise.all([fetchProjects(), fetchMapProjects()]);

  return (
    <>
      <ProjectsClient projects={projects} />
      <ProjectsMap projects={mapProjects} showViewAll={false} />
      <ProjectsCTA />
    </>
  );
}