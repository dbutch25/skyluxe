import { notFound } from "next/navigation";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import VideoBackground from "@/components/elements/VideoBackground";
import Carousel from "@/components/elements/Carousel";
import YouTubeEmbed from "@/components/elements/YoutubeEmbed";
import { fetchProjectBySlug } from "@/lib/data";
import { safeImageUrl } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="md:pb-20">
      <VideoBackground
        videoSrc={project.backgroundVideoUrl}
        fallbackImage={project.fallbackImageUrl}
      />

      <section className="container">
        {/* Title */}
        <div className="text-3xl font-julius text-primary-950 text-left py-10">
          <h1 className="inline border-b-2 border-primary-800">{project.title}</h1>
        </div>

        {/* Main content + image */}
        <div className="flex flex-wrap md:flex-nowrap gap-10 py-10">
          <div className={`text-base font-montserrat ${project.mainImageUrl ? "w-full md:w-1/2" : "w-full"}`}>
            <p>{project.content as string}</p>
          </div>
          {project.mainImageUrl && (
            <div className="w-full h-96 md:w-1/2 rounded-lg shadow-lg overflow-hidden">
              <Image
                src={safeImageUrl(project.mainImageUrl)}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover h-full w-full"
              />
            </div>
          )}
        </div>

        {/* List sections */}
        {project.listSections && project.listSections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-5 p-10">
            {project.listSections
              .filter((section) => section.items?.length)
              .map((section, index) => (
                <div key={index}>
                  <ul className="flex flex-col gap-1">
                    {section.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center font-montserrat text-left text-sm text-gray-700"
                      >
                        <FaCircleCheck
                          size={10}
                          className="text-secondary-600 mr-2 min-w-3 min-h-3 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}

        <span className="h-0.5 w-full bg-primary-400 block rounded-full" />

        {/* Extra content + image */}
        {(project.extraImageUrl || project.extraContent) && (
          <div className="flex flex-wrap md:flex-nowrap md:flex-row-reverse gap-8 py-10 md:py-20">
            {project.extraContent && (
              <div className="w-full md:w-1/2 text-base font-montserrat text-primary-950">
                <p>{project.extraContent as string}</p>
              </div>
            )}
            {project.extraImageUrl && (
              <div className="w-full h-96 md:w-1/2">
                <Image
                  src={safeImageUrl(project.extraImageUrl)}
                  alt="Additional project image"
                  width={600}
                  height={400}
                  className="object-cover h-full rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* Full-width image */}
        {project.fullWidthImageUrl && (
          <div className="py-10">
            <Image
              src={safeImageUrl(project.fullWidthImageUrl)}
              alt="Full width project image"
              width={1280}
              height={600}
              className="object-cover w-full rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Centered text */}
        {project.centeredText && (
          <div className="text-center font-montserrat text-primary-950 text-base py-10">
            <p>{project.centeredText}</p>
          </div>
        )}

        {/* Image pair */}
        {project.images && project.images.filter(Boolean).length > 0 && (
          <div className="flex flex-wrap md:flex-nowrap gap-8 pb-0 pt-10 md:pb-10 px-4">
            {project.images.filter(Boolean).map((img, idx) => (
              <div key={idx} className="w-full h-96 md:w-1/2">
                <Image
                  src={img}
                  alt={`Project image ${idx + 1}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* Carousel */}
        {project.carouselImages && project.carouselImages.length > 0 && (
          <div className="pt-0 md:pt-10 pb-10">
            <Carousel images={project.carouselImages} />
          </div>
        )}

        {/* YouTube embeds */}
        {(project.firstEmbed || project.secondEmbed) && (
          <div className="flex flex-col justify-center py-10 items-center md:flex-row gap-8">
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
            <YouTubeEmbed videoId={project.thirdEmbed} />
          </div>
        )}
      </section>
    </div>
  );
}