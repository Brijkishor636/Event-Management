"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Card from "./Card";

import comImg1 from "../../../assets/competetion/competition1.webp";
import comImg2 from "../../../assets/competetion/competition5.webp";
import comImg3 from "../../../assets/competetion/competition6.webp";
import comImg4 from "../../../assets/competetion/competition10.webp";
import logoImg1 from "../../../assets/competetion/competitionLogo.webp";

// Dynamic import with SSR disabled
const Slider = dynamic(() => import("react-slick"), { ssr: false });

type MainCardProps = {
  title: string;
  description: string;
  apiEndpoint?: string;
};

export default function CompetitionCard({ title, description, apiEndpoint }: MainCardProps) {
  const [cards, setCards] = useState<any[]>([]);

  const staticCards = [
    { src: comImg1, logo: logoImg1, title: "INSIGHT X GARP", subtitle: "Narsee Monjee College", views: "7,579", daysLeft: "6 days left" },
    { src: comImg2, logo: logoImg1, title: "Code Quest", subtitle: "IIT Bombay", views: "4,300", daysLeft: "3 days left" },
    { src: comImg3, logo: logoImg1, title: "Hackathon 2025", subtitle: "NIT Trichy", views: "9,122", daysLeft: "10 days left" },
    { src: comImg4, logo: logoImg1, title: "Design Wars", subtitle: "IIIT Delhi", views: "2,511", daysLeft: "1 day left" },
    { src: comImg4, logo: logoImg1, title: "Design Wars", subtitle: "IIIT Delhi", views: "2,511", daysLeft: "1 day left" },
    { src: comImg4, logo: logoImg1, title: "Design Wars", subtitle: "IIIT Delhi", views: "2,511", daysLeft: "1 day left" },
    { src: comImg4, logo: logoImg1, title: "Design Wars", subtitle: "IIIT Delhi", views: "2,511", daysLeft: "1 day left" },
    { src: comImg4, logo: logoImg1, title: "Design Wars", subtitle: "IIIT Delhi", views: "2,511", daysLeft: "1 day left" },
  ];

  useEffect(() => {
  if (!apiEndpoint) return setCards(staticCards);

  fetch(apiEndpoint, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.jobs)
        ? data.jobs
        : data.data || [];

      setCards(list.length > 0 ? list : staticCards);
    })
    .catch(() => setCards(staticCards));
}, [apiEndpoint]);

  // Custom arrow components
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="hidden md:flex absolute top-1/2 -right-8 -translate-y-1/2 z-20
                   bg-gray-400 hover:bg-gray-500 text-white rounded-full p-2 shadow-lg cursor-pointer"
      >
        <FaChevronRight size={20} />
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="hidden md:flex absolute top-1/2 -left-8 -translate-y-1/2 z-20
                   bg-gray-400 hover:bg-gray-500 text-white rounded-full p-2 shadow-lg cursor-pointer"
      >
        <FaChevronLeft size={20} />
      </button>
    );
  };

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: Math.min(4, cards.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: Math.min(3, cards.length), arrows: true, dots:false } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false , dots: false} },
    ],
  };


  if (typeof window === "undefined") return null;

  return (
    <div className="cursor-pointer">
      <div className="lg:px-12 px-8">
        <div className="text-2xl font-bold text-gray-800 pb-2">{title}</div>
        <div className="text-sm text-gray-600 pb-6">{description}</div>
      </div>

      <div className="hidden md:block relative lg:px-10 px-6">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div key={index} className="w-full flex justify-center p-2">
              <Card
                index={index}
                title={card.job_title || card.title}
                subtitle={card.job_description || card.subtitle}
                views={card.job_views || card.views || "1,000"}
                daysLeft={card.endsOn || card.daysLeft}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="md:hidden px-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 pb-2">
          {cards.map((card, index) => (
            <div key={index} className="snap-start shrink-0 w-72">
              <Card
                index={index}
                title={card.job_title || card.title}
                subtitle={card.job_description || card.subtitle}
                views={card.job_views || card.views || "1,000"}
                daysLeft={card.endsOn || "10"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
