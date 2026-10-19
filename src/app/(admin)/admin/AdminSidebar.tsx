"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Layers,
  FolderOpen,
  Wrench,
  Droplets,
  Building2,
  HardHat,
  Home,
  Hammer,
  Star,
  Briefcase,
  Newspaper,
  HeartHandshake,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home Page", icon: Home },
  { href: "/admin/services", label: "Homepage Services", icon: Layers },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/repairs", label: "Repairs", icon: Wrench },
  { href: "/admin/waterproofing", label: "Waterproofing", icon: Droplets },
  { href: "/admin/ici", label: "ICI Roofing", icon: Building2 },
  { href: "/admin/cladding", label: "Cladding", icon: HardHat },
  { href: "/admin/residential", label: "Residential", icon: Home },
  { href: "/admin/restoration", label: "Restoration", icon: Hammer },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/charity", label: "Charity Spotlight", icon: HeartHandshake },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-white font-julius text-lg">Skyluxe CMS</h1>
        <p className="text-white/50 text-xs font-montserrat mt-1">Content Management</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 font-montserrat text-sm transition-colors ${
                active
                  ? "bg-secondary-600 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-white/70 hover:bg-white/10 hover:text-white font-montserrat text-sm transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}