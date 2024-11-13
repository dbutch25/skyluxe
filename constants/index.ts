import logo from "@/public/images/Skyluxe_Logo.png"
import menuBar from "@/public/svg/bars-solid.svg"
import closeMenu from "@/public/svg/x-solid.svg"
import homeImage from "@/public/images/home.jpg"
import gaf from "@/public/images/gafLogo.png"
import knudson1 from "@/public/images/knudson1.jpg"
import serviceHero from "@/public/images/serviceHero.jpg"
import about1 from "@/public/images/about1.jpg"
import about2 from "@/public/images/about2.jpg"

// import homeVideo from "@/public/videos/WebsiteIntro.mp4"

export const images = {
    logo,
    menuBar,
    closeMenu,
    homeImage,
    gaf,
    knudson1,
    serviceHero,
    about1,
    about2
};

export const claddingGallery = [
    homeImage,
    knudson1,
    about2,
    about1,
    serviceHero,
    gaf
]

export const carouselImages = [
    homeImage,
    gaf,
    knudson1,
];

export const videos = {
    // homeVideo,
}

export const sliderImages = [
    {
        bg: homeImage,
        logo: homeImage,
    },
    {
        bg: knudson1,
        logo: knudson1,
    },
    {
        bg: gaf,
        logo: gaf,
    },
    {
        bg: homeImage,
        logo: homeImage,
    },
    {
        bg: knudson1,
        logo: knudson1,
    },
];

export const projects = [
    {
        title: "Project One",
        image: images.homeImage,
        link: "/projects/project-one",
    },
    {
        title: "Project One",
        image: images.homeImage,
        link: "/projects/project-one",
    },
    {
        title: "Project One",
        image: images.homeImage,
        link: "/projects/project-one",
    },
    {
        title: "Project One",
        image: images.homeImage,
        link: "/projects/project-one",
    }
]

// Example services data
export const services  = [
    {
        title: "Roof Installation",
        description: "We provide high-quality roof installation services using the best materials available.",
        image: images.knudson1,
        category: "Residential",
        path: "/services/residential-roofing",
    },
    {
        title: "Roof Installation",
        description: "We provide high-quality roof installation services using the best materials available.",
        image: images.homeImage,
        category: "ICI",
        path: "/services/residential-roofing",
    },
    {
        title: "Roof Repair",
        description: "Our team specializes in repairing all types of roofs, ensuring durability and quality.",
        image: images.homeImage,
        category: "Repairs & Maintenance",
        path: "/services/residential-roofing",
    },
    {
        title: "Gutter Installation",
        description: "We offer professional gutter installation services to protect your home from water damage.",
        image: images.homeImage,
        category: "Waterproofing",
        path: "/services/residential-roofing",
    },
    {
        title: "Roof Inspection",
        description: "Our thorough roof inspection services help identify potential issues before they become problems.",
        image: images.homeImage,
        category: "Architectural Cladding",
        path: "/services/residential-roofing",
    },
];
