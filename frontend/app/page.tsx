
import BannerSection from "./HomeComponent/BannerSection";
import CompetitionSection from "./HomeComponent/CompetitionSection";
import FeatureSection from "./HomeComponent/FeatureSection";
import HeroImageSection from "./HomeComponent/HeroImageSection";
import InternshipSection from "./HomeComponent/InternshipSection";
import JobSection from "./HomeComponent/JobSection";
import LogoBanner from "./HomeComponent/LogoBanner";
import Practice_jobs from "./HomeComponent/Practice_jobs";
import TestimonialSection from "./HomeComponent/TestimonialSection"

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
          <InternshipSection/>
          <JobSection/>
          {/* <Fetchdata/> */}
          {/* <Practice_jobs/> */}
      </div>
      
    </div>
  );
}
