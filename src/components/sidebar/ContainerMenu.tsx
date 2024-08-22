'use client'

import clsx from "clsx";
import { TopMenu } from "../top-menu/TopMenu";
import { Session } from "next-auth";
import { MobileSidebar, Sidebar, SidebarHalf } from "@/components";
import { useCollapseMenu } from "@/store";


interface Props {
  children: React.ReactNode;
  session: Session;
  theme: string;
}

export const ContainerMenu = ({ children, session, theme }: Props) => {
  const isCollapseMenu = useCollapseMenu(state => state.isCollapseMenu);


  return (
    <>
      {/* {isCollapseMenu ? <SidebarHalf /> : <Sidebar session={session} />  } */}
      <Sidebar session={session} />
      <MobileSidebar position="left" />
      <div
        className={clsx(
          "transition-all duration-300 ease-out ml-auto mb-6 min-h-screen",
          {
            "lg:w-[75%]": !isCollapseMenu,
            "xl:w-[80%]": !isCollapseMenu,
            "2xl:w-[85%]": !isCollapseMenu,
            "lg:w-[90%]": isCollapseMenu,
            "xl:w-[90%]": isCollapseMenu,
            "2xl:w-[93%]": isCollapseMenu,
          }
        )}
      >
        <TopMenu theme={theme} />
        <div
          className={`fade-in m-2 px-5 pt-5 p-2 sm:m-5 pb-5 min-h-screen rounded bg-slate-200 dark:text-white dark:bg-slate-800 transition-all duration-300`}
        >
          {children}
        </div>
      </div>
    </>
  );

};
