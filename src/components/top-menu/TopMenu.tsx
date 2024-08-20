import { cookies } from 'next/headers';
import React from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { ButtonTheme } from './ButtonTheme';

export const TopMenu = () => {

    const cookieStore = cookies();
    const theme = JSON.parse(cookieStore.get("theme")?.value ?? "light");

  return (
    <div className="dark:bg-slate-800 sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 hidden className="text-2xl font-medium lg:block">
          {/* Dashboard */}
        </h5>
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>
        <div className="flex space-x-2">
          <ButtonTheme theme={theme}/>
        </div>
      </div>
    </div>
  );
}
