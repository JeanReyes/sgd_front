'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  href: string;
  title: string;
  icon: React.ReactNode
  isHalf?: boolean
}

export const SidebarItem = ({ href , title, icon, isHalf = false}: Props) => {
  const currentPath = usePathname()

  if (isHalf) {
      return (
        <li>
          <Link
            href={href}
            className={`
              py-4 sm:m-1 md:m-2 flex justify-center items-center rounded-md group
              hover:bg-gradient-to-t hover:bg-sky-600 hover:text-white
              ${
                href === currentPath
                  ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                  : ""
              }
            `}
          >
            <div>
              <div className="flex justify-center">{icon}</div>
              <span className="text-xs">{title}</span>
            </div>
          </Link>
        </li>
      );
  }
  
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
