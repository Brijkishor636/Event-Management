
export default function Button({onClick, className, ariaLabel}:{onClick:any, className:string | "", ariaLabel: string | ""}){
    return <div>
        <button onClick={()=>{onClick}} className={className} aria-label={ariaLabel}></button>
    </div>
}