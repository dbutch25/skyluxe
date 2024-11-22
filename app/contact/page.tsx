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
            <div className="container flex flex-col-reverse lg:flex-row py-20">
                <div
                    className='w-full lg:min-w-[500px] h-auto py-6 flex items-center justify-center flex-col bg-primary-50 shadow-lg rounded-lg'>
                    <div className="w-full flex flex-col gap-14 justify-evenly items-center">
                        <div
                            className="flex flex-col justify-center w-4/5 py-2 h-auto border-2 rounded-2xl shadow-lg items-center bg-primary-100">
                            <div className="flex items-center justify-center h-full">
                                <FaPhone size={25} className="pl-5 min-w-11 min-h-11 text-secondary-500"/>
                            </div>
                            <h3 className="font-julius text-base text-secondary-900">
                                Phone Number
                            </h3>
                            <Link href="tel:+16476295893"
                                  className="font-montserrat text-sm text-primary-950 hover:underline">
                                (647) 629 5893
                            </Link>
                        </div>
                        <div
                            className="flex flex-col justify-center w-4/5 py-2 h-auto border-2 rounded-2xl shadow-lg items-center bg-primary-100">
                            <div className="flex items-center justify-center h-full">
                                <FaEnvelope size={25} className="pl-5 min-w-11 min-h-11 text-secondary-500"/>
                            </div>
                            <h3 className="font-julius text-base text-secondary-900">
                                Email
                            </h3>
                            <Link href="mailto:info@syluxeroofing.com"
                                  className="font-montserrat text-sm text-primary-950 hover:underline">
                                info@syluxeroofing.com
                            </Link>
                        </div>
                        <div
                            className="flex flex-col justify-center w-4/5 py-2 h-auto border-2 rounded-2xl shadow-lg items-center bg-primary-100">
                            <div className="flex items-center justify-center h-full">
                                <FaLocationArrow size={25} className="pl-5 min-w-11 min-h-11 text-secondary-500"/>
                            </div>
                            <h3 className="font-julius text-base text-secondary-900">
                                Location
                            </h3>
                            <Link href="https://www.google.com/maps/place/1941+Mattawa+Ave,+Mississauga,+ON,+Canada"
                                  target="_blank" aria-label="Address Location"
                                  className="font-montserrat text-sm text-primary-950 hover:underline">
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