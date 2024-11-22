import ContactForm from "@/components/elements/ContactForm";
import {FaEnvelope, FaLocationArrow, FaPhone} from "react-icons/fa"
import Link from "next/link";
import React from "react";


const ContactPage = () => {
    return (
        <>
            <div className="text-3xl font-julius text-primary-950 text-center pt-40">
                <h1 className="inline border-b-2 border-primary-800">Let's Connect</h1>
            </div>
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 py-20">
                <div
                    className=' px-5 w-full h-[485px] flex gap-10 items-center justify-center flex-col bg-primary-50 shadow-lg rounded-lg'>
                    <div
                        className="w-full px-5 h-28 border-2 rounded-2xl shadow-lg flex gap-6 items-center bg-primary-100">
                        {/* Icon Container */}
                        <div className="flex items-center justify-center h-full">
                            <FaPhone size={25} className="pl-5 min-w-11 min-h-11 text-secondary-500"/>
                        </div>

                        {/* Text Container */}
                        <div className="flex flex-col items-center justify-center w-full">
                            <h3 className="font-julius text-lg text-secondary-900 mr-5">
                                Phone Number
                            </h3>
                            <Link href="tel:+16476295893"
                                  className="font-montserrat text-base text-primary-950 hover:underline">
                                (647) 629 5893
                            </Link>
                        </div>
                    </div>
                    <div
                        className="w-full px-5 h-28 border-2 rounded-2xl shadow-lg flex gap-6 items-center bg-primary-100">
                        {/* Icon Container */}
                        <div className="flex items-center justify-center h-full">
                            <FaEnvelope size={25} className="pl-5 min-w-11 min-h-11 text-secondary-500"/>
                        </div>

                        {/* Text Container */}
                        <div className="flex flex-col items-center justify-center w-full">
                            <h3 className="font-julius text-lg text-secondary-900 mr-5">
                                Email
                            </h3>
                            <Link href="mailto:info@syluxeroofing.com"
                                  className="font-montserrat text-base text-primary-950 hover:underline p">
                                info@skyluxeroofing.com
                            </Link>
                        </div>
                    </div>
                    <div
                        className="w-full px-5 h-28 border-2 rounded-2xl shadow-lg flex gap-6 items-center bg-primary-100">
                        {/* Icon Container */}
                        <div className="flex items-center justify-center h-full">
                            <FaLocationArrow size={25} className="pl-5 min-w-11 min-h-11 text-secondary-500"/>
                        </div>

                        {/* Text Container */}
                        <div className="flex flex-col items-center justify-center w-full">
                            <h3 className="font-julius text-lg text-secondary-900 mr-5">
                                Location
                            </h3>
                            <Link href="https://www.google.com/maps/place/1941+Mattawa+Ave,+Mississauga,+ON,+Canada"
                                  target="_blank" aria-label="Address Location"
                                  className="font-montserrat text-base text-primary-950 hover:underline pr-5">
                                1941 Mattawa Ave. Mississauga, ON, Canada
                            </Link>
                        </div>
                    </div>
                </div>

                <ContactForm/>
            </div>


        </>
    )
}

export default ContactPage;