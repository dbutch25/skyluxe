"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { images } from "@/constants";
import {FaPhone} from "react-icons/fa";
import { usePathname } from "next/navigation";

export const LandingPageHeader = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const pathname = usePathname();
    const isSanityStudio = pathname.startsWith("/studio");

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY = currentScrollY;
            setIsSticky(currentScrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (isSanityStudio) return null;

    return (
        <>
            <header
                className={`h-28 bg-primary-100 font-montserrat flex justify-between border-b-2 border-primary-4000 items-center px-6 w-full transition-all duration-300 ease-in-out ${
                    isSticky ? "fixed top-0 z-20 bg-primary-50 shadow-lg" : "absolute z-10 opacity-95"
                } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div className="px-10 flex justify-between w-full items-center py-3">
                    <Link href="/">
                        <Image
                            src={images.logo}
                            alt="Logo"
                            width={200}
                            height={100}
                            className="w-48 sm:w-36 md:w-44 lg:w-52 transition-all duration-300"
                        />
                    </Link>
                    <div                 className="flex items-center justify-center bg-primary-50 font-montserrat  uppercasetracking-widest border-2 border-secondary-800 space-x-2 px-6 py-3 text-secondary-800 rounded hover:text-primary-50 hover:border-none hover:bg-primary-700">

                   <FaPhone
                            size={10}
                            className="text-secondary-600 min-w-3 min-h-3"
                        />
                    <Link href="tel:+16476295893"
                          className="">
                        Call (647)-629-5893
                    </Link>
                    </div>
 
            </div>
            </header>

        </>

    )
        ;
};

export default LandingPageHeader;
