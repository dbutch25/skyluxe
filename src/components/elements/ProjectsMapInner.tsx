"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Project } from "@/types";
import { safeImageUrl } from "@/lib/utils";

// GTA center (roughly Toronto) + a comfortable default zoom
const GTA_CENTER: [number, number] = [43.7, -79.42];
const DEFAULT_ZOOM = 9;

// Leaflet's default marker icons reference asset files that don't resolve under
// a bundler, so we define a lightweight inline SVG pin (brand navy) instead.
const pinIcon = L.divIcon({
  className: "skyluxe-pin",
  html: `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="#0b2b45"/>
      <circle cx="15" cy="15" r="6" fill="#ffffff"/>
      <circle cx="15" cy="15" r="3" fill="#c8912f"/>
    </svg>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38],
});

interface Props {
  projects: Project[];
}

export default function ProjectsMapInner({ projects }: Props) {
  // Only projects that actually have coordinates get a pin.
  const pinned = useMemo(
    () =>
      projects.filter(
        (p) =>
          typeof p.latitude === "number" &&
          typeof p.longitude === "number" &&
          !Number.isNaN(p.latitude) &&
          !Number.isNaN(p.longitude)
      ),
    [projects]
  );

  return (
    <MapContainer
      center={GTA_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pinned.map((project) => (
        <Marker
          key={project.id}
          position={[project.latitude as number, project.longitude as number]}
          icon={pinIcon}
        >
          <Popup>
            <div className="w-52">
              <div className="relative w-full h-28 rounded-md overflow-hidden mb-2 bg-gray-100">
                <Image
                  src={safeImageUrl(project.imageUrl)}
                  alt={project.title}
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
              {project.city && (
                <p className="font-montserrat text-[11px] uppercase tracking-wide text-secondary-700 mb-0.5">
                  {project.city}
                </p>
              )}
              <p className="font-julius text-primary-950 text-sm leading-tight mb-2">
                {project.title}
              </p>
              {/* Map pins (no detail page) show the photo, city and title only. */}
              {project.hasDetailPage !== false && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 font-montserrat text-xs font-semibold text-secondary-800 hover:text-secondary-900"
                >
                  View Project →
                </Link>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}