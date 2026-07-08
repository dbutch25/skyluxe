import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import PageLoader from "@/components/elements/PageLoader";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageLoader />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}