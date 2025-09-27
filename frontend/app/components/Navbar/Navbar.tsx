"use client"
import MiddleNavbar from "./MiddleNavbar"
import { LuBriefcaseBusiness } from "react-icons/lu";
import Searchbar from "./Searchbar"
import Link from "next/link";
import Profile from "./Profile";


export const Navbar = () =>{


    return <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-md rounded-b-3xl sm:rounded-none">
        <div className="flex justify-between border-b border-gray-200 p-3 px-12">
            <div className="flex">
                <Link href={"/"} className="flex justify-center items-center pl-5 text-gray-800 font-bold text-xl hover:text-blue-500 transition duration-300 ease-in-out hover:cursor-pointer">
                    Event Manager
                </Link>
                <div className="hidden lg:flex justify-center items-center pl-5 xl:pl-2">
                    <Searchbar/>
                </div>
            </div>
            
            <div className="flex">
                <div className="hidden xl:flex justify-center items-center">
                        <MiddleNavbar/>
                </div>

                <div className="flex">
                    <div className="hidden lg:flex">
                        <div className="border-r border-gray-300 pl-3"></div>
                        <button className="text-sm justify-center flex items-center px-4 h-full border border-gray-300 py-2 rounded-full hover:text-blue-400 hover:border-blue-400 cursor-pointer border-r ml-3 hover:bg-blue-50">+ Host</button>
                        <div className="px-3 h-full border border-gray-300 py-2 rounded-full ml-3 cursor-pointer bg-amber-100 hover:bg-amber-200 text-sm justify-center flex items-center transition-colors duration-500 ease-in-out"><div className="flex justify-center items-center w-5 h-5 mr-1"><LuBriefcaseBusiness /></div>For Business</div>
                        <div className="border-r border-gray-300 pl-3"></div>
                    </div>
                    <Profile/>
                </div>
            </div>
            
        </div>
        
        <div className="block sm:hidden bg-blue-50 px-6 py-8 rounded-b-3xl">
        <h2 className="text-lg font-semibold text-gray-800">
          Hii,
        </h2>
        <p className="text-xl font-bold text-gray-900 mb-4">
          Unlock Your Career
        </p>
        <Searchbar />
      </div>
    </div>
}