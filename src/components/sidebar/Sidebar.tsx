import Image from 'next/image';
import React from 'react'
import { SidebarItem } from './SidebarItem';
import { IoCalendarOutline, IoCheckboxOutline } from 'react-icons/io5';
import { LogoutButton } from './LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const menuItem = [
  {
    href: "/dashboard",
    title: "Home",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    href: "/dashboard/solicitud",
    title: "Solicitudes",
    icon: <IoCheckboxOutline size={30} />,
  },
];

export const Sidebar = async () => {

  const session = await getServerSession(authOptions);

  return (
    <aside className="dark:bg-slate-800 border-r dark:border-red-500 ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="text-center mx-6 px-6 py-4">
          <h2 className="text-xl">NES-SGD</h2>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={
              session?.user?.image ??
              "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
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
            {session?.user?.email}
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

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t dark:border-red-500">
        <LogoutButton />
      </div>
    </aside>
  );
}
