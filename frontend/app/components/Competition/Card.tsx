"use client";
import Image from "next/image";
import { Eye, Clock } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";

// import your 4 static images
import comImg1 from "../../../assets/competetion/competition1.webp";
import comImg2 from "../../../assets/competetion/competition5.webp";
import comImg3 from "../../../assets/competetion/competition6.webp";
import comImg4 from "../../../assets/competetion/competition10.webp";
import logoImg1 from "../../../assets/competetion/competitionLogo.webp";

interface CardProps {
  title: string;
  subtitle: string;
  views: string;
  daysLeft: string;
  index?: number; 
}

export default function Card({
  title,
  subtitle,
  views,
  daysLeft,
  index = 0,
}: CardProps) {
 
  const banners = [comImg1, comImg2, comImg3, comImg4];
  const banner = banners[index % banners.length];

  return (
    <div className="flex-1 max-w-xs rounded-xl overflow-hidden shadow-sm hover:shadow-md transition m-1 bg-white hover:border hover:border-gray-500">
      <div className="relative">
        <Image
          src={banner}
          alt="banner"
          className="h-23 w-full object-cover"
        />

        <div className="absolute bottom-[-20px] right-4 bg-white rounded-xl shadow p-2">
          <Image
            src={logoImg1}
            alt="logo"
            width={60}
            height={60}
            className="rounded-md"
          />
        </div>

        <div className="absolute top-20 left-2 flex gap-2">
          <span className="bg-gray-100 text-gray-700 text-[12px] px-2 rounded shadow">
            Online
          </span>
          <span className="bg-gray-100 text-gray-700 text-[12px] px-2 rounded shadow">
            Free
          </span>
        </div>
      </div>

      <div className="p-4 mt-3">
        <h2
          className="font-bold text-lg text-gray-800 overflow-hidden mb-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </h2>

        <p className="text-sm text-gray-600 truncate">{subtitle}</p>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div>
            <div className="flex items-center mb-2">
              <Eye size={16} className="mr-1" />
              <span className="text-xs">{views} Views</span>
            </div>
            <div className="flex items-center text-xs">
              <Clock size={16} className="mr-1" />
              <span>{daysLeft}</span>
            </div>
          </div>

          <button className="h-8 w-8 rounded-full bg-gray-100 hover:bg-blue-950 flex justify-center items-center cursor-pointer">
            <FaArrowRight className="text-xl text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
