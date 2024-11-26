import { useCollapseMenu } from "@/store";
import Image from "next/image";
import { GoSidebarCollapse } from "react-icons/go";
import { sidebarRoutes } from "./new-sidebar/map-routes";
import { SidebarItem } from "./SidebarItem";
import { Session } from "@/interfaces/session";

interface Props {
  session: Session;
}

export const SidebarHalf = ({session}: Props) => {

  const handleCollapseMenu = useCollapseMenu(
    (state) => state.openCollapseMenu
  );


  return (
    <div className="hidden lg:block">
      <aside className="dark:bg-slate-950 border-r dark:border-red-500 border-blue-500 fixed z-10 pb-3  w-full flex flex-col justify-between h-screen bg-white transition-all duration-300 lg:w-[7%] xl:w-[7%] 2xl:w-[6%]">
        <div>
          <div className=" text-center px-1 py-4">
            <h1 className=" bg-slate-950 font-bold text-md lg:text-md bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
              Logo Municipal
            </h1>
          </div>
          <div className="mt-2 text-center">
            <h5 className="hidden mt-4 text-sm font-semibold lg:block">
              {session?.user?.name}
            </h5>
          </div>
          <ul className="space-y-2 tracking-wide mt-8">
            {sidebarRoutes.map((item) => (
              <SidebarItem key={item.title} {...item} isHalf />
            ))}
          </ul>
        </div>
        <div className=" pt-4 flex justify-center items-center border-t dark:border-red-500 border-blue-500">
          <GoSidebarCollapse
            className="cursor-pointer"
            size={30}
            onClick={handleCollapseMenu}
          />
        </div>
      </aside>
    </div>
  );
};
