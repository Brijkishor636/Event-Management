"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);

  const closeTimer = useRef<number | null>(null);

  function openMenu() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  }

  function scheduleClose(delay = 150) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), delay);
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={openMenu}
      onMouseLeave={() => scheduleClose(120)}
      onKeyDown={(e) => {
        //@ts-ignore
        if ((e as KeyboardEvent).key === "Escape") setOpen(false);
      }}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        onFocus={openMenu}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
      >
        More <ChevronDown size={16} />
      </button>

  
      {open && (
        <div
          role="menu"
          onMouseEnter={openMenu}
          onMouseLeave={() => scheduleClose(120)}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl p-2 z-50"
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
      )}
    </div>
  );
}
