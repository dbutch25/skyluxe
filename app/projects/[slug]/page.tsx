import Image from "next/image";
import VideoBackground from "@/components/elements/VideoBackground";
import Carousel from "@/components/elements/Carousel";
import { FaCircleCheck } from "react-icons/fa6";
import React from "react";
import { projectQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";

export const revalidate = 60;

interface ListSection {
    title: string;
    items: string[];
}

export interface Project {
    title: string;
    slug: string;
    backgroundVideo: string;
    fallbackImage: string
    content: string;
    mainImage: string;
    listSections?: ListSection[];
    extraContent: string;
    extraImage: string;
    fullWidthImage: string;
    centeredText: string;
    images: string[];
    carouselImages: string[];
    firstEmbed: string;
    secondEmbed: string;
    thirdEmbed: string;
}

const ProjectDetailPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

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
                <VideoBackground videoSrc={project.backgroundVideo} fallbackImage={project.fallbackImage} />

                <section className="container">
                    <div className="text-3xl font-julius text-primary-950 text-left py-10">
                        <h1 className="inline border-b-2 border-primary-800">{project.title}</h1>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap gap-10 py-10">
                        <div
                            className={`text-base font-montserrat ${
                                project.mainImage ? "w-full md:w-1/2" : "w-full"
                            }`}
                        >
                            <p>{project.content}</p>
                        </div>
                        {project.mainImage && (
                            <div className="w-full h-96 md:w-1/2">
                                <Image
                                    src={project.mainImage}
                                    alt={project.title}
                                    width={600}
                                    height={400}
                                    className="object-cover h-full w-full rounded-lg shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-5 p-10">
                        {project.listSections
                            ?.filter(
                                (section) => section.title && section.items?.length // Ensure title exists and items array is non-empty
                            )
                            .map((section, index) => (
                                <div key={index}>
                                    <h3 className="text-base font-julius mb-4">{section.title}</h3>
                                    <ul>
                                        {section.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center font-montserrat text-left text-sm text-gray-700"
                                            >
                                                <FaCircleCheck
                                                    size={10}
                                                    className="text-secondary-600 mr-2 min-w-3 min-h-3"
                                                />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                    </div>
                    <div>
                        <span className="h-0.5 w-full bg-primary-400 block rounded-full"/>
                    </div>
                    {(project.extraImage || project.extraContent) && (
                    <div className="flex flex-wrap md:flex-nowrap md:flex-row-reverse gap-8 py-10 md:py-20">
                        {project.extraContent && (
                            <div className="w-full md:w-1/2 text-base font-montserrat text-primary-950">
                                <p>{project.extraContent}</p>
                            </div>
                        )}

                        {project.extraImage && (
                            <div className="w-full h-96 md:w-1/2">
                                <Image
                                    src={project.extraImage || ""}
                                    alt="Extra"
                                    width={600}
                                    height={400}
                                    className="object-cover h-full rounded-lg shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                    )}
                    {project.fullWidthImage && (
                        <div className="py-5">
                            <Image
                                src={project.fullWidthImage}
                                alt="Full Width"
                                width={1280}
                                height={600}
                                className="object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                    {project.centeredText && (
                        <div className="text-center font-montserrat text-primary-950 text-base py-10">
                            <p>{project.centeredText}</p>
                        </div>
                    )}

                    {project.images?.filter((img) => img).length > 0 && (
                        <div className="flex flex-wrap md:flex-nowrap gap-8 pb-0 pt-10 md:pb-10 px-4">
                            {project.images
                                ?.filter((img) => img)
                                .map((img, idx) => (
                                    <div key={idx} className="w-full h-96 md:w-1/2">
                                        <Image
                                            src={img}
                                            alt={`Image ${idx + 1}`}
                                            width={600}
                                            height={400}
                                            className="object-cover w-full h-full rounded-lg shadow-lg"
                                        />
                                    </div>
                                ))}
                        </div>
                    )}

                    {project.carouselImages && (
                    <div className="pt-0 md:pt-10 pb-10">
                        <Carousel images={project.carouselImages || []}/>
                    </div>
                    )}
                    {(project.firstEmbed || project.secondEmbed) && (
                        <div className="flex flex-col justify-center items-center md:flex-row gap-8">
                            {project.firstEmbed && (
                                <div className="w-full md:w-1/2">
                                    <YouTubeEmbed videoId={project.firstEmbed} />
                                </div>
                            )}
                            {project.secondEmbed && (
                                <div className="w-full md:w-1/2">
                                    <YouTubeEmbed videoId={project.secondEmbed} />
                                </div>
                            )}
                        </div>
                    )}

                    {project.thirdEmbed && (
                    <div className="py-10">
                        <YouTubeEmbed videoId={project.thirdEmbed}/>
                    </div>
                    )}
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
};

export default ProjectDetailPage;
