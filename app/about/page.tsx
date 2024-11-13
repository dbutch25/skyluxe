import Image from "next/image"
import {images} from "@/constants";
import {RiArrowRightDoubleLine} from "react-icons/ri";
import React from "react";

const AboutPage = () => {
    return (
        <section className="flex flex-col items-center">
            {/* Hero Section */}

            <div className="mt-20 relative w-full h-[60vh]">
                <Image
                    src={images.about2} // Replace with your image path
                    alt="Hero"
                    className="object-cover w-full h-full object-top"
                />
            </div>
            <div className="container">

                {/* Title and Excerpt */}
                <div>
                    <div className="text-center py-8 md:py-12">
                        <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                            <h1 className="inline border-b-2 border-primary-800">About Us</h1>
                        </div>
                        <p className="text-base font-montserrat text-primary-950 mt-4 mx-auto">
                            The concept behind Skyluxe Roofing and Sheet Metal originated from the founder’s undivided
                            desire to challenge the status quo within the roofing industry. Founded on the overriding
                            core
                            principles of customer service and quality.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <ul className="flex flex-col gap-6 list-none md:w-[80%] text-sm font-montserrat">
                            <li className="flex items-center text-primary-900">
                        <span className="w-[50px] flex-shrink-0 flex items-center justify-center">
                            <RiArrowRightDoubleLine className="text-secondary-500" size={24}/>
                        </span>
                                <p className="ml-2">
                                    In everything we do, we believe in challenging perfection. This is facilitated by
                                    creating and promoting an environment in which team-members share common goals,
                                    perspectives, and moral values. An environment which is not only intended for growth
                                    in a career but also to grow together as human beings and as a family.
                                </p>
                            </li>
                            <li className="flex items-center text-primary-900">
                        <span className="w-[50px] flex-shrink-0 flex items-center justify-center">
                            <RiArrowRightDoubleLine className="text-secondary-500" size={24}/>
                        </span>
                                <p className="ml-2">
                                    Having worked with some of the best architects, builders, and designers in Canada,
                                    we know what it takes to bring the vision to life. The exterior design elements are
                                    usually brought to us by architects and designers, then we make any necessary
                                    adjustments to ensure it also works functionally. Waterproofing principles must
                                    always be followed to protect the investment. This is where our experience brings
                                    value.
                                </p>
                            </li>
                            <li className="flex items-center text-primary-900">
                        <span className="w-[50px] flex-shrink-0 flex items-center justify-center">
                            <RiArrowRightDoubleLine className="text-secondary-500" size={24}/>
                        </span>
                                <p className="ml-2">
                                    We have a team of skilled specialists experienced at streamlining the process of any
                                    project, which in turn, maximizes efficiency, and we pass on those savings to our
                                    clients.
                                </p>
                            </li>
                            <li className="flex items-center text-primary-900">
                        <span className="w-[50px] flex-shrink-0 flex items-center justify-center">
                            <RiArrowRightDoubleLine className="text-secondary-500" size={24}/>
                        </span>
                                <p className="ml-2">
                                    Our management system provides for unrivaled client engagement. The project manager
                                    keeps in constant contact throughout the project, instantly addressing any issues
                                    that may arise and proactively communicating project progress.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Image and Team Section */}
                <div className="text-3xl font-julius text-primary-950 text-center pt-20 pb-5">
                    <h2 className="inline border-b-2 border-primary-800">Our Team</h2>
                </div>
                <div className="flex flex-col lg:flex-row items-center py-8 gap-8">

                    {/* Left Side Image */}
                    <div className="w-full h-64 md:h-full">
                    <Image
                            src={images.about1} // Replace with your image path
                            alt="Our Team"
                            width={400}
                            height={600}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>

                    {/* Right Side Team Members */}
                    <div className="w-full flex flex-col justify-start space-y-6">
                        <div className="border-b pb-4">
                            <h3 className="text-xl font-julius text-primary-900">
                                Mark Goncalves
                            </h3>
                            <h4 className="text-sm font-montserrat text-primary-800 pb-3">
                                President
                            </h4>
                            <p className="text-primary-950 font-montserrat text-base">Mark is responsible for managing
                                all daily operations of the
                                company. He will also monitor your project with the management team from the initial
                                evaluation/consultation to the end and ensure every aspect of the project gets completed
                                properly. Mark resides in Etobicoke, Ontario and in his spare time you could find him on
                                the golf course or in the gym.</p>
                        </div>
                        <div className="border-b pb-4">
                            <h3 className="text-xl font-julius text-primary-900">
                                Jerry Stasicki
                            </h3>
                            <h4 className="text-sm font-montserrat text-primary-800 pb-3">
                                Vice President
                            </h4>
                            <p className="text-primary-950 font-montserrat text-base">Jerry estimates, consults, and
                                manages all projects. Jerry is
                                involved with the initial client consultation to determine the necessary details and
                                requirements and then sends out proposals accordingly. He works directly with many
                                builders
                                and architects. He is also involved with the management of these projects to ensure that
                                the
                                initial proposal meets or exceeds all client’s and manufacturer’s expectations. With
                                Jerry,
                                you are promised an honest assessment of your property or build, detailed
                                recommendations to
                                address any issues, followed by a perfect execution</p>
                        </div>
                        <div className="border-b pb-4">
                            <h3 className="text-xl font-julius text-primary-900">
                                Felipe Lopez
                            </h3>
                            <h4 className="text-sm font-montserrat text-primary-800 pb-3">
                                Project Manager
                            </h4>
                            <p className="text-primary-950 font-montserrat text-base">
                                Felipe is responsible for scheduling, ordering material and assigning the crews for each
                                project. After the initial proposal gets approved. Felipe will be in touch to schedule
                                the
                                project and address any of the client’s special concerns or requests. He then manages
                                the
                                project and communicates daily with each client.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pt-20 pb-40 w-full flex justify-center items-center flex-col">
                    <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                        <h2 className="inline border-b-2 border-primary-800">Warranties</h2>
                    </div>
                    <p className="text-base font-montserrat text-primary-900 pt-10">
                        We stand behind our workmanship and offer industry leading written warranties of up to 10 years
                        for our work. In addition, we also provide clients with manufacturer warranties for the
                        installed material.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default AboutPage;