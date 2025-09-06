"use client"
import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import MoreDropdown from "./MoreDropdown";

export default function MoreCard({fromColor, toColor}: {fromColor: string | "", toColor: string | ""}){
    const [open, setOpen] = useState(false);
    
    return (
        <div className="p-3">
        <div className={`relative w-full h-26 sm:h-29 shadow bg-gradient-to-tl ${fromColor} ${toColor} 
                rounded-xl p-4 cursor-pointer transform transition hover:-translate-y-1`} >
            <button onClick={() => {
                setOpen(prev=>!prev);
             }} className="pt-6 flex cursor-pointer">
                <div className="justify-center items-center">
                    <IoIosMore className="-mb-3"/>
                    <IoIosMore className="-mb-3"/>
                    <IoIosMore className="-mb-3"/>
                </div>
                <div className="ml-1">
                    <p className="text-lg text-gray-800">More</p>
                </div>
            </button>
            <MoreDropdown open={open} setOpen={setOpen}/>
            <img
            src="./more.webp"
            alt="more"
            className="absolute right-0 bottom-0 w-20 sm:w-36 object-contain opacity-90 rounded-full pointer-events-none"
    />
        </div>
        </div>
    )
}