'use client'

import { changeTheme } from "@/actions/theme/actions";
import { useRouter } from "next/navigation";
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";

interface Props {
  theme: string
}

export const ButtonTheme = ({theme}: Props) => {

  const router = useRouter();
  const handleSetTheme = () => {
    changeTheme(theme === 'light' ? 'dark' : 'light');
    router.refresh()
  }

  return (
    <button
      onClick={() => handleSetTheme()}
      className="flex items-center justify-center w-10 h-10 rounded-xl border"
    >
      {theme === "light" ? (
        <CiSun className="w-5 h-5" size={20} />
      ) : (
        <IoMoonOutline className="w-5 h-5" size={20} />
      )}
    </button>
  );
}
