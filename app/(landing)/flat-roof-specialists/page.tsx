"use client";

import LandingPageForm from '@/components/elements/LandingPageForm'
import Marquee from '@/components/elements/Marquee'
import { carouselMImages } from '@/data/marqueeImages';
import React from 'react'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const primaryFeatures = [


  {
    name: 'Flat Roof Installation',
    description:
      'Expert flat roof installation with durable materials designed to protect your property for decades.',
    href: '#',
    link:'Get a Free Quote',
    imageUrl:'/images/repairs.jpg'
  },
  {
    name: 'Roof Repairs & Maintenance',
    description:
      'Reliable flat roof repairs & maintenance plans with upgrades to your commercial roof with modern designs & systems for improved durability, efficiency, and protection.',
    href: '#',
    link: 'Book a Repair',
    imageUrl:'/images/LPTAB2.jpeg'

  },
  {
    name: 'Industrial Roofing',
    description:
      'Preferred choice for commercial properties with high exposure to weather conditions, safegaurding your assets with exceptional materials and an experiences team of professionals.',
    href: '#',
    link: 'Request a Quote',
    imageUrl:'/images/repairs.jpg'

  },
];

const FlatRoofSpecialistPage = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // For smooth scrolling
        });
      };

  return (
    <div className='bg-primary-50 max-w-full px-5 md:px-10 lg:px-20 mx-auto py-40'>
        <div className='flex md:flex-row flex-col items-center justify-center gap-10'>
            <div className='w-full min-w-[400px]'>
                <div className='flex flex-col justify-start items-start'>
                    <p className='text-sm font-bold font-montserrat text-secondary-600 mb-6 tracking-widest'>//  ICI ROOFING  //</p>
                    <h1 className='text-3xl font-julius text-primary-950 max-w-4xl mx-auto mb-6'>Trusted Flat Roofing Contractors in the GTA</h1>
                    <ul className="list-disc pl-6 space-y-2 font-semibold font-montserrat text-lg  text-gray-700 mb-6">
                        <li>Expert roof replacements, repairs & new construction</li>
                        <li>Premium materials with long-lasting performance</li>
                        <li>Safety-first approach & minimal business disruption</li>
                        <li>Serving property managers, institutions & contractors</li>
                    </ul>
                    <div>
                        <p className="text-base font-semibold font-montserrat text-primary-800">
                           * Fill out the form to request your free roofing quote today
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full min-w-[400px] relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0">
                    <img
                    src="/images/repairs.jpg"
                    alt="Roof repair background"
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" /> 
                </div>

                <div className="relative z-10 flex justify-center items-center min-h-[600px] p-6 rounded-3xl">
                    <LandingPageForm />
                </div>
            </div>

        </div>
        <Marquee images={carouselMImages}/>
        <section className="bg-gray-50 mx-auto w-full px-6 sm:mt-16 lg:px-8 py-20">
  <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
    {primaryFeatures.map((feature) => (
      <div
        key={feature.name}
        className="relative w-full h-full flex flex-col rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:-translate-y-1"
        style={{
          backgroundImage: `url(${feature.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-8 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col justify-between h-full">
          <h3 className="text-2xl font-julius font-semibold text-primary-950 mb-3">
            {feature.name}
          </h3>
          <p className="text-gray-900 leading-relaxed mb-6 font-montserrat">
            {feature.description}
          </p>
          <button
            onClick={scrollToTop}
            className="flex justify-center items-center font-semibold bg-secondary-700 text-white px-6 py-2 rounded-lg font-base font-montserrat hover:bg-secondary-900 transition"
          >
            {feature.link}
        
            <FaArrowUpRightFromSquare className="ml-2" />
          </button>
        </div>
      </div>
    ))}
  </div>
</section>
    </div>
    
  )
}

export default FlatRoofSpecialistPage