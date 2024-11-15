import { AboutUs, HomeGallery, BgHomeVideo, ServiceSlider } from "@/components";

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

