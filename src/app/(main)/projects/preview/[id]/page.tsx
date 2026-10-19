import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { fetchProjectForPreview, fetchRelatedProjects } from "@/lib/data";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

/**
 * Admin-only preview of any project, published or draft.
 * Lives under the public layout so it looks exactly like the real page.
 */

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Preview | Skyluxe Roofing & Sheet Metal",
  robots: { index: false, follow: false },
};

export default async function ProjectPreviewPage({ params }: PageProps) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const project = await fetchProjectForPreview(id);
  if (!project) notFound();

  const related = await fetchRelatedProjects(project.slug, project.service);
  return <ProjectDetailView project={project} related={related} draft={!project.published} />;
}
