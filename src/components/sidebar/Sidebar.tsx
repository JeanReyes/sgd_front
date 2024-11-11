'use client'

import Image from 'next/image';
import { SidebarItem } from "@/components";
import { titleFont } from '@/app/config/fonts';
import { sidebarRoutes } from "./map-routes";
import { useCollapseMenu } from '@/store';
import { GoSidebarExpand } from 'react-icons/go';
import { Session } from '@/interfaces/session';

interface Props {
  session: Session
}

export const Sidebar =  ({ session }: Props) => {
  
  const handleCollapseMenu = useCollapseMenu((state) => state.closeCollapseMenu);

  return (
    <aside className="dark:bg-slate-950 border-r dark:border-red-500 border-blue-500 ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen bg-white lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] transition-all duration-300">
      <div>
        <div className=" text-center mx-6 px-6 py-4">
          <h1 className=" bg-slate-950 font-bold text-md lg:text-md bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
            NES<span className="text-indigo-500">.</span>CORP
          </h1>
        </div>
        <div className=" text-center">
          <h5 className="hidden mt-2 text-sm font-semibold lg:block">
            {session?.user?.name}
          </h5>
          <span className="hidden text-sm text-gray-400 lg:block">
            {session?.user?.roles[0]}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {sidebarRoutes.map((item) => (
            <SidebarItem key={item.title} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-center items-center border-t dark:border-red-500 border-blue-500">
        <GoSidebarExpand
          className="cursor-pointer"
          size={30}
          onClick={handleCollapseMenu}
        />
      </div>
    </aside>
  );
}
