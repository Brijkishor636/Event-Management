
interface inputCard{
    title: string | "",
    desc1: string | "",
    desc2: string | "",
    desc3: string | "",
    imageLink: string | "",
    fromColor: string | "",
    toColor: string | ""
}

export const CardComponent = ({title, desc1, desc2, desc3, imageLink, fromColor, toColor}: inputCard)=>{
    return (
            <div className="p-3">
  <div className={`relative w-full h-26 sm:h-29 shadow bg-gradient-to-tl ${fromColor} ${toColor} 
    rounded-xl p-4 overflow-hidden cursor-pointer transform transition hover:-translate-y-1`}
  >
    <p className="text-base sm:text-lg text-gray-700 mb-0.5">{title}</p>
    {<p className="text-[10px] sm:text-[12px] text-gray-600">{desc1}</p>}
    {<p className="text-[10px] sm:text-[12px] text-gray-600">{desc2}</p>}
    {<p className="text-[10px] sm:text-[12px] text-gray-600">{desc3}</p>}

    <img
      src={imageLink}
      alt={title}
      className="absolute right-0 bottom-0 w-20 sm:w-36 object-contain opacity-90 rounded-2xl pointer-events-none"
    />
  </div>
</div>
    )
}