/**
 * The project detail page layout, shared by the public page
 * (app/(main)/projects/[slug]) and the admin draft preview
 * (app/(main)/projects/preview/[id]).
 */
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { planProjectPhotos } from "@/lib/project-photos";
import { cn, safeImageUrl } from "@/lib/utils";
import ProjectsCTA from "@/components/sections/ProjectsCTA";
import SequenceSlider from "@/components/elements/SequenceSlider";
import type { Chapter, Fact, Highlight, ListSection, Project, ProjectFull, ProjectVideo } from "@/types";

// Shared type/spacing tokens, kept as literals so Tailwind can see them.
const EYEBROW = "font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em]";
const H2 = "font-julius tracking-tight";
const H2_SIZE = { fontSize: "clamp(1.5625rem, 3.6vw, 2.125rem)" };

function SectionHead({ title, right, dark }: { title: string; right?: string | null; dark?: boolean }) {
  return (
    <div
      className={`mb-8.5 flex items-baseline justify-between gap-6 border-t pt-6.5 ${
        dark ? "border-white/[.14]" : "border-primary-950/15"
      }`}
    >
      <h2 className={H2} style={H2_SIZE}>{title}</h2>
      {right && (
        <span className={`font-montserrat text-xs ${dark ? "text-[#8A9299]" : "text-gray-500"}`}>{right}</span>
      )}
    </div>
  );
}

