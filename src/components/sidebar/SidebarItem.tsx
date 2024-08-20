'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  href: string;
  title: string;
  icon: React.ReactNode
}

export const SidebarItem = ({ href , title, icon}: Props) => {
  const currentPath = usePathname()
  // Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 
  return (
    <li>
      <Link
        href={href}
        className={`
          px-4 py-3 flex items-center space-x-4 rounded-md group
          hover:bg-gradient-to-t hover:bg-sky-600 hover:text-white
          ${href === currentPath ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}
        `}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
