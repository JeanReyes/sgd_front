'use client'
import { useUIStore } from '@/store';
import { CiMenuBurger } from 'react-icons/ci';

export const ButtonBurger = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  return (
    <button
      onClick={openMenu}
      className="w-12 h-16 -mr-2 border-r dark:border-red-500"
    >
      <CiMenuBurger size={20} />
    </button>
  );
}
