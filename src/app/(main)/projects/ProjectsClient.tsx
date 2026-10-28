"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { safeImageUrl } from "@/lib/utils";
import { PROJECT_SERVICES } from "@/lib/project-options";

const SERVICES = ["All", ...PROJECT_SERVICES] as const;

const STATS = [
  { value: "240+", label: "Projects delivered" },
  { value: "1.8M", label: "Sq ft installed" },
  { value: "14 yrs", label: "In the trade" },
];

/** Split the filtered list into chunks of five: 2-up feature row + 3-up row. */
function chunkFive<T>(list: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += 5) out.push(list.slice(i, i + 5));
  return out;
}

function meta(p: Project) {
  return p.city ?? "";
}

/** Editorial project card. `feature` drives the larger image + type scale. */
function ProjectCard({
  project,
  height,
  feature = false,
  showBadge = true,
}: {
  project: Project;
  height: string;
  feature?: boolean;
  showBadge?: boolean;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block min-w-0">
      <div
        className="relative w-full overflow-hidden bg-primary-900"
        style={{ height }}
      >
        <Image
          src={safeImageUrl(project.imageUrl)}
          alt={project.title}
          fill
          sizes={feature ? "(max-width: 1024px) 100vw, 62vw" : "(max-width: 1024px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div
        className={`flex items-baseline justify-between gap-5 border-t border-white/[.14] ${
          feature ? "mt-4 pt-4.5" : "mt-3.5 pt-3.75"
        }`}
      >
        <div className="min-w-0">
          <h3
            className={`font-julius text-white tracking-tight ${
              feature ? "text-[26px]" : "text-[19px]"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`font-montserrat text-[#8A9299] ${
              feature ? "mt-2 text-sm" : "mt-1.5 text-[13px]"
            }`}
          >
            {meta(project)}
          </p>
        </div>
        <span
          className={`shrink-0 whitespace-nowrap font-montserrat font-semibold uppercase tracking-[0.14em] text-secondary-300 transition-colors group-hover:text-secondary-200 ${
            feature ? "text-[11px]" : "text-[10.5px]"
          }`}
        >
          View →
        </span>
      </div>
    </Link>
  );
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [service, setService] = useState<string>("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () =>
      service === "All"
        ? projects
        : projects.filter((p) => p.services?.includes(service)),
    [projects, service]
  );

  const chunks = useMemo(() => chunkFive(filtered), [filtered]);

  return (
    <main className="bg-primary-950 text-white">
      {/* ── Hero ── */}
      <section className="border-b border-white/10 px-6 lg:px-12 pt-32 pb-14">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-10 lg:gap-16 items-end">
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-8.5 bg-secondary-300" />
              <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary-300">
                Selected work
              </span>
            </div>
            <h1
              className="font-julius leading-[.94] tracking-tight text-balance"
              style={{ fontSize: "clamp(2.375rem, 7.4vw, 5.125rem)" }}
            >
              Roofs, walls and{" "}
              <span className="text-secondary-300">envelopes</span> built to
              spec.
            </h1>
          </div>

          <div className="lg:pb-2.5">
            <p className="font-montserrat text-[17px] leading-[1.62] text-[#B9BEC2] max-w-[46ch]">
              Industrial, commercial, institutional and high-end residential
              work across the GTA. Each project below lists the assembly, the
              systems installed and the conditions we built around, the detail
              architects and property managers actually ask for.
            </p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(130px,100%),1fr))] gap-6 border-t border-white/[.14] pt-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-julius text-[34px] tracking-tight tabular-nums">
                    {s.value}
                  </div>
                  <div className="mt-1.5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A9299]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="border-b border-white/10 bg-primary-950/95 backdrop-blur-[14px] px-6 lg:px-12 py-4.5">
        <div className="mx-auto max-w-7xl">
          {/* Mobile disclosure */}
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex w-full items-center justify-between font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-[#B9BEC2] lg:hidden"
          >
            <span>
              Filters — {service === "All" ? "all projects" : service}
            </span>
            <span className="text-secondary-300 text-base leading-none">
              {filtersOpen ? "−" : "+"}
            </span>
          </button>

          <div
            className={`${
              filtersOpen ? "mt-4 flex" : "hidden"
            } flex-wrap items-center gap-x-9 gap-y-3 lg:mt-0 lg:flex`}
          >
            <span className="font-montserrat text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#8A9299] min-w-13">
              Service
            </span>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => {
                const active = service === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    className={`whitespace-nowrap border px-3.25 py-1.75 font-montserrat text-[11.5px] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                      active
                        ? "border-secondary-300 bg-secondary-300 text-primary-950"
                        : "border-white/20 text-[#B9BEC2] hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <div className="ml-auto flex items-center gap-4">
              <span className="font-montserrat text-xs text-[#8A9299] tabular-nums">
                {filtered.length} {filtered.length === 1 ? "project" : "projects"}
              </span>
              {service !== "All" && (
                <button
                  type="button"
                  onClick={() => setService("All")}
                  className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary-300 hover:text-secondary-200"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Editorial grid ── */}
      <section className="px-6 lg:px-12 pt-14 pb-24">
        <div className="mx-auto max-w-7xl flex flex-col gap-5.5">
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-montserrat text-[#B9BEC2]">
                No projects match those filters.
              </p>
              <button
                type="button"
                onClick={() => setService("All")}
                className="mt-4 font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary-300 hover:text-secondary-200"
              >
                Reset
              </button>
            </div>
          )}

          {chunks.map((chunk, ci) => {
            const featureItems = chunk.slice(0, 2);
            const tripleItems = chunk.slice(2, 5);
            return (
              <div key={ci} className="flex flex-col gap-5.5">
                {featureItems.length > 0 && (
                  <div className="flex flex-wrap gap-5.5">
                    {featureItems.map((p, i) => (
                      <div
                        key={p.id}
                        className="min-w-0"
                        style={{
                          flex:
                            i === 0
                              ? "1.62 1 min(100%, 430px)"
                              : "1 1 min(100%, 300px)",
                        }}
                      >
                        <ProjectCard
                          project={p}
                          feature
                          height="clamp(250px, 42vw, 480px)"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {tripleItems.length > 0 && (
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] gap-5.5">
                    {tripleItems.map((p) => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        height="clamp(220px, 26vw, 288px)"
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export { ProjectCard };