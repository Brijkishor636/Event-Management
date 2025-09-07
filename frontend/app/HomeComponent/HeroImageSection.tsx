"use client";
import HeroImgCard from "../components/Banner/HeroImgCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HeroImg1 from "../../assets/feature/heroimg1.webp"
import HeroImg2 from "../../assets/feature/heroimg2.webp"
import HeroImg3 from "../../assets/feature/heroimg3.webp"
import HeroImg4 from "../../assets/feature/heroimg4.webp"
import HeroImg5 from "../../assets/feature/heroimg5.webp"
import HeroImg6 from "../../assets/feature/heroimg6.webp"
import HeroImg7 from "../../assets/feature/heroimg7.webp"
import HeroImg8 from "../../assets/feature/heroimg8.webp"

const NextArrow = ({ className, style, onClick }: any) => (
  <button
    onClick={onClick}
    className={`${className} hidden md:flex !absolute !top-1/2 !right-5 
                !-translate-y-1/2 !z-20 !shadow-md text-gray-400 !rounded-full !p-2 cursor-pointer`}
    style={{ ...style }}
    aria-label="Next"
  >
    <FaChevronRight size={20} />
  </button>
);

const PrevArrow = ({ className, style, onClick }: any) => (
  <button
    onClick={onClick}
    className={`${className} hidden md:flex !absolute !top-1/2 !left-4 
                !-translate-y-1/2 !z-20 !shadow-md text-gray-400 !rounded-full !p-2 cursor-pointer`}
    style={{ ...style }}
    aria-label="Previous"
  >
    <FaChevronLeft size={20} />
  </button>
);

const testimonials = [
    <HeroImgCard src={HeroImg1} alt="Heroimg1"/>,
    <HeroImgCard src={HeroImg2} alt="Heroimg2"/>,
    <HeroImgCard src={HeroImg3} alt="Heroimg3"/>,
    <HeroImgCard src={HeroImg4} alt="Heroimg4"/>,
    <HeroImgCard src={HeroImg5} alt="Heroimg5"/>,
    <HeroImgCard src={HeroImg6} alt="Heroimg6"/>,
    <HeroImgCard src={HeroImg7} alt="Heroimg7"/>,
    <HeroImgCard src={HeroImg8} alt="Heroimg8"/>,
]; 

export default function HeroImageSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px",
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="relative px-6 md:px-20 lg:px-30 xl:px-50">
      <Slider {...settings} className="relative">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="w-full flex justify-center p-2">
            {testimonial}
          </div>
        ))}
      </Slider>
    </section>
  );
}
