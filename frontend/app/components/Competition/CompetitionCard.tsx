"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import comImg1 from "../../../assets/competetion/competition1.webp"
import comImg2 from "../../../assets/competetion/competition5.webp"
import comImg3 from "../../../assets/competetion/competition6.webp"
import comImg4 from "../../../assets/competetion/competition7.webp"
import logoImg1 from "../../../assets/competetion/competitionLogo.webp"


const arrayCard = [
    <Card src={comImg1} imgLogo={logoImg1}/>,
    <Card src={comImg2} imgLogo={logoImg1}/>,
    <Card src={comImg3} imgLogo={logoImg1}/>,
    <Card src={comImg4} imgLogo={logoImg1}/>,
    <Card src={comImg1} imgLogo={logoImg1}/>,
    <Card src={comImg2} imgLogo={logoImg1}/>,
    <Card src={comImg3} imgLogo={logoImg1}/>,
    <Card src={comImg4} imgLogo={logoImg1}/>,
]

export default function CompetitionCard(){

   const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="hidden md:flex absolute top-1/2 -right-12 -translate-y-1/2 
               z-20 bg-gray-400 hover:bg-gray-500 text-white 
               rounded-full p-2 shadow-lg transition cursor-pointer"
    aria-label="Next"
  >
    <FaChevronRight size={20} />
  </button>
);

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="hidden md:flex absolute top-1/2 -left-12 -translate-y-1/2 
               z-20 bg-gray-400 hover:bg-gray-500 text-white 
               rounded-full p-2 shadow-lg transition cursor-pointer"
    aria-label="Previous"
  >
    <FaChevronLeft size={20} />
  </button>
);

    
    const settings = {
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow/>,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow:3,
                    centerMode: true,
                    centerPadding: "0px",
                    arrows: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                },
            },
        ],
    }

    return <div className="cursor-pointer">
        <div>
            <div>
                    <div className="text-2xl font-bold text-gray-800 pb-2 lg:px-12 px-8">
                        Competitions
                    </div>
                <div className="text-sm text-gray-600 pb-6 lg:px-12 px-8">
                    Explore the Competitions that are creating a buzz among your peers!
                </div>
                    </div>
                <div>
                <div className="hidden md:block relative lg:px-10 px-6">
                    <Slider {...settings} className="relative">
                        {arrayCard.map((card, index)=>(
                            <div key={index} className="w-full flex justify-center p-2">{card}</div>
                        ))}
                    </Slider>
                </div>

                <div className="md:hidden px-4">
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 pb-2">
                    {arrayCard.map((card, index) => (
                      <div key={index} className="snap-start shrink-0 w-72">
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
            </div>

        </div>
    </div>
}