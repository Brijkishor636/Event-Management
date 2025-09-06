import Image from "next/image";

export default function HeroImgCard({src, alt}: {src:any, alt:string| ""}){
    return <div className="">
        <Image src={src} alt={alt} height={400} width={600} className="rounded-xl"/>
    </div>
}