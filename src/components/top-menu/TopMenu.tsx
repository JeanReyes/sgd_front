'use client'
import { ButtonTheme } from '@/components';
import { ButtonBurger } from './ButtonBurger';
import { getCookie } from 'cookies-next';

interface Props {
  theme: string;
}

export const TopMenu = ({theme}: Props) => {

  return (
    <div className="dark:bg-slate-800 sticky z-10 top-0 h-16 border-b dark:border-red-500 bg-white lg:py-2.5 transition-all duration-300">
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 hidden className="text-2xl font-medium lg:block">
          {/* Dashboard */}
        </h5>
        <div className="lg:hidden">
          <ButtonBurger />
        </div>
        {theme}
        <div className="flex space-x-2">
          <ButtonTheme theme={theme} />
        </div>
      </div>
    </div>
  );
}
