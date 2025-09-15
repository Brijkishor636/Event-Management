import Link from "next/link";

interface warmingProps{
    label: string,
    to: string,
    buttonText: string
}

export const BottomWarming = ({label, to, buttonText}: warmingProps) =>{
    return <div className="flex pb-4 text-center justify-center text-sm">
        <p className="text-gray-200">{label}</p>
        <Link href={to} className="ml-2 text-gray-400 hover:underline hover:text-blue-500">{buttonText}</Link>
    </div>
}