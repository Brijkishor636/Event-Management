import Link from "next/link";
import { useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

export default function IconProfile({
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
        <CgProfile
            onClick={() => setOpen(true)}
            className="text-3xl text-blue-800 bg-gray-200 hover:text-blue-900 rounded-full"
          />
      ) : (
        <div
          ref={menuRef}
          className="fixed top-15 left-0 w-full
              sm:absolute sm:top-auto sm:left-auto sm:-right-12 sm:mt-6 sm:w-72 sm:h-auto
              bg-gradient-to-t from-blue-100 to-gray-100
              rounded-none sm:rounded-lg
              shadow-xl border border-gray-100 p-6 z-50 transition-all"
          onMouseLeave={() => setOpen(false)}
        >
            <RxCross2 onClick={() => setOpen(false)}
                        className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer ml-auto transition hover:bg-gray-200 hover:rounded-md"
                    />
          <div className="flex flex-col mt-4">
            <Link href="/pages/profile" className="px-3 py-2 text-gray-700 font-medium rounded-lg hover:text-indigo-600 transition hover:bg-gray-300">
              My Profile
            </Link>
            <button className="cursor-pointer px-3 py-2 text-gray-700 font-medium rounded-lg hover:text-emerald-600 transition hover:bg-gray-300">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
