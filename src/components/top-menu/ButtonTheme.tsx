'use client'

import { changeTheme } from "@/actions/theme/actions";
import { useRouter } from "next/navigation";
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

interface Props {
  theme: string
}

export const ButtonTheme = ({theme}: Props) => {

  // const router = useRouter();
  // const handleSetTheme = () => {
  //   changeTheme(theme === 'light' ? 'dark' : 'light');
  //   router.refresh()
  // }

  // return (
  //   <button
  //     onClick={() => handleSetTheme()}
  //     className="flex items-center justify-center w-10 h-10 rounded-xl border"
  //   >
  //     {theme === "light" ? (
  //       <CiSun className="w-5 h-5" size={20} />
  //     ) : (
  //       <IoMoonOutline className="w-5 h-5" size={20} />
  //     )}
  //   </button>
  // );

  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
