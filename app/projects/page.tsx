"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {fetchProjects} from "@/sanity/lib/queries";


interface Project {
    _id: string;
    title: string;
    category: string;
    imageUrl: string;
    slug: string;
}

const categories = ["residential roofing", "waterproofing", "ICI"];

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("residential roofing");

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProjects();
            setProjects(data);
            setFilteredProjects(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredProjects(
            activeCategory === "All"
                ? projects
                : projects.filter(project => project.category === activeCategory)
        );
    }, [activeCategory, projects]);

    return (
        <section className="px-4 md:px-10 mx-auto pt-40 pb-20">
            <div className="flex flex-wrap justify-center gap-4 md:gap-10 pb-4 md:pb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-3 md:px-4 py-1 md:py-2 capitalize border-2 border-secondary-800 rounded-full text-base font-montserrat ${activeCategory === category ? "bg-secondary-900 text-white" : "bg-gray-200 text-primary-950"} duration-900`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredProjects.map((project) => (
                    <div key={project._id} className="relative">
                        <Link href={`/projects/${project.slug}`}>
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                width={500}
                                height={300}
                                className="w-full h-60 sm:h-72 md:h-80 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                            />
                            <div className="absolute inset-0 flex flex-wrap items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out">
                                <span className="border-b-2 border-primary-50 text-primary-50 text-xl font-julius">{project.title}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsPage;

