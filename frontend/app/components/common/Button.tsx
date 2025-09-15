
export const Button = ({name}: {name: string}) =>{
    return <div className="pb-6 pt-2">
        <button type="submit" className="bg-gray-900 hover:bg-gray-800 transition duration-500 text-white w-full font-bold py-2 rounded-lg cursor-pointer">{name}</button>
    </div>
}