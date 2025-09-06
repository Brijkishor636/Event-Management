import Image from "next/image";
import Clock from "./Clock";
import Users from "./Users";

export default function Card({title, src}: {title: string | "", src:any}){

  const truncate = ({str, n}: {str: string, n:number})=>{
    return str.length > n ? str.slice(0, n) + "...":str;
  }
    return <div className="flex-1 max-w-xs rounded-xl overflow-hidden shadow-md hover:shadow-lg transition m-1">
  <div className="h-34">
    <Image
      src={src}
      alt="logo"
      className="rounded-t-xl h-full w-full"
    />
  </div>
  <div className="bg-gray-100 p-2">
    <div className="flex pb-2">
        <p className="text-gray-600 text-sm pr-2">Online</p> 
        <div className="border-r border-gray-400"></div>
        <p className="text-sm text-gray-600 ml-2">Free</p>
    </div>
    <div className="pb-3">
        <div className="font-bold text-xl text-gray-800">
          {truncate({ str: title, n: 40 })}
        </div>
    </div>
    <div className="pb-1 flex items-center">
        <Users/>
        <span className="text-[12px] text-gray-600 pl-1">20 Registered</span>
    </div>
    <div className="flex items-center">
        <Clock/>
        <span className="text-[12px] text-gray-600 pl-1">1 days left</span>
    </div>
  </div>
</div>

}