import Link from "next/link";
import { useContext, useState } from "react";
import UserContext from "@/app/provider/userContext";
import IconProfile from "./IconProfile";
import IconLogin from "./iconLogin";

export default function Profile(){

    const [open, setOpen] = useState(false);
    const context = useContext(UserContext);

    function handleClick(){
        setOpen(!open);
    }

    return <div className="flex justify-center items-center">
        {context?.user ? 
                        <button onClick={handleClick} className="pl-3 cursor-pointer"><IconProfile open={open} setOpen={setOpen}/></button>
                        :
                        (<div className="flex pl-3">
                            <button onClick={handleClick}><IconLogin open={open} setOpen={setOpen}/></button>
                            <Link href={"/pages/login"} className="px-5 h-full py-2 rounded-full bg-blue-600 cursor-pointer hover:bg-blue-800 text-sm text-white transition-colors duration-400 ease-in-out hidden sm:block xl:hidden">Login</Link>
                            <Link href={"/pages/signup"} className="px-5 h-full py-2 rounded-full bg-blue-600 cursor-pointer ml-5 hover:bg-blue-800 text-sm text-white transition-colors duration-400 ease-in-out hidden sm:block xl:hidden">Signup</Link>
                        </div>)
                    }
    </div>
}