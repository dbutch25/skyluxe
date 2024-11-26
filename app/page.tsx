import BgHomeVideo from "@/components/layouts/BgHomeVideo";
import dynamic from "next/dynamic";

const AboutUs = dynamic(() => import("@/components/sections/AboutUs"));
const ServiceSlider = dynamic(() => import("@/components/sections/ServiceSlider"));
const HomeGallery = dynamic(() => import("@/components/sections/HomeGallery"));

const Home = () => {
    return (
        <main className="no-scrollbar">
            <BgHomeVideo />
            <AboutUs />
            <ServiceSlider />
            <HomeGallery />
        </main>
    );
};

export default Home;
