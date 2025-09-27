
import Link from "next/link";
import { CardComponent } from "../components/Banner/Card";
import MoreCard from "../components/Banner/MoreCard";


export default function BannerSection() {
  
  return (
    <div className="pt-10 lg:flex">
      <div className="
        hidden sm:block  
        w-full lg:w-1/2         
        lg:flex lg:justify-center lg:items-center 
        px-5 lg:px-20 
        mb-6 lg:mb-0
      ">
        <div>
          <div className="flex lg:flex-col xl:flex">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold pb-2 pr-3 text-blue-900">
              Unlock
            </p>
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold pb-2">
              Your Career
            </span>
          </div>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            Explore opportunities from across the globe to grow, showcase
            skills, gain CV points & get hired by your dream company
          </p>
          <Link href={"/pages/signup"} className="bg-blue-800 text-white font-bold px-5 py-2 rounded-xl cursor-pointer hover:bg-blue-900 transition duration-400">Get Started</Link>
        </div>
      </div>

      
      <div className="w-full lg:w-1/2 p-2 sm:p-4 xl:px-15 md:px-20 lg:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-0 sm:gap-2">
          <CardComponent
            title="Internships"
            desc1="Gain"
            desc2="Practical"
            desc3="Experience"
            imageLink="./intern.webp"
            fromColor="from-fuchsia-200"
            toColor="to-fuchsia-200"
          />
          <CardComponent
            title="Mentorship"
            desc1="Guidance"
            desc2="From Top Mentors"
            desc3=""
            imageLink="./mentors.webp"
            fromColor="from-yellow-200"
            toColor="to-yellow-100"
          />
          <CardComponent
            title="Jobs"
            desc1="Explore"
            desc2="Diverse Careers"
            desc3=""
            imageLink="./jobs.webp"
            fromColor="from-blue-300"
            toColor="to-blue-200"
          />
          <CardComponent
            title="Practice"
            desc1="Refine"
            desc2="Skills Daily"
            desc3=""
            imageLink="./practices.webp"
            fromColor="from-green-200"
            toColor="to-green-200"
          />
          <CardComponent
            title="Competitions"
            desc1="Battle"
            desc2="For Excellence"
            desc3=""
            imageLink="./compets.webp"
            fromColor="from-orange-300"
            toColor="to-orange-200"
          />
          <MoreCard fromColor="from-pink-300" toColor="to-pink-200" />
        </div>
      </div>
    </div>
  );
}
