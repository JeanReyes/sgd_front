"use client";

import { useUIStore } from "@/store";
import { clsx } from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { menuItem } from "./map-menu";
import { useSession } from "@/store/session/session.store";

interface Props {
  position: "left" | "right";
}

export const MobileSidebar = ({ position = "left" }: Props) => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const session = useSession((state) => state.session);
  

  return (
    <div>
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-20 bg-black opacity-30" />
      )}

      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-20 backdrop-filter backdrop-blur-sm"
        />
      )}

      <nav
        className={clsx(
          `fixed p-5 left-0 top-0 w-full h-screen dark:bg-slate-950 bg-white z-20 shadow-2xl transform transition-all duration-300`,
          {
            "right-0": position === "right",
            "left-0": position === "left",
            [`${
              position === "left" ? "-translate-x-full" : "translate-x-full"
            }`]: !isSideMenuOpen,
          }
        )}
      >
        {session ? session?.user?.name : "No Name"}
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        <div className="relative mt-14 ">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2 dark:text-gray-900"
          />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {menuItem.map((item, i) => (
          <Link
            onClick={closeMenu}
            key={i}
            href={item.href}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 hover:text-gray-900 rounded transition-all"
          >
            {item.icon}
            <span className="ml-3 text-xl">{item.title}</span>
          </Link>
        ))}

        <div className="w-full h-px bg-gray-200 dark:bg-red-500 my-10" />
      </nav>
    </div>
  );
};
