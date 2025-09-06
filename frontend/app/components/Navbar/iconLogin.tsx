import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { useRef, useEffect } from "react";

export default function IconLogin({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [setOpen]);

  return (
    <div className="relative">
       {!open ? (
      <svg
        onClick={() => setOpen(true)}
        className="w-6 h-6 text-gray-800 cursor-pointer block sm:hidden md:hidden lg:hidden xl:block"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="M5 7h14M5 12h14M5 17h14"
        />
      </svg>
      ) : (
        <div
          ref={menuRef}
          className="absolute -right-2 mt-6 w-44 bg-gradient-to-bl from-pink-100 to-gray-50 rounded-lg shadow-xl border border-gray-100 p-4 z-50 transition-all"
          onMouseLeave={() => setOpen(false)}
        >
          <RxCross2
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer ml-auto transition hover:bg-indigo-50 hover:rounded-md"
          />
          <div className="flex flex-col mt-2">
            <Link href="/login" className="px-3 py-2 text-gray-700 font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
              Login
            </Link>
            <Link href="/signup" className="px-3 py-2 text-gray-700 font-medium rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition">
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
