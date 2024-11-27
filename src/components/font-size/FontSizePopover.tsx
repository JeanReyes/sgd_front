'use client'

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FaFont } from "react-icons/fa";
import Cookies from "js-cookie";

const handleFontZise = (size: string) => {
  Cookies.set("font", size, { expires: 365 });
  const fontSizeMap: Record<string, string> = {
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "22px",
  };
  document.documentElement.style.setProperty(
    "--font-size-base",
    fontSizeMap[size]
  );
};

export default function FontSizePopover() {
  const [fontSize, setFontSize] = useState(() => {
    handleFontZise(Cookies.get("font") || "md");
    return Cookies.get("font") || "md";
  });

  const changeFontSize = (size: string) => {
    handleFontZise(size)
    setFontSize(size)
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <FaFont className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <FaFont className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeFontSize("sm")}>
          Pequeño (sm)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeFontSize("md")}>
          Normal (md)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeFontSize("lg")}>
          Grande (lg)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeFontSize("xl")}>
          Extra Grande (xl)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  
  //   <Popover>
  //     <PopoverTrigger className="px-4 py-2rounded-md">
  //      letra
  //     </PopoverTrigger>
  //     <PopoverContent
  //       align="start"
  //       className="w-40 p-4 shadow-lg border rounded-md"
  //     >
  //       <p className="font-bold mb-2">Tamaños:</p>
  //       <ul className="space-y-2">
  //         <li>
  //           <button
  //             onClick={() => changeFontSize("sm")}
  //             className={clsx(
  //               "w-full text-left py-1 px-2 rounded hover:bg-gray-100",
  //               fontSize === "sm" && "bg-gray-200"
  //             )}
  //           >
  //             Pequeño (sm)
  //           </button>
  //         </li>
  //         <li>
  //           <button
  //             onClick={() => changeFontSize("md")}
  //             className={clsx(
  //               "w-full text-left py-1 px-2 rounded hover:bg-gray-100",
  //               fontSize === "md" && "bg-gray-200"
  //             )}
  //           >
  //             Normal (md)
  //           </button>
  //         </li>
  //         <li>
  //           <button
  //             onClick={() => changeFontSize("lg")}
  //             className={clsx(
  //               "w-full text-left py-1 px-2 rounded hover:bg-gray-100",
  //               fontSize === "lg" && "bg-gray-200"
  //             )}
  //           >
  //             Grande (lg)
  //           </button>
  //         </li>
  //       </ul>
  //     </PopoverContent>
  //   </Popover>
  // );
}
