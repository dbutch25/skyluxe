// components/Footer.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { images } from '@/constants'; // Adjust the path if needed

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary-50 text-primary-950 pt-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Column 1: Logo */}
                    <div className="flex flex-col items-center">
                        <Link href="/">
                            <Image
                                src={images.logo}
                                alt="Logo"
                                width={375}
                                height={150}
                                className="mb-4"
                            />
                        </Link>
                    </div>

                    {/* Column 2: Contact Info with Title */}
                    <div className="flex flex-col">
                        <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
                        <Link href="https://www.google.com/maps/place/1941+Mattawa+Ave,+Mississauga,+ON,+Canada" target="_blank" aria-label="Address Location" className="mb-2 hover:underline">
                            1941 Mattawa Ave. Mississauga, ON, Canada
                        </Link>
                        <Link href="tel:+1234567890" className="mb-2 hover:underline">
                            Phone: (123) 456-7890
                        </Link>
                        <Link href="mailto:info@example.com" className="hover:underline">
                            Email: info@example.com
                        </Link>
                    </div>

                    {/* Column 3: Map */}
                    <div className="flex flex-col">
                        <h4 className="font-semibold text-lg mb-4">Our Location</h4>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.7285302531!2d-79.6337425845117!3d43.62524887912374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3d33c122ad35%3A0x3c3a2cbbf0ddca93!2s1941%20Mattawa%20Ave%2C%20Mississauga%2C%20ON%20L4X%201K8%2C%20Canada!5e0!3m2!1sen!2sus!4v1614727802147!5m2!1sen!2sus"
                            width="100%"
                            height="150"
                            allowFullScreen={true}
                            loading="lazy"
                            className="rounded-lg shadow-lg"
                            aria-label="Our Location on Map"
                        ></iframe>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-primary-700 pt-8">
                    {/* Services Column */}
                    <div className="flex flex-col">
                        <h4 className="font-semibold text-lg mb-4">Services</h4>
                        <Link href="/" className="mb-1 hover:underline">Residential Roofing</Link>
                        <Link href="/" className="mb-1 hover:underline">ICI Roofing</Link>
                        <Link href="/" className="mb-1 hover:underline">Architectural Cladding</Link>
                        <Link href="/" className="mb-1 hover:underline">Waterproofing</Link>
                        <Link href="/" className="mb-1 hover:underline">Repairs & Maintenance</Link>
                    </div>

                    {/* About Us Column */}
                    <div className="flex flex-col">
                        <h4 className="font-semibold text-lg mb-4">About Us</h4>
                        <Link href="/" className="mb-1 hover:underline">Our Story</Link>
                        <Link href="/" className="mb-1 hover:underline">Our Team</Link>
                        <Link href="/" className="mb-1 hover:underline">Careers</Link>
                    </div>

                    {/* Resources Column */}
                    <div className="flex flex-col">
                        <h4 className="font-semibold text-lg mb-4">Resources</h4>
                        <Link href="/" className="mb-1 hover:underline">Blog</Link>
                        <Link href="/" className="mb-1 hover:underline">Warranties</Link>
                        <Link href="/" className="mb-1 hover:underline">Contact Us</Link>
                    </div>

                    {/* Column 4: Social Icons */}
                    <div className="flex flex-col items-start">
                        <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                                <FaFacebookF className="text-xl hover:text-secondary-400 transition-colors duration-300" />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                                <FaTwitter className="text-xl hover:text-secondary-400 transition-colors duration-300" />
                            </Link>
                            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                                <FaInstagram className="text-xl hover:text-secondary-400 transition-colors duration-300" />
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                                <FaLinkedinIn className="text-xl hover:text-secondary-400 transition-colors duration-300" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center py-4 border-t border-primary-700 mt-8">
                <p>&copy; {new Date().getFullYear()} Skyluxe Roofing & Sheet Metal. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
