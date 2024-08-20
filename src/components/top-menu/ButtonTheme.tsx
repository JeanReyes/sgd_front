'use client'

import { ChangeTheme } from "@/theme/actions/actions";
import { useRouter } from "next/navigation";
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";

interface Props {
  theme: string
}

export const ButtonTheme = ({theme}: Props) => {
  const router = useRouter();
  const handleSetTheme = () => {
    ChangeTheme(theme === 'light' ? 'dark' : 'light');
    router.refresh()
  }

  return (
    <button
      onClick={() => handleSetTheme()}
      className="flex items-center justify-center w-10 h-10 rounded-xl border"
    >
      {theme === "light" ? <CiSun size={25} /> : <IoMoonOutline size={25} />}
    </button>
  );
}
