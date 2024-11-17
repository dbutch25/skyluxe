import Image from "next/image";
import VideoBackground from "@/components/elements/VideoBackground";
import Carousel from "@/components/elements/Carousel";
import { FaCircleCheck } from "react-icons/fa6";
import React from "react";
import {projectQuery} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";

export const revalidate = 60;

interface ListSection {
    title: string;
    items: string[];
}

export interface Project {
    title: string;
    slug: string;
    backgroundVideo: string;
    content: string;
    mainImage: string;
    listSections?: ListSection[];
    extraContent: string;
    extraImage: string;
    fullWidthImage: string;
    centeredText: string;
    images: string[];
    carouselImages: string[];
}

const ProjectDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;

    try {
        const project: Project | null = await client.fetch(projectQuery, { slug });

        if (!project) {
            return (
                <div className="pt-40 text-center text-red-500 py-20">
                    <h2 className="text-xl">Project not found!</h2>
                    <p>The project you are looking for does not exist or has been removed.</p>
                </div>
            );
        }

        return (
            <div className="project-detail-page">
                <VideoBackground videoSrc={project.backgroundVideo} />

                <section className="container">
                    <div className="text-3xl font-julius text-primary-950 text-left py-10">
                        <h1 className="inline border-b-2 border-primary-800">{project.title}</h1>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap gap-10 py-10">
                        <div className="text-base font-montserrat w-full md:w-1/2">
                            <p>{project.content}</p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <Image
                                src={project.mainImage}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="border-b-2 border-primary-500 grid grid-cols-1 md:grid-cols-3 gap-8 pt-5 pb-10 md:pt-10 md:pb-20">
                        {project.listSections?.map((section, index) => (
                            <div key={index}>
                                <h3 className="text-base font-julius mb-4">{section.title}</h3>
                                <ul>
                                    {section.items?.map((item, idx) => (
                                        <div key={idx} className="flex items-center font-montserrat text-left text-sm text-gray-700">
                                            <FaCircleCheck size={10} className="text-secondary-600 mr-2 min-w-3 min-h-3"/>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap gap-8 py-10 md:py-20">
                        <div className="w-full md:w-1/2 text-base font-montserrat text-primary-950">
                            <p>{project.extraContent}</p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <Image
                                src={project.extraImage}
                                alt="Extra"
                                width={600}
                                height={400}
                                className="object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="py-10">
                        <Image
                            src={project.fullWidthImage}
                            alt="Full Width"
                            width={1280}
                            height={600}
                            className="object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="text-center font-montserrat text-base py-10">
                        <p>{project.centeredText}</p>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap gap-8 pb-0 pt-10 md:pb-10 px-4">
                        {project.images?.map((img, idx) => (
                            <div key={idx} className="w-full md:w-1/2">
                                <Image
                                    src={img}
                                    alt={`Image ${idx + 1}`}
                                    width={600}
                                    height={400}
                                    className="object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="pt-0 md:pt-10 pb-20">
                        <Carousel images={project.carouselImages} />
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error("Error fetching project data:", error);
        return (
            <div className="text-center text-red-500 py-20">
                <h2 className="text-xl">Error loading project</h2>
                <p>There was an issue loading the project details. Please try again later.</p>
            </div>
        );
    }
}

export default ProjectDetailPage;
