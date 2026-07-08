import Link from "next/link";
import { db } from "@/lib/db";
import {
  Video, Images, Layers, FolderOpen, Wrench,
  Droplets, Building2, HardHat, Home, Star, Briefcase,
} from "lucide-react";

export default async function AdminDashboard() {
  const [
    services, projectPages, testimonials, careers, galleryItems,
  ] = await Promise.all([
    db.serviceCarousel.count(),
    db.projectPage.count(),
    db.testimonial.count(),
    db.career.count(),
    db.homeGallery.count(),
  ]);

  const stats = [
    { label: "Service Slides", value: services, href: "/admin/services", icon: Layers },
    { label: "Projects", value: projectPages, href: "/admin/projects", icon: FolderOpen },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials", icon: Star },
    { label: "Careers", value: careers, href: "/admin/careers", icon: Briefcase },
    { label: "Gallery Items", value: galleryItems, href: "/admin/home", icon: Images },
  ];

  const pages = [
    { label: "Home Page", href: "/admin/home", icon: Home, desc: "Video, about text, gallery" },
    { label: "Service Slider", href: "/admin/services", icon: Layers, desc: "Manage service carousel cards" },
    { label: "Projects", href: "/admin/projects", icon: FolderOpen, desc: "Portfolio pages and details" },
    { label: "Repairs", href: "/admin/repairs", icon: Wrench, desc: "Repairs & maintenance page" },
    { label: "Waterproofing", href: "/admin/waterproofing", icon: Droplets, desc: "Waterproofing service page" },
    { label: "ICI Roofing", href: "/admin/ici", icon: Building2, desc: "ICI roofing service page" },
    { label: "Cladding", href: "/admin/cladding", icon: HardHat, desc: "Architectural cladding page" },
    { label: "Residential", href: "/admin/residential", icon: Home, desc: "Residential roofing page" },
    { label: "Testimonials", href: "/admin/testimonials", icon: Star, desc: "Client reviews" },
    { label: "Careers", href: "/admin/careers", icon: Briefcase, desc: "Job listings" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-julius text-primary-950 mb-2">Dashboard</h1>
      <p className="text-gray-500 font-montserrat text-sm mb-8">
        Welcome to the Skyluxe CMS. Manage your website content below.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} className="text-secondary-600" />
              <span className="text-2xl font-julius text-primary-950">{value}</span>
            </div>
            <p className="text-xs font-montserrat text-gray-500">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="text-lg font-julius text-primary-950 mb-4">Content Sections</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-secondary-300 transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-secondary-50 group-hover:bg-secondary-100 transition-colors">
                <Icon size={18} className="text-secondary-700" />
              </div>
              <h3 className="font-julius text-primary-950 text-sm">{label}</h3>
            </div>
            <p className="text-xs font-montserrat text-gray-400">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
