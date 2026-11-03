import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import PageLoader from "@/components/elements/PageLoader";
import { ReactNode } from "react";
import { fetchNavServices } from "@/lib/data";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const navServices = await fetchNavServices();
  return (
    <>
      <PageLoader />
      <Header services={navServices} />
      <main>{children}</main>
      <Footer />
    </>
  );
}