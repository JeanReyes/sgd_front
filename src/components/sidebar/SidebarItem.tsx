'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface Props {
  href: string;
  title: string;
  icon: React.ReactNode
  isHalf?: boolean
}

export const SidebarItem = ({ href , title, icon, isHalf = false}: Props) => {
  const currentPath = usePathname();

  if (isHalf) {
      return (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='w-full'>
                {" "}
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
                  {icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
