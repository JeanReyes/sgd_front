'use client'
import { ButtonTheme, LogoutButton } from '@/components';
import { ButtonBurger } from './ButtonBurger';

interface Props {
  theme: string;
}

export const TopMenu = ({theme}: Props) => {

  return (
    <div className="dark:bg-slate-950 sticky z-10 top-0 h-16 md:h-14 border-b dark:border-red-500 border-blue-500 bg-white lg:py-2.5">
      <div className="h-full px-6 flex items-center justify-between">
        <h5 hidden className="text-2xl font-medium lg:block">
          {/* Dashboard */}
        </h5>
        <div className="lg:hidden">
          <ButtonBurger  />
        </div>
        <div className="flex items-center">
          <ButtonTheme theme={theme} />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
