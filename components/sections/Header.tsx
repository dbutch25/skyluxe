"use client";
import headerData from "@/data/header.json";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { images } from "@/constants";
import { FaX } from "react-icons/fa6";
import {FaAlignJustify, FaEnvelope, FaPhone} from "react-icons/fa";
import { usePathname } from "next/navigation";

export const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const pathname = usePathname();
    const isSanityStudio = pathname.startsWith("/studio");

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    const toggleSubMenu = (index: number) => {
        setOpenSubMenu((prev) => (prev === index ? null : index));
    };

    const handleSubMenuItemClick = () => {
        setOpenSubMenu(null);
        closeMenu();
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        const menuElement = document.getElementById("main-menu");
        const submenuElements = document.querySelectorAll(".submenu");

        if (
            menuElement &&
            !menuElement.contains(event.target as Node) &&
            !Array.from(submenuElements).some((submenu) =>
                submenu.contains(event.target as Node)
            )
        ) {
            setOpenSubMenu(null);
        }
    }, []);

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

        document.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

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
                    <ul
                        id="main-menu"
                        className={`flex flex-col duration-300 lg:flex-row absolute right-0 bg-primary-50 w-screen h-screen lg:h-fit lg:w-fit lg:top-0 lg:relative lg:bg-transparent gap-6 justify-center items-center ${
                            showMenu ? "top-0" : "-top-[100vh]"
                        } `}
                    >
                        {headerData.header.map((item, index) => (
                            <li
                                key={index}
                                className={`text-primary-950 text-base uppercase relative ${
                                    item.subItems ? "lg:cursor-pointer" : ""
                                }`}
                            >
                                <div className="relative z-10 flex items-center">
                                    <Link href={item.href} onClick={closeMenu}>
                                        {item.label}
                                    </Link>
                                    {item.subItems && (
                                        <span
                                            className="ml-2 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSubMenu(index);
                                            }}
                                        >
            {openSubMenu === index ? "▲" : "▼"}
        </span>
                                    )}
                                </div>

                                {item.subItems && (
                                    <div
                                        className={`submenu absolute left-0 top-full mt-2 bg-white shadow-md border rounded-md w-48 transition-transform duration-300 z-20 ${
                                            openSubMenu === index ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                                        }`}
                                    >
                                        <ul className="flex flex-col gap-2 p-4">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li
                                                    key={subIndex}
                                                    className="text-primary-950 text-sm hover:text-secondary-500"
                                                    onClick={handleSubMenuItemClick}
                                                >
                                                    <Link href={subItem.href}>{subItem.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}

                        <li className="lg:hidden" onClick={closeMenu}>
                            <Link href="/quote"
                                  className="tracking-widest border-2 border-secondary-800 px-7 py-3 text-secondary-800 rounded hover:text-primary-50 hover:border-none hover:bg-primary-700">
                                Request A Quote
                            </Link>
                        </li>
                    </ul>

                    <div className="lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-primary-950 z-20 relative"
                        >
                            {showMenu ? <FaX size={30}/> : <FaAlignJustify size={30}/>}
                        </button>
                    </div>

                    <Link href="/quote"
                          className="hidden uppercase sm:block tracking-widest border-2 border-secondary-800 px-7 py-3 text-secondary-800 rounded hover:text-primary-50 hover:border-none hover:bg-primary-700">
                        Request A Quote
                    </Link>
            </div>
            <div
                className="hidden py-2 lg:inline bg-primary-50 font-montserrat border-b-2 px-6 rounded-b-sm transition-all duration-300 ease-in-out absolute z-20 opacity-95 right-0 top-[112px]">
                <div
                    className="flex items-center gap-2 font-montserrat text-left text-sm text-gray-700"
                    >
                        <FaPhone
                            size={10}
                            className="text-secondary-600 min-w-3 min-h-3"
                        />
                        <Link href="tel:+16476295893" className="hover:underline pr-2 border-r-2 border-secondary-800">
                            (647) 629 5893
                        </Link>
                        <FaEnvelope
                            size={10}
                            className="pl-2 text-secondary-600 min-w-5 min-h-5"
                        />
                        <Link href="mailto:info@syluxeroofing.com"
                              className="hover:underline">
                            info@skyluxeroofing.com
                        </Link>
                    </div>

                </div>


            </header>

        </>

    )
        ;
};

export default Header;
