'use client'

import Image from 'next/image';
import { SidebarItem } from "@/components";
import { titleFont } from '@/app/config/fonts';
import { menuItem } from './map-menu';
import { useCollapseMenu } from '@/store';
import { GoSidebarExpand } from 'react-icons/go';
import { SessionSgd } from '@/interfaces/session';

interface Props {
  session: SessionSgd
}

export const Sidebar =  ({ session }: Props) => {
  
  const handleCollapseMenu = useCollapseMenu((state) => state.closeCollapseMenu);

  return (
    <aside className="dark:bg-slate-800 border-r dark:border-red-500 ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen bg-white lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] transition-all duration-300">
      <div>
        <div className=" text-center mx-6 px-6 py-4">
          <span className={`${titleFont.className} antialiased font-bold`}>
            NES
          </span>
        </div>
        <div className="mt-8 text-center">
          <Image
            src={
              session?.user?.image ??
              "/assets/images/rucio.jpg"
            }
            alt="a"
            className="m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={10}
            height={10}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <h5 className="hidden mt-4 text-xl font-semibold lg:block">
            {session?.user?.name}
          </h5>
          <span className="hidden text-gray-400 text-xs lg:block">
            {session?.user?.dni}
          </span>
          <span className="hidden text-gray-400 lg:block">
            {session?.user?.roles?.join(",")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItem.map((item) => (
            <SidebarItem key={item.title} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-center items-center border-t dark:border-red-500">
        <GoSidebarExpand
          className="cursor-pointer"
          size={30}
          onClick={handleCollapseMenu}
        />
      </div>
    </aside>
  );
}
