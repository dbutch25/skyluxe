"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/constants";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-1000 ease-out">
      <div className="mb-4">
        <Image
          src={images.logo}
          alt="Skyluxe Roofing"
          width={300}
          height={300}
          style={{ height: "auto" }}
          loading="eager"
          priority
          className="animate-pulse"
        />
      </div>
      <div className="w-10 h-10 border-4 border-t-white border-gray-400 rounded-full animate-spin" />
    </div>
  );
}
