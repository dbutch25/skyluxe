"use client";
import headerData from "@/data/header.json";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/constants";
import { FaX } from "react-icons/fa6";
import { FaAlignJustify } from "react-icons/fa";
import { usePathname } from "next/navigation";

export const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null); // Track which sub-menu is open
    const pathname = usePathname();
    const isSanityStudio = pathname.startsWith("/studio");

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    const toggleSubMenu = (index: number) => {
        setOpenSubMenu((prev) => (prev === index ? null : index)); // Toggle sub-menu
    };

    const handleSubMenuItemClick = () => {
        setOpenSubMenu(null); // Close submenu
        closeMenu(); // Close main menu on mobile
    };

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true); // Scrolling up
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
        <header
            className={`select-none bg-primary-100 font-montserrat flex justify-between border-b-2 border-primary-4000 items-center px-6 w-full transition-all duration-300 ease-in-out ${
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
                        className="transition-all duration-300"
                    />
                </Link>

                {/* Main Navigation */}
                <ul
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
                            <div
                                className="relative z-10 flex items-center"
                                onClick={() => (item.subItems ? toggleSubMenu(index) : closeMenu())}
                            >
                                <Link href={item.href}>{item.label}</Link>
                                {/* Indicator for sub-items */}
                                {item.subItems && (
                                    <span className="ml-2">{openSubMenu === index ? "▲" : "▼"}</span>
                                )}
                            </div>

                            {/* Sub-menu */}
                            {item.subItems && (
                                <div
                                    className={`absolute left-0 top-full mt-2 bg-white shadow-md border rounded-md w-48 transition-transform duration-300 z-20 ${
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

                    {/* "Request A Quote" Button for Mobile */}
                    <li className="lg:hidden" onClick={closeMenu}>
                        <button className="tracking-widest border-2 border-secondary-800 px-7 py-3 text-secondary-800 rounded hover:text-primary-50 hover:border-none hover:bg-primary-700">
                            Request A Quote
                        </button>
                    </li>
                </ul>

                {/* "Menu" Button for Mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-primary-950 z-20 relative"
                    >
                        {showMenu ? <FaX size={35} /> : <FaAlignJustify size={35} />}
                    </button>
                </div>

                {/* "Request A Quote" Button for Desktop */}
                <button className="hidden uppercase sm:block tracking-widest border-2 border-secondary-800 px-7 py-3 text-secondary-800 rounded hover:text-primary-50 hover:border-none hover:bg-primary-700">
                    Request A Quote
                </button>
            </div>
        </header>
    );
};

export default Header;
