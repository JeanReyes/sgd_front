'use client'

import clsx from "clsx";
import { TopMenu } from "../top-menu/TopMenu";
import { MobileSidebar, Sidebar, SidebarHalf } from "@/components";
import { useCollapseMenu, useSession } from "@/store";
import { Session } from "@/interfaces/session";
import { useEffect } from "react";


interface Props {
  children: React.ReactNode;
  session: Session;
  theme: string;
}

export const ContainerMenu = ({ children, session, theme }: Props) => {
  const isCollapseMenu = useCollapseMenu(state => state.isCollapseMenu);
  const handleSession = useSession((store) => store.setSession)  

  useEffect(() => {
    handleSession(session)
  }, [session])


  return (
    <div className="transition-all">
      {isCollapseMenu ? (
        <SidebarHalf session={session} />
      ) : (
        <Sidebar session={session} />
      )}
      {/* { !isCollapseMenu && <Sidebar session={session} />} */}
      <MobileSidebar position="left" />
      <div
        className={clsx(
          "ml-auto mb-6 min-h-screen overflow-x-auto transition-all",
          {
            "lg:w-[75%]": !isCollapseMenu,
            "xl:w-[80%]": !isCollapseMenu,
            "2xl:w-[85%]": !isCollapseMenu,
            "lg:w-[93%]": isCollapseMenu,
            "xl:w-[93%]": isCollapseMenu,
            "2xl:w-[94%]": isCollapseMenu,
          }
        )}
      >
        <TopMenu theme={theme} />
        <div
          className={`m-2 px-5 pt-5 p-2 pb-5 min-h-screen rounded bg-slate-50 dark:text-white dark:bg-slate-950`}
        >
          {children}
        </div>
      </div>
    </div>
  );

};
