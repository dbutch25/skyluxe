"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaAlignJustify, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaX, FaArrowRight } from "react-icons/fa6";
import { images } from "@/constants";
import { safeImageUrl } from "@/lib/utils";
import { NAV_MATERIALS_PER_ITEM, type NavItem, type NavService } from "@/lib/nav-menu";

// ─── Data ─────────────────────────────────────────────────────────────────────
// Services dropdown content comes from Admin → Navigation (see lib/nav-menu.ts).

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

type Service = NavService;
type Project = NavItem;

// ─── Mega menu ────────────────────────────────────────────────────────────────

function MegaMenu({
  open,
  onClose,
  panelRef,
  services,
}: {
  open: boolean;
  onClose: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
  services: Service[];
}) {
  const [activeService, setActiveService] = useState<Service>(services[0]);
  const [activeProject, setActiveProject] = useState<Project>(services[0].items[0]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const fade = (cb: () => void) => {
    setFading(true);
    setTimeout(() => { cb(); setFading(false); }, 160);
  };

  const handleServiceHover = (service: Service) => {
    if (service.id === activeService.id) return;
    fade(() => {
      setActiveService(service);
      setActiveProject(service.items[0]);
      setActiveProjectIndex(0);
    });
  };

  const handleProjectSwitch = (project: Project, index: number) => {
    if (index === activeProjectIndex) return;
    fade(() => {
      setActiveProject(project);
      setActiveProjectIndex(index);
    });
  };

  return (
    <div
      ref={panelRef}
      className={`fixed left-0 w-full bg-white shadow-2xl z-40 transition-all duration-300 ease-in-out top-28 ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
      style={{ borderBottom: "1px solid #e5e7eb" }}
    >
      <div className="max-w-7xl mx-auto flex" style={{ minHeight: 440 }}>

        {/* ── Left: service list ── */}
        <div
          className="shrink-0 py-8 px-6 flex flex-col justify-between border-r border-gray-100"
          style={{ width: 260 }}
        >
          <div>
            <p className="text-xs text-gray-400 font-montserrat uppercase tracking-widest mb-5">
              Our Services
            </p>
            <ul className="space-y-0.5">
              {services.map((service) => {
                const active = activeService.id === service.id;
                return (
                  <li key={service.id}>
                    <div
                      onMouseEnter={() => handleServiceHover(service)}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-all duration-150 group ${
                        active ? "bg-primary-950" : "hover:bg-gray-50"
                      }`}
                    >
                      <Link
                        href={service.href}
                        onClick={onClose}
                        className={`font-julius text-sm flex-1 transition-colors ${
                          active
                            ? "text-white"
                            : "text-primary-800 group-hover:text-primary-950"
                        }`}
                      >
                        {service.label}
                      </Link>
                      <FaArrowRight
                        size={9}
                        className={`shrink-0 transition-all duration-150 ${
                          active
                            ? "text-white opacity-100"
                            : "opacity-0 group-hover:opacity-40 text-primary-800"
                        }`}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <Link
            href="/services"
            onClick={onClose}
            className="flex items-center gap-2 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat uppercase tracking-wide transition-colors mt-6"
          >
            All services <FaArrowRight size={9} />
          </Link>
        </div>

        {/* ── Right: project showcase ── */}
        <div className="flex-1 flex flex-col py-8 px-8 min-w-0">

          {/* Service title */}
          <div className="mb-5">
            <h2 className="font-julius text-primary-950 text-xl mb-1">
              {activeService.label}
            </h2>
            <p className="text-sm text-gray-400 font-montserrat">
              {activeService.description}
            </p>
          </div>

          {/* Project tabs */}
          <div className="flex gap-2 mb-4">
            {activeService.items.map((project, i) => project.title && (
              <button
                key={i}
                onMouseEnter={() => handleProjectSwitch(project, i)}
                onClick={() => handleProjectSwitch(project, i)}
                className={`px-3 py-1.5 text-xs font-montserrat rounded-full border transition-all duration-150 ${
                  activeProjectIndex === i
                    ? "bg-primary-950 text-white border-primary-950"
                    : "border-gray-200 text-gray-500 hover:border-secondary-300 hover:text-secondary-700"
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>

          {/* Image + materials */}
          <div
            className={`flex gap-6 flex-1 transition-opacity duration-150 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Image */}
            <div
              className="relative rounded-xl overflow-hidden flex-1"
              style={{ minHeight: 260 }}
            >
              <Image
                src={safeImageUrl(activeProject.imageUrl)}
                alt={activeProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 60vw, 700px"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-primary-950/20 to-transparent flex items-end p-5">
                <div className="flex items-end justify-between w-full">
                  <div>
                    <p className="text-xs text-secondary-300 font-montserrat uppercase tracking-widest mb-1">
                      Featured Project
                    </p>
                    <h3 className="font-julius text-white text-lg">
                      {activeProject.title}
                    </h3>
                  </div>
                  {activeProject.href && (
                    <Link
                      href={activeProject.href}
                      onClick={onClose}
                      className="flex items-center gap-2 bg-white text-primary-950 font-montserrat text-xs uppercase tracking-widest px-4 py-2.5 rounded hover:bg-secondary-50 transition-colors shrink-0 ml-4"
                    >
                      View Project <FaArrowRight size={9} />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Materials list */}
            <div className="w-48 shrink-0 flex flex-col justify-center">
              <p className="text-xs text-gray-400 font-montserrat uppercase tracking-widest mb-4">
                Materials
              </p>
              <ul className="space-y-3">
                {activeProject.materials.slice(0, NAV_MATERIALS_PER_ITEM).map((mat, i) => (
                  <li key={mat} className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white font-montserrat text-xs shrink-0"
                      style={{ background: "#0b4e6f" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-primary-800 font-montserrat">
                      {mat}
                    </span>
                  </li>
                ))}
              </ul>
              {activeProject.href && (
                <Link
                  href={activeProject.href}
                  onClick={onClose}
                  className="mt-6 flex items-center gap-2 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat transition-colors"
                >
                  See full project <FaArrowRight size={9} />
                </Link>
              )}
            </div>
          </div>

          {/* Footer bar */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400 font-montserrat">
              GAF Master Elite Contractor · Knudson Certified
            </p>
            <Link
              href="/quote"
              onClick={onClose}
              className="flex items-center gap-2 bg-secondary-800 text-white text-xs font-montserrat uppercase tracking-widest px-5 py-2.5 rounded hover:bg-secondary-900 transition-colors"
            >
              Get a Free Quote <FaArrowRight size={9} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header({ services }: { services: NavService[] }) {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Refs for outside-click detection
  const megaMenuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Hide on studio/admin routes
  if (pathname.startsWith("/studio") || pathname.startsWith("/admin")) return null;

  // Scroll: hide on scroll down, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y < lastY || y < 50);
      setIsSticky(y > 0);
      if (y > 80) setServicesOpen(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close when clicking outside both the trigger button and the panel
  const handleOutside = useCallback((e: MouseEvent) => {
    const target = e.target as Node;
    const inPanel = megaMenuRef.current?.contains(target);
    const inTrigger = triggerRef.current?.contains(target);
    if (!inPanel && !inTrigger) setServicesOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [handleOutside]);

  // Close everything on route change
  useEffect(() => {
    setShowMenu(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className={`h-28 bg-gray-50 font-montserrat w-full transition-all duration-300 ease-in-out ${
          isSticky ? "fixed top-0 z-50 shadow-lg" : "absolute z-40 opacity-95"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="px-6 lg:px-10 flex justify-between w-full items-center h-full">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={images.logo}
              alt="Skyluxe Roofing"
              width={200}
              height={100}
              style={{ height: "auto" }}
              loading="eager"
              className="w-40 sm:w-36 md:w-44 lg:w-52 transition-all duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-primary-950 text-sm uppercase tracking-wide hover:text-secondary-700 transition-colors"
            >
              Home
            </Link>

            {/* Services button — click to toggle open/close */}
            <button
              ref={triggerRef}
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-sm uppercase tracking-wide transition-colors ${
                servicesOpen
                  ? "text-secondary-700"
                  : "text-primary-950 hover:text-secondary-700"
              }`}
            >
              Services
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {NAV_LINKS.slice(1).map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm uppercase tracking-wide transition-colors ${
                  pathname === href
                    ? "text-secondary-700"
                    : "text-primary-950 hover:text-secondary-700"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/quote"
              className="hidden lg:block tracking-widest text-xs border-2 border-secondary-800 px-5 py-2.5 text-secondary-800 rounded uppercase hover:bg-secondary-800 hover:text-white transition-all duration-200"
            >
              Request A Quote
            </Link>
            <button
              onClick={() => setShowMenu((v) => !v)}
              className="lg:hidden text-primary-950"
              aria-label={showMenu ? "Close menu" : "Open menu"}
            >
              {showMenu ? <FaX size={24} /> : <FaAlignJustify size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop contact bar */}
        <div className="hidden lg:flex absolute right-6 -bottom-9 bg-gray-50 border border-gray-200 rounded-b-md px-4 py-1.5 items-center gap-3 text-xs text-gray-600 shadow-sm z-30">
          <FaPhone size={9} className="text-secondary-600" />
          <Link
            href="tel:+16476295893"
            className="hover:text-secondary-700 transition-colors pr-3 border-r border-gray-300"
          >
            (647) 629 5893
          </Link>
          <FaEnvelope size={9} className="text-secondary-600" />
          <Link
            href="mailto:info@skyluxeroofing.com"
            className="hover:text-secondary-700 transition-colors"
          >
            info@skyluxeroofing.com
          </Link>
        </div>
      </header>

      {/* ── Desktop mega menu ── no hover wrappers, click only ── */}
      <MegaMenu
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
        panelRef={megaMenuRef}
        services={services}
      />

      {/* Backdrop — click to close */}
      {servicesOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 hidden lg:block"
          onClick={() => setServicesOpen(false)}
        />
      )}

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`fixed inset-0 z-50 bg-gray-50 flex flex-col transition-all duration-300 lg:hidden ${
          showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 h-28 border-b border-gray-200">
          <Link href="/" onClick={() => setShowMenu(false)}>
            <Image
              src={images.logo}
              alt="Skyluxe Roofing"
              width={160}
              height={64}
              style={{ height: "auto" }}
            />
          </Link>
          <button onClick={() => setShowMenu(false)} className="text-primary-950">
            <FaX size={24} />
          </button>
        </div>

        {/* Mobile links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
          <Link
            href="/"
            onClick={() => setShowMenu(false)}
            className="block py-3 text-primary-950 font-montserrat uppercase text-sm border-b border-gray-100"
          >
            Home
          </Link>

          {/* Services accordion — click to toggle */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="w-full flex items-center justify-between py-3 text-primary-950 font-montserrat uppercase text-sm"
            >
              Services
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div className="pb-4 space-y-5 pl-2">
                {services.map((service) => (
                  <div key={service.id}>
                    <Link
                      href={service.href}
                      onClick={() => setShowMenu(false)}
                      className="block font-julius text-primary-800 text-sm mb-2 hover:text-secondary-700 transition-colors"
                    >
                      {service.label}
                    </Link>
                    {service.items.filter((item) => item.title && item.href).map((project, i) => (
                      <Link
                        key={i}
                        href={project.href}
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2 py-1.5 pl-3 text-xs text-gray-500 font-montserrat hover:text-secondary-700 transition-colors"
                      >
                        <FaArrowRight size={8} className="text-secondary-400 shrink-0" />
                        {project.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.slice(1).map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setShowMenu(false)}
              className="block py-3 text-primary-950 font-montserrat uppercase text-sm border-b border-gray-100 hover:text-secondary-700 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="px-6 py-6 border-t border-gray-200 space-y-3">
          <Link
            href="/quote"
            onClick={() => setShowMenu(false)}
            className="block text-center w-full bg-secondary-800 text-white font-montserrat uppercase tracking-widest text-xs px-5 py-3 rounded hover:bg-secondary-900 transition-colors"
          >
            Request A Quote
          </Link>
          <div className="flex justify-center gap-6 text-xs text-gray-400 font-montserrat">
            <Link
              href="tel:+16476295893"
              className="hover:text-secondary-700 transition-colors"
            >
              (647) 629 5893
            </Link>
            <Link
              href="mailto:info@skyluxeroofing.com"
              className="hover:text-secondary-700 transition-colors"
            >
              info@skyluxeroofing.com
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}