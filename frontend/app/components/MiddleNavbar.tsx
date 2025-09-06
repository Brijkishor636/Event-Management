import { RiArrowDropDownLine } from "react-icons/ri";
import DropdownMenu from "./Dropdown";

export default function MiddleNavbar(){
    return <div className="flex text-sm justify-center items-center text-gray-700">
        <p className="px-3 py-2 rounded-full hover:bg-gray-200 mr-2 cursor-pointer">internships</p>
        <p className="px-3 py-2 rounded-full hover:bg-gray-200 mr-2 cursor-pointer">jobs</p>
        <p className="px-3 py-2 rounded-full hover:bg-gray-200 mr-2 cursor-pointer">competitions</p>
        <p className="px-3 py-2 rounded-full hover:bg-gray-200 mr-2 cursor-pointer">Mentorships</p>
        <div>
            <DropdownMenu/>
        </div>
    </div>
}