"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import type { Project } from "@/types";

// Leaflet touches `window`, so the map is client-only (never server-rendered).
const ProjectsMapInner = dynamic(() => import("@/components/elements/ProjectsMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <span className="font-montserrat text-sm text-gray-400">Loading map…</span>
    </div>
  ),
});

interface Props {
  projects: Project[];
}

export default function ProjectsMap({ projects }: Props) {
  const hasPins = projects.some(
    (p) => typeof p.latitude === "number" && typeof p.longitude === "number"
  );

  // Nothing to show until at least one project has coordinates set in the CMS.
  if (!hasPins) return null;

  return (
    <section className="w-full bg-[rgb(255,253,245)] py-20 sm:py-28">
      <div className="container max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-secondary-600" />
              <span className="font-montserrat text-secondary-700 text-xs uppercase tracking-[0.18em]">
                Our Work Across the GTA
              </span>
            </div>
            <h2
              className="font-julius text-primary-950 leading-tight"
              style={{ fontSize: "clamp(1.75rem,3vw,2.75rem)" }}
            >
              Projects Across the Greater Toronto Area
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-4">
              From downtown Toronto to Mississauga, Vaughan, and beyond — explore the
              roofing, cladding, and waterproofing projects we&apos;ve completed across
              the region. Click any pin to see the project.
            </p>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-secondary-800 hover:text-secondary-900"
            >
              View All Projects
              <FaArrowRight
                size={11}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>

        <div className="w-full h-105 sm:h-130 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <ProjectsMapInner projects={projects} />
        </div>
      </div>
    </section>
  );
}