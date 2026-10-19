import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProjectBySlug, fetchRelatedProjects } from "@/lib/data";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return { title: "Project | Skyluxe Roofing & Sheet Metal" };
  return {
    title: `${project.title} | Skyluxe Roofing & Sheet Metal`,
    description:
      project.project?.blurb ??
      `${project.title} — roofing and sheet metal project in ${project.city ?? "the GTA"}.`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug); // published only
  if (!project) notFound();

  const related = await fetchRelatedProjects(slug, project.service);
  return <ProjectDetailView project={project} related={related} />;
}
