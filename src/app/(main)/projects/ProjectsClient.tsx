"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { safeImageUrl } from "@/lib/utils";

const CATEGORIES = ["ICI", "architectural cladding", "residential roofing", "waterproofing"] as const;

interface Props {
  projects: Project[];
}

export default function ProjectsClient({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("ICI");

  const filtered = projects.filter((p) =>
    (p.category as string[])?.includes(activeCategory)
  );

  return (
    <section className="px-4 md:px-10 mx-auto pt-40 pb-20">
      <div className="flex flex-wrap justify-center gap-4 md:gap-10 pb-4 md:pb-8">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`px-3 md:px-4 py-1 md:py-2 capitalize border-2 border-secondary-800 text-base font-montserrat transition-colors duration-300 ${
              activeCategory === category ? "bg-secondary-900 text-white" : "bg-gray-200 text-primary-950"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-10">
        {filtered.map((project) => (
          <div key={project.id} className="relative">
            <Link href={`/projects/${project.slug}`}>
              <Image
                src={safeImageUrl(project.imageUrl)}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-60 sm:h-72 md:h-80 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out">
                <span className="border-b-2 border-gray-50 text-gray-50 text-xl font-julius">
                  {project.title}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}