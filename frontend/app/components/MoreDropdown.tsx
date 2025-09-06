

export default function MoreDropdown({open, setOpen}:{open: boolean, setOpen:any}){

    if(!open){
        return null;
    }
    return <div>
        <div
          role="menu"
          className="absolute bottom-0 left-0 mt-2 w-full bg-white shadow-lg rounded-xl p-2 z-50"
          onMouseLeave={() => setOpen(false)}
        >
          <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
            📘 Courses
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
            🎓 Scholarships
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
            🎭 Cultural Events
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
            🛠 Workshops
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
            🎤 Conferences
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
            ✍️ Blog
          </a>
        </div>
    </div>
}