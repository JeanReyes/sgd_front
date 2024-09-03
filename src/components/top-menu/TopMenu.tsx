'use client'
import { ButtonTheme, LogoutButton } from '@/components';
import { ButtonBurger } from './ButtonBurger';

interface Props {
  theme: string;
}

export const TopMenu = ({theme}: Props) => {

  return (
    <div className="dark:bg-slate-950 sticky z-10 top-0 h-16 border-b dark:border-red-500 bg-white lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 hidden className="text-2xl font-medium lg:block">
          {/* Dashboard */}
        </h5>
        <div className="lg:hidden">
          <ButtonBurger />
        </div>
        <div className="flex space-x-2">
          <ButtonTheme theme={theme} />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
