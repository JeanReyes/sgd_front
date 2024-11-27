'use client'

import { BreadcrumbGrid, ButtonTheme } from "@/components";
import { useCollapseMenu, useSession } from "@/store";
import { Session } from "@/interfaces/session";
import { useEffect, useState } from "react";
import { getCookieCollapse } from "@/actions/cookies/actions";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./new-sidebar/AppSidebar";
import { Separator } from "../ui/separator";
import FontSizePopover from "../font-size/FontSizePopover";


interface Props {
  children: React.ReactNode;
  session: Session;
  theme: string;
}

export const ContainerMenu = ({ children, session, theme }: Props) => {
  const { setCollapseState } = useCollapseMenu();
  const isCollapseMenu = useCollapseMenu((state) => state.isCollapseMenu);
  const [isOpen, setIsOpen] = useState(false);
  const handleSession = useSession((store) => store.setSession);
  const [isMounted, setIsMounted] = useState(false);

  const handleCloseMenu = useCollapseMenu((state) => state.closeCollapseMenu);
  const handleOpenMenu = useCollapseMenu((state) => state.openCollapseMenu);

  useEffect(() => {
    handleSession(session);
  }, [session]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const collapseState = getCookieCollapse(); // Obtiene el valor de la cookie
      setCollapseState(collapseState);
      setIsOpen(collapseState);
      setIsMounted(true);
    }
  }, [setCollapseState]);

  if (!isMounted) {
    return null;
  }

  const handleSetOpenClose = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      handleOpenMenu();
    } else {
      handleCloseMenu();
    }
  };

  return (
    <div className="transition-all">
      <SidebarProvider defaultOpen={isOpen}>
        <AppSidebar session={session} />
        <SidebarInset>
          <header className="flex h-12 justify-between items-center gap-2 border-b dark:border-white  border-black px-4">
            <div className="flex h-12  items-center gap-2 ">
              <SidebarTrigger onClick={handleSetOpenClose} />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbGrid />
            </div>
            <div className="flex gap-2">
              <FontSizePopover/>
              <ButtonTheme />
            </div>
          </header>

          <div
            className={`m-2 px-2 pt-2 sm:px-5 sm-pt-5 p-2 pb-5 min-h-screen rounded bg-slate-50 dark:text-white dark:bg-slate-950`}
          >
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};




// export const ContainerMenu = ({ children, session, theme, }: Props) => {
//   const isCollapseMenu = useCollapseMenu((state) => state.isCollapseMenu);
//    const { setCollapseState } = useCollapseMenu();
//   const handleSession = useSession((store) => store.setSession);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     handleSession(session);
//   }, [session])

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const collapseState = getCookieCollapse(); // Obtiene el valor de la cookie
//       setCollapseState(collapseState);
//       setIsMounted(true);
//     }
//   }, [setCollapseState]);

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div className="transition-all">
//       {isCollapseMenu ? (
//         <SidebarHalf session={session} />
//       ) : (
//         <Sidebar session={session} />
//       )}
//       {/* { !isCollapseMenu && <Sidebar session={session} />} */}
//       <MobileSidebar position="left" />
//       <div
//         className={clsx(
//           "ml-auto mb-6 min-h-screen overflow-x-auto transition-all",
//           {
//             "lg:w-[75%]": !isCollapseMenu,
//             "xl:w-[80%]": !isCollapseMenu,
//             "2xl:w-[85%]": !isCollapseMenu,
//             "lg:w-[93%]": isCollapseMenu,
//             "xl:w-[93%]": isCollapseMenu,
//             "2xl:w-[94%]": isCollapseMenu,
//           }
//         )}
//       >
//         <TopMenu theme={theme} />
//         <div
//           className={`m-2 px-2 pt-2 sm:px-5 sm-pt-5 p-2 pb-5 min-h-screen rounded bg-slate-50 dark:text-white dark:bg-slate-950`}
//         >
//           <BreadcrumbGrid />
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

