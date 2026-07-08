import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");  // ← updated path

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}