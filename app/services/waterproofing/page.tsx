import Accordion from "@/components/elements/Accordion";
import React from "react";
import {claddingGallery} from "@/constants";
import ServicePagesGallery from "@/components/layouts/ServicePagesGallery";
import {Marquee} from "@/components";

const accordionItems = [
    {
        title: "Foundation",
        content: "We specialize in providing below grade waterproofing systems for Conventional, Blindside and Tanked systems. These assemblies can be installed in various ways from Torch Applied, Self-Adhered, Liquid Applied, Trowel Applied and Spray Applied."
    },
    {
        title: "Hot Applied Membrane (Hot Rubber)",
        content: "Hot rubber is commonly used for waterproofing roofs, plaza decks and other flat surfaces. It can be applied to both new and existing structures making it a versatile option for a variety of construction and renovation projects."
    },
    {
        title: "Traffic Topping",
        content: "Traffic toppings are a type of flooring material that is designed to withstand heavy foot and vehicular traffic. They are commonly used in residential, commercial and industrial settings such as parking garages, loading docks, warehouses, roofs and roads where durability and resistance to wear and tear are important considerations. Types of products include Polyurethane, Epoxy, Cementitious and PMMA/PUMA."
    },
    {
        title: "Sealer",
        content: "Application of sealer on surfaces such as slabs on grade, balconies and service rooms."
    },
    {
        title: "Cementitious Applications",
        content: "Cementitious waterproofing for stormwater tanks, elevator pits, sump pits."
    },
    {
        title: "Leak Injections and Repairs ",
        content: "Leak repairs on a new or existing foundation is common, the application refers to the process of identifying and fixing any leaks or water infiltration issues in a building’s foundation. Types of products used are either Polyurethane/Epoxy Injections, Cementitious coating and cement/chemical grouting depending on the conditions."
    },
]

const WaterproofingPage = () => {
    return (
        <>
            <section className="container pt-40 mx-auto">
                <div className="pb-10">
                    <div className="text-3xl font-julius text-primary-950 text-center pb-5">
                        <h1 className="inline border-b-2 border-primary-800">Waterproofing</h1>
                    </div>
                    <p className="text-lg text-center font-montserrat text-gray-600">
                        Skyluxe Waterproofing specializes in all building envelope restoration and below & above grade
                        waterproofing systems.
                    </p>
                </div>
                <div className="py-10">
                    <Accordion items={accordionItems}/>
                </div>
                <div className="py-10">
                    <ServicePagesGallery images={claddingGallery}/>
                </div>
                <div className="pb-20 pt-10">
                    <h3 className="text-center text-primary-950 font-julius text-lg">Manufacturers</h3>
                    <Marquee images={claddingGallery}/>
                </div>
            </section>
            H
        </>
    )
}

export default WaterproofingPage;