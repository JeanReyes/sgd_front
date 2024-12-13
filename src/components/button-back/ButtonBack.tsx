'use client'

import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export const ButtonBack = () => {

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="cursor-pointer  flex items-center justify-center "
            onClick={handleBack}
          >
            <IoArrowBackCircleOutline className="hover:text-slate-500" size={30} />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Volver</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
