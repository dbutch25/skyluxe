import {FaArrowRight} from "react-icons/fa";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {images} from "@/constants";

const CareersPage = () => {
    return (

        <section className="mx-auto">
            <div className="relative w-full h-[60vh]">
                <Image
                    src={images.about2} // Replace with your image path
                    alt="Hero"
                    className="object-cover w-full h-full object-top"
                />
            </div>
            <div className="container">
                <div className="text-center py-10">
                    <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                        <h1 className="inline border-b-2 border-primary-800">Join Our Team</h1>
                    </div>
                    <p className="py-6 font-montserrat text-primary-950 text-base">
                        We have some of the most skilled tradesmen in the Ontario. Skyluxe Roofing and Sheet Metal’s
                        purpose of attracting people of similar values and enabling them to achieve more with their
                        career has created a great culture and work environment.
                    </p>
                </div>


                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="bg-primary-100 px-8 py-6 rounded-3xl border-t-4 border-secondary-400 shadow-lg">
                        <h4 className="font-julius">Roofing Sheet Metal Installer</h4>
                        <div className="font-montserrat flex gap-2 mt-4">
                            <span
                                className="flex items-center gap-1 rounded-full px-2 py-1 bg-secondary-100 border border-primary-50">Etobicoke, ON</span>
                            <span
                                className="flex items-center gap-1 rounded-full px-2 py-1 bg-secondary-100">Full Time</span>
                        </div>
                        <Link href='/careers/'
                              className="font-montserrat mt-6 text-secondary-800 flex items-center gap-3 hover:text-secondary-400">
                            Apply<FaArrowRight/>
                        </Link>

                    </div>
                    <div className="bg-primary-100 px-8 py-6 rounded-3xl border-t-4 border-secondary-400 shadow-lg">
                        <h4 className="font-julius">Roofing Shingler</h4>
                        <div className="font-montserrat flex gap-2 mt-4">
                            <span
                                className="flex items-center gap-1 rounded-full px-2 py-1 bg-secondary-100 border border-primary-50">Etobicoke, ON</span>
                            <span
                                className="flex items-center gap-1 rounded-full px-2 py-1 bg-secondary-100">Freelance, Full Time</span>
                        </div>
                        <Link href="/careers/"
                              className="font-montserrat mt-6 text-secondary-800 flex items-center gap-3 hover:text-secondary-400">
                            Apply<FaArrowRight/>
                        </Link>

                    </div>
                    <div className="bg-primary-100 px-8 py-6 rounded-3xl border-t-4 border-secondary-400 shadow-lg">
                        <h4 className="font-julius">Roofer</h4>
                        <div className="font-montserrat flex gap-2 mt-4">
                            <span
                                className="flex items-center gap-1 rounded-full px-2 py-1 bg-secondary-100 border border-primary-50">Etobicoke, ON</span>
                            <span
                                className="flex items-center gap-1 rounded-full px-2 py-1 bg-secondary-100">Full Time, Permanent</span>
                        </div>
                        <Link href="/careers/"
                              className="font-montserrat mt-6 text-secondary-800 flex items-center gap-3 hover:text-secondary-400">
                            Apply<FaArrowRight/>
                        </Link>

                    </div>
                </div>
                <p className="font-montserrat text-primary-950 text-base text-center p-20">
                    Interested in joining the family? E-mail your resume to <span
                    className="hover:text-secondary-400"><Link
                    href="mailto:info@skyluxeroofing.com">info@skyluxeroofing.com</Link></span> for employment
                    opportunities.
                </p>
            </div>
        </section>
    )
}

export default CareersPage;