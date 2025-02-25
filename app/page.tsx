"use client";

import BgHomeVideo from "@/components/layouts/BgHomeVideo";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Testimonials from "@/components/sections/Testimonials";

const AboutUs = dynamic(() => import("@/components/sections/AboutUs"));
const ServiceSlider = dynamic(() => import("@/components/sections/ServiceSlider"));
const HomeGallery = dynamic(() => import("@/components/sections/HomeGallery"));

const Home = () => {
    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <main className="no-scrollbar">
            {/* Animated Background Video */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <BgHomeVideo />
            </motion.div>

            {/* Animated Sections */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <AboutUs />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <ServiceSlider />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <HomeGallery />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <Testimonials />
            </motion.div>
        </main>
    );
};

export default Home;
