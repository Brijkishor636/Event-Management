
import BannerSection from "./HomeComponent/BannerSection";
import CompetitionSection from "./HomeComponent/CompetitionSection";
import FeatureSection from "./HomeComponent/FeatureSection";
import HeroImageSection from "./HomeComponent/HeroImageSection";
import LogoBanner from "./HomeComponent/LogoBanner";
import TestimonialSection from "./HomeComponent/TestimonialSection"
import Fetchdata from "./HomeComponent/practice";

export default function Home() {
  return (
    <div className="bg-gradient-to-bl from-gray-100 to-pink-50">
      <div>
          <BannerSection/>
          <TestimonialSection/>
          <LogoBanner/>
          <HeroImageSection/>
          <FeatureSection/>
          <CompetitionSection/>
          {/* <Fetchdata/> */}
      </div>
      
    </div>
  );
}
