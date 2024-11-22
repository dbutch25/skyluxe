import { FaCircleCheck } from 'react-icons/fa6';
import Link from "next/link";
import Image from "next/image";
import {images} from "@/constants";

const ResidentialRoofing = () => {
    return (
        <>
            <div className="relative w-full h-[40vh]">
                <Image
                    src={images.serviceHero}
                    alt="Hero"
                    layout="fill"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h1 className="text-primary-50 inline border-b-2 border-primary-50 text-3xl font-julius pt-16">Our Services</h1>
                </div>
            </div>
            <div className="lg:pl-[20%]">
                <div className="below-md:container pt-16 lg:px-[10%] w-full max-w-full bg-primary-100 mx-auto relative">
                    <div className="text-left font-julius text-2xl">
                        <h2>Residential Roofing</h2>
                    </div>
                    <div className="max-w-12 w-full border-b-4 border-secondary-900 pt-3"/>
                    <div className="text-base font-montserrat text-primary-950 pt-3">
                        <p>
                        Our residential roofing services cover new construction installations, roof replacements,
                            and
                            repairs bringing commercial grade expertise and materials to residential projects while
                            adhering
                            to industry standards for durability and aesthetics.
                        </p>
                    </div>

                    <div className="container mx-auto p-4">
                        {/* Row 1 */}
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4 py-10 font-montserrat text-sm">
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Flat
                                    Roofing
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Cedar
                                    Shingles
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Skylight
                                    Installation
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Asphalt
                                    Shingles
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Custom
                                    Metalwork
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Natural
                                    Slate Tiles
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Cedar
                                    Shakes
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Metal
                                    Roofing/Gutters
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Synthetic
                                    Slate Tiles
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex w-full uppercase font-montserrat flex-col md:flex-row">
                    <div className="md:w-1/2 h-[150px] w-full bg-primary-800 flex items-center justify-center">
                        <Link href="/residential-roofing"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Learn More
                        </Link>
                    </div>
                    <div className="md:w-1/2 h-[150px] w-full bg-secondary-800 flex items-center justify-center">
                        <Link href="/quote"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Free Quote
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:pr-[20%]">
                <div className="below-md:container lg:px-[10%] pt-16 w-full max-w-full bg-primary-100 mx-auto relative">
                    <div className="text-left font-julius text-2xl">
                        <h2>Waterproofing</h2>
                    </div>
                    <div className="max-w-12 w-full border-b-4 border-secondary-900 pt-3"/>
                    <div className="text-base font-montserrat text-primary-950 pt-3">
                        <p>
                            Skyluxe Waterproofing offers building envelope restoration and waterproofing, specializing
                            in below- and above-grade systems. Services include foundation waterproofing, hot rubber
                            applications for roofs, durable traffic toppings for high-use areas, and leak repairs. We
                            also provide sealers for surfaces and cementitious waterproofing for tanks and pits,
                            ensuring comprehensive protection.
                        </p>
                    </div>

                    <div className="container mx-auto p-4">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4 py-10 font-montserrat text-sm">
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Foundation
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Hot
                                    Membrane(Applied)
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Traffic
                                    Topping
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Sealer
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Cementitous
                                    Application
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Leak
                                    Injections and Repairs
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex w-full uppercase font-montserrat flex-col md:flex-row">
                    <div className="md:w-1/2 h-[150px] w-full bg-primary-800 flex items-center justify-center">
                        <Link href="/waterproofing"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Learn More
                        </Link>
                    </div>
                    <div className="md:w-1/2 h-[150px] w-full bg-secondary-800 flex items-center justify-center">
                        <Link href="/quote"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Free Quote
                        </Link>
                    </div>
                </div>

            </div>
            <div className="lg:pl-[20%]">
                <div className="below-md:container lg:px-[10%] pt-16 w-full max-w-full bg-primary-100 mx-auto relative">
                    <div className="text-left font-julius text-2xl">
                        <h2>ICI Roofing</h2>
                    </div>
                    <div className="max-w-12 w-full border-b-4 border-secondary-900 pt-3"/>
                    <div className="text-base font-montserrat text-primary-950 pt-3">
                        <p>
                            Skyluxe Roofing and Sheet metal is a full service ICI roofing contractor specializing in
                            roof replacements, new construction installation, roof repairs and maintenance services. Our
                            commitment to quality ensures you the best client experience by providing the most accurate
                            and valuable solutions for your buildings using premium materials and superior workmanship.
                        </p>
                    </div>

                    <div className="container mx-auto p-4">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4 py-10 font-montserrat text-sm">
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>BUR
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>SBS
                                    Modified Bitumen
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Thermoplastic
                                    Membrane
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>SEBS
                                    Modified Bitumen
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Cold
                                    Applied Modified Bitumen
                                    Metalwork
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>EPDM
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Inverted
                                    Roof Systems
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>MGreen
                                    Roof Systems
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex w-full uppercase font-montserrat flex-col md:flex-row">
                    <div className="md:w-1/2 h-[150px] w-full bg-primary-800 flex items-center justify-center">
                        <Link href="/ICI"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Learn More
                        </Link>
                    </div>
                    <div className="md:w-1/2 h-[150px] w-full bg-secondary-800 flex items-center justify-center">
                        <Link href="/quote"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Free Quote
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:pr-[20%]">
                <div className="below-md:container lg:px-[10%] pt-16 w-full max-w-full bg-primary-100 mx-auto relative">
                    <div className="text-left font-julius text-2xl">
                        <h2>Architectural Cladding</h2>
                    </div>
                    <div className="max-w-12 w-full border-b-4 border-secondary-900 pt-3"/>
                    <div className="text-base font-montserrat text-primary-950 pt-3">
                        <p>
                            Skyluxe Roofing and Sheet Metal is well versed in many different cladding applications. We
                            have a large sheet metal shop which is equipped with top of the line sheet metal equipment.
                        </p>
                    </div>

                    <div className="container mx-auto p-4">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4 py-10 font-montserrat text-sm">
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Standing
                                    Seam Panels
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Corrugated
                                    Siding
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Insulated
                                    Wall Panels(IMP)
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Custom
                                    Sheet Metal Fabrication & Installation
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Wood
                                    Panels
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Zinc
                                    Panels
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Copper &
                                    Exotic Metal Work
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Aluminum
                                    Composite Panels(ACM Panels)
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Fibre
                                    Cement Panels
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Wood
                                    Siding
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Composite
                                    Siding
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Concrete
                                    Panels
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex w-full uppercase font-montserrat flex-col md:flex-row">
                    <div className="md:w-1/2 h-[150px] w-full bg-primary-800 flex items-center justify-center">
                        <Link href="/architectural-cladding"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Learn More
                        </Link>
                    </div>
                    <div className="md:w-1/2 h-[150px] w-full bg-secondary-800 flex items-center justify-center">
                        <Link href="/quote"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Free Quote
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:pl-[20%] pb-24 border-b-2 border-primary-200">
                <div className="below-md:container lg:px-[10%] pt-16 w-full max-w-full bg-primary-100 mx-auto relative">
                    <div className="text-left font-julius text-2xl">
                        <h2>Repairs & Maintenance</h2>
                    </div>
                    <div className="max-w-12 w-full border-b-4 border-secondary-900 pt-3"/>
                    <div className="text-base font-montserrat text-primary-950 pt-3">
                        <p>
                            Skyluxe offers expert roof repairs and 24-hour emergency services, along with comprehensive asset management and preventative maintenance programs. Using techniques like infrared moisture detection, our services include HVAC cone installation, skylight setup, moisture testing, and regular inspections with detail reports to extend roof lifespan and address issues early.
                        </p>
                    </div>

                    <div className="container mx-auto p-4">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4 py-10 font-montserrat text-sm">
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>24HR Emergency Service
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>HVAC & Mechanical Cone Installation
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Retro-Fit Curb Installation
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Destructive & Non-Destructive Moisture testing
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Roof inspections, Evaluations & Reports
                                </li>
                            </ul>
                            <ul>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Skylight Installation
                                </li>
                                <li className="mb-2"><FaCircleCheck className="inline mr-2 text-secondary-500"/>Semi-Annual Preventative Maintenance Programs
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex w-full uppercase font-montserrat flex-col md:flex-row">
                    <div className="md:w-1/2 h-[150px] w-full bg-primary-800 flex items-center justify-center">
                        <Link href="/repairs"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Learn More
                        </Link>
                    </div>
                    <div className="md:w-1/2 h-[150px] w-full bg-secondary-800 flex items-center justify-center">
                        <Link href="/quote"
                              className="tracking-widest border-2 border-primary-50 px-7 py-3 text-white rounded hover:bg-primary-700">
                            Free Quote
                        </Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ResidentialRoofing;
