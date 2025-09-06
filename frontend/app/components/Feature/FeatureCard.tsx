"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import HeroImg1 from "../../../assets/feature/heroimg1.webp"
import HeroImg2 from "../../../assets/feature/heroimg2.webp"
import HeroImg3 from "../../../assets/feature/heroimg3.webp"
import HeroImg4 from "../../../assets/feature/heroimg4.webp"
import HeroImg5 from "../../../assets/feature/heroimg5.webp"
import HeroImg6 from "../../../assets/feature/heroimg6.webp"
import HeroImg7 from "../../../assets/feature/heroimg7.webp"
import HeroImg8 from "../../../assets/feature/heroimg8.webp"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


const cards = [
        <Card title="Check out the curated opportunities handpicked for you from top organizations." src={HeroImg1}/>,
        <Card title="Check out the curated opportunities handpicked for you from top organizations." src={HeroImg3}/>,
        <Card title="Check out the curated opportunities handpicked for you from top organizations." src={HeroImg2}/>,
        <Card title="Check out the curated opportunities handpicked for you from top organizations." src={HeroImg4}/>,
        <Card title="Check out the curated opportunities handpicked for you from top organizations." src={HeroImg5}/>,
        <Card title="Check out the curated opportunities handpicked for you from top organizations." src={HeroImg6}/>,
        <Card title="Check out the curated opportunities handpicked for you from top organizations." src={HeroImg8}/>,
        <Card title="Check out the curated opportunities handpicked for you from top organizations." src={HeroImg7}/>,
    ]

export default function FeatureCard(){

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
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
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
        ]
    }

    return <div className="cursor-pointer">
        <div>
            <div className="text-2xl font-bold text-gray-800 pb-2 lg:px-12 px-8">
                Featured Opportunities
            </div>
            <div className="text-sm text-gray-600 pb-6 lg:px-12 px-8">
                Check out the curated opportunities handpicked for you from top organizations.
            </div>
            <div className="hidden md:block relative lg:px-10 px-6">
                <Slider {...settings} className="relative">
                    {cards.map((card, index)=>(
                        <div key={index} className="w-full flex justify-center p-2">{card}</div>
                    ))}
                </Slider>
            </div>

            <div className="md:hidden px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 pb-2">
                {cards.map((card, index) => (
                  <div key={index} className="snap-start shrink-0 w-72">
                    {card}
                  </div>
                ))}
              </div>
            </div>
        </div>
    </div>
}