function Bullet({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`grid grid-cols-[14px_minmax(0,1fr)] items-start gap-3 border-t py-3 break-inside-avoid ${
        dark ? "border-white/9" : "border-primary-950/12"
      }`}
    >
      <span className={`mt-2.75 block h-px w-3.5 ${dark ? "bg-secondary-300" : "bg-secondary-700"}`} />
      <span
        className={`font-montserrat text-[15px] leading-normal text-pretty ${
          dark ? "text-[#D6D9DB]" : "text-gray-700"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

const pad2 = (n: number) => String(n + 1).padStart(2, "0");

/** Full-width overview photo: 16:9 on small screens, wider on large ones. */
function OverviewWideImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video lg:aspect-21/9 overflow-hidden bg-primary-900">
      <Image src={safeImageUrl(src)} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  );
}

interface ProjectDetailViewProps {
  project: ProjectFull;
  related: Project[];
  /** Admin preview of a project that isn't published yet. */
  draft?: boolean;
}

export default function ProjectDetailView({ project, related, draft = false }: ProjectDetailViewProps) {
  const detail = project.project;

  const scope = (detail?.listSections as ListSection[] | undefined) ?? [];
  const scopeCount = scope.reduce((n, g) => n + (g.items?.length ?? 0), 0);
  const chapters = (detail?.chapters as Chapter[] | null | undefined) ?? [];
  const highlight = (detail?.highlight as Highlight | null | undefined) ?? null;
  const video = (detail?.video as ProjectVideo | null | undefined) ?? null;

  const sequence = detail?.carouselImages ?? [];

  // Facts strip: city + area from their own fields, then any custom facts.
  const facts: Fact[] = [
    ...(project.city ? [{ label: "Location", value: project.city }] : []),
    ...(detail?.area ? [{ label: "Area", value: detail.area }] : []),
    ...(((detail?.facts as Fact[] | null | undefined) ?? []).filter((f) => f.label && f.value)),
  ].filter((f, i, all) => all.findIndex((x) => x.label.toLowerCase() === f.label.toLowerCase()) === i);

  // Overview paragraphs (older records fall back to scope / challenge / solution)
  // and the photos placed around them. Gallery photos used there are left out
  // of the On site section so nothing appears twice.
  const photos = planProjectPhotos(project.imageUrl, detail);
  const overview = photos.paragraphs;
  const overviewImg = photos.overview.bySlot;
  const gallery = photos.onSite;

  return (
    <main className="bg-primary-950 text-white">
      {draft && (
        <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-secondary-300 px-6 py-2.5 text-center font-montserrat text-sm text-primary-950">
          <span>
            <strong>Draft preview.</strong> This project isn&apos;t on the public site yet.
          </span>
          <Link href={`/admin/projects/${project.id}`} className="font-semibold underline underline-offset-2">
            Back to editor
          </Link>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative w-full bg-primary-900" style={{ height: "clamp(460px, 72vh, 680px)" }}>
        <Image src={safeImageUrl(project.imageUrl)} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(11,18,32,.92) 0%, rgba(11,18,32,.35) 45%, rgba(11,18,32,.15) 100%)",
          }}
        />
        <div className="absolute inset-x-6 lg:inset-x-12 bottom-11">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5.5 flex flex-wrap items-center gap-2.5 font-montserrat text-[11.5px] font-semibold uppercase tracking-[0.2em]">
              <Link href="/projects" className="text-secondary-300 hover:text-secondary-200">Projects</Link>
              <span className="text-[#8A9299]">/</span>
              <span className="text-[#B9BEC2]">{project.sector ?? project.category?.[0]}</span>
              {detail?.underConstruction && (
                <span className="ml-2 border border-secondary-300 px-2.5 py-1.25 text-[10.5px] tracking-[0.16em] text-secondary-300">
                  Under construction
                </span>
              )}
            </div>
            <h1
              className="font-julius leading-[.96] tracking-tight max-w-[22ch] text-balance"
              style={{ fontSize: "clamp(2.125rem, 6.6vw, 4.625rem)" }}
            >
              {project.title}
            </h1>
            {detail?.subtitle && (
              <p className="mt-5 font-montserrat text-[18px] leading-normal text-[#D6D9DB] max-w-[60ch]">
                {detail.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Facts strip ── */}
      {facts.length > 0 && (
        <section className="bg-primary-950 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl grid grid-cols-[repeat(auto-fit,minmax(min(190px,100%),1fr))] gap-px bg-white/12 border-b border-white/12">
            {facts.map((f) => (
              <div key={f.label} className="bg-primary-950 pt-6.5 pb-7 pr-6">
                <div className={`${EYEBROW} mb-2.5 text-[#8A9299]`}>{f.label}</div>
                <div className="font-julius text-[19px] leading-snug">{f.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Overview (light) ── */}
      {(detail?.blurb || overview.length > 0) && (
        <section className="bg-[rgb(255,253,245)] text-primary-950 px-6 lg:px-12 py-16 lg:py-22">
          <div className="mx-auto max-w-7xl flex flex-col gap-10 lg:gap-16">
            {/* Eyebrow + lead */}
            <div className="flex flex-wrap items-start gap-x-18 gap-y-6">
              <div className={`${EYEBROW} mt-2.5 text-secondary-700`} style={{ flex: "0 1 200px" }}>Overview</div>
              {detail?.blurb && (
                <p
                  className="min-w-0 font-montserrat leading-normal text-gray-800 max-w-[54ch] text-pretty"
                  style={{ flex: "1 1 520px", fontSize: "clamp(20px, 2.2vw, 25px)" }}
                >
                  {detail.blurb}
                </p>
              )}
            </div>

            {overviewImg["lead"] && (
              <OverviewWideImage src={overviewImg["lead"]} alt={`${project.title} — overview`} />
            )}

            {overview.map((p, i) => {
              const side = overviewImg[`side-${i}`];
              const pairIndex = (i - 1) / 2;
              const pair =
                i % 2 === 1
                  ? [overviewImg[`pair-${pairIndex}-0`], overviewImg[`pair-${pairIndex}-1`]].filter((x): x is string => !!x)
                  : [];
              return (
                <Fragment key={i}>
                  {side ? (
                    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                      <p className="font-montserrat text-base leading-[1.7] text-gray-600 max-w-[60ch] text-pretty">{p}</p>
                      {/* Paragraphs 1, 3, 5… image right; 2, 4, 6… image left */}
                      <div className={cn("relative aspect-4/3 overflow-hidden bg-primary-900", i % 2 === 1 && "lg:order-first")}>
                        <Image
                          src={safeImageUrl(side)}
                          alt={`${project.title} — photo ${i + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="font-montserrat text-base leading-[1.7] text-gray-600 max-w-[66ch] text-pretty">{p}</p>
                  )}

                  {pair.length === 2 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
                      {pair.map((src, j) => (
                        <div key={j} className="relative aspect-4/3 overflow-hidden bg-primary-900">
                          <Image
                            src={safeImageUrl(src)}
                            alt={`${project.title} — detail ${pairIndex * 2 + j + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {pair.length === 1 && <OverviewWideImage src={pair[0]} alt={`${project.title} — detail`} />}
                </Fragment>
              );
            })}

            {overviewImg["closing"] && (
              <OverviewWideImage src={overviewImg["closing"]} alt={`${project.title} — completed`} />
            )}
          </div>
        </section>
      )}

      {/* ── Drone walkthrough ── */}
      {detail?.droneImageUrl && (
        <section className="bg-secondary-950 text-white px-6 lg:px-12 pt-16 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="relative w-full overflow-hidden bg-secondary-900" style={{ height: "clamp(380px, 50vw, 560px)" }}>
              <Image
                src={safeImageUrl(detail.droneImageUrl)}
                alt={`${project.title} — drone walkthrough`}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(6,43,60,.86), rgba(6,43,60,.20))" }}
              />
              <div className="pointer-events-none absolute left-11 right-11 top-1/2 max-w-[34ch] -translate-y-1/2">
                <div className={`${EYEBROW} mb-3.5 text-secondary-300`}>Drone walkthrough</div>
                <h3 className="font-julius leading-[1.06] tracking-tight mb-3.5" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                  See the whole assembly from 200 ft.
                </h3>
                <p className="mb-6 font-montserrat text-base leading-relaxed text-[#B9BEC2]">
                  A full pass over the finished roof, terminations and sheet metal details.
                </p>
                {detail.droneVideoId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${detail.droneVideoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-flex items-center gap-3.5 group"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white text-sm transition-colors group-hover:border-secondary-300 group-hover:text-secondary-300">
                      ▶
                    </span>
                    <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.14em]">
                      Play{detail.droneDuration ? ` — ${detail.droneDuration}` : ""}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Scope of work (dark) ── */}
      {scope.length > 0 && (
        <section className="bg-primary-950 text-white px-6 lg:px-12 pt-16 pb-24">
          <div className="mx-auto max-w-7xl">
            <SectionHead title="Scope of work" right={`${scopeCount} items`} dark />
            <div className="flex flex-col gap-14">
              {scope.map((group, gi) => (
                <div key={gi} className="flex flex-wrap gap-x-18 gap-y-5">
                  <div className="flex items-baseline gap-3" style={{ flex: "0 1 200px" }}>
                    <span className="font-montserrat text-[11px] font-semibold tracking-[0.16em] text-secondary-300 tabular-nums">
                      {pad2(gi)}
                    </span>
                    <h3 className="font-julius text-[20px] leading-tight tracking-tight">{group.title ?? "Systems"}</h3>
                  </div>
                  <div className="min-w-0 [column-width:300px] gap-x-11" style={{ flex: "1 1 520px" }}>
                    {group.items?.map((item, ii) => <Bullet key={ii}>{item}</Bullet>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Highlight ── */}
      {highlight?.title && (
        <section className="bg-secondary-950 text-white px-6 lg:px-12 py-22">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center gap-x-18 gap-y-11">
            <div className="min-w-0" style={{ flex: "1 1 420px" }}>
              {highlight.label && <div className={`${EYEBROW} mb-3.5 text-secondary-300`}>{highlight.label}</div>}
              <h2
                className="font-julius leading-[1.04] tracking-tight max-w-[18ch] mb-5"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.25rem)" }}
              >
                {highlight.title}
              </h2>
              {highlight.body && (
                <p className="font-montserrat text-[17px] leading-[1.68] text-[#B9BEC2] max-w-[50ch] text-pretty">
                  {highlight.body}
                </p>
              )}
            </div>
            {highlight.imageUrl && (
              <div className="relative min-w-0 aspect-4/3 bg-secondary-900" style={{ flex: "1 1 420px" }}>
                <Image src={safeImageUrl(highlight.imageUrl)} alt={highlight.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── In detail (light) ── */}
      {chapters.length > 0 && (
        <section className="bg-[rgb(255,253,245)] text-primary-950 px-6 lg:px-12 pt-16 pb-24">
          <div className="mx-auto max-w-7xl">
            <SectionHead title="In detail" />
            <div className="flex flex-col gap-20">
              {chapters.map((c, ci) => (
                <div
                  key={ci}
                  className={`flex flex-wrap items-start gap-x-16 gap-y-10 ${ci % 2 ? "flex-row-reverse" : ""}`}
                >
                  {c.imageUrl && (
                    <div className="relative min-w-0 aspect-4/3 bg-primary-900" style={{ flex: "1 1 400px" }}>
                      <Image src={safeImageUrl(c.imageUrl)} alt={c.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  )}
                  <div className="min-w-0" style={{ flex: "1.1 1 380px" }}>
                    <div className="mb-3.5 font-montserrat text-[11px] font-semibold tracking-[0.16em] text-secondary-700 tabular-nums">
                      {pad2(ci)}
                    </div>
                    <h3 className="font-julius leading-[1.08] tracking-tight mb-4.5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.125rem)" }}>
                      {c.title}
                    </h3>
                    <div className="flex flex-col gap-4">
                      {c.body?.map((p, pi) => (
                        <p key={pi} className="font-montserrat text-base leading-[1.7] text-gray-600 max-w-[60ch] text-pretty">{p}</p>
                      ))}
                    </div>
                    {c.items && c.items.length > 0 && (
                      <div className="mt-5">
                        {c.items.map((item, ii) => <Bullet key={ii} dark={false}>{item}</Bullet>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sequence ── */}
      <SequenceSlider images={sequence} captions={detail?.sequenceCaptions ?? []} />

      {/* ── Feature video (e.g. YouTube Short) ── */}
      {video?.id && (
        <section className="bg-secondary-950 text-white px-6 lg:px-12 py-22">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center gap-x-18 gap-y-11">
            <div className="min-w-0" style={{ flex: "1 1 380px" }}>
              <div className={`${EYEBROW} mb-3.5 text-secondary-300`}>Watch</div>
              {video.title && (
                <h2 className="font-julius leading-[1.06] tracking-tight mb-4.5" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                  {video.title}
                </h2>
              )}
              {video.body && (
                <p className="font-montserrat text-base leading-[1.68] text-[#B9BEC2] max-w-[46ch]">{video.body}</p>
              )}
            </div>
            <div
              className={`min-w-0 bg-secondary-900 ${video.vertical === false ? "aspect-video" : "aspect-9/16"}`}
              style={{ flex: video.vertical === false ? "1.4 1 480px" : "0 1 340px" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title ?? `${project.title} video`}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── On site gallery (light) ── */}
      {gallery.length > 0 && (
        <section className="bg-[rgb(255,253,245)] text-primary-950 px-6 lg:px-12 pt-16 pb-24">
          <div className="mx-auto max-w-7xl">
            <SectionHead title="On site" right={project.service} />
            <div
              className="grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-4"
              style={{ gridAutoRows: "clamp(180px, 24vw, 236px)" }}
            >
              {gallery.map((src, i) => (
                <div key={i} className={`relative overflow-hidden bg-primary-900 ${i === 0 ? "row-span-2" : ""}`}>
                  <Image
                    src={safeImageUrl(src)}
                    alt={`${project.title} — site photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related projects (dark) ── */}
      {related.length > 0 && (
        <section className="bg-primary-950 text-white px-6 lg:px-12 pt-16 pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6.5 flex items-baseline justify-between gap-6 border-t border-white/[.14] pt-6.5">
              <h2 className={H2} style={H2_SIZE}>Related projects</h2>
              <Link
                href="/projects"
                className="whitespace-nowrap font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary-300 hover:text-secondary-200"
              >
                All projects →
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] gap-5.5">
              {related.map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="group block min-w-0">
                  <div className="relative w-full overflow-hidden bg-primary-900 h-67.5">
                    <Image
                      src={safeImageUrl(p.imageUrl)}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-3.5 flex items-baseline justify-between gap-5 border-t border-white/[.14] pt-3.75">
                    <div className="min-w-0">
                      <h3 className="font-julius text-[19px] tracking-tight">{p.title}</h3>
                      <p className="mt-1.5 font-montserrat text-[13px] text-[#8A9299]">
                        {[p.city, p.service].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap font-montserrat text-[10.5px] font-semibold uppercase tracking-[0.14em] text-secondary-300">
                      View →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProjectsCTA />
    </main>
  );
}
