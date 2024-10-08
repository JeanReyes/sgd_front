import { useCollapseMenu } from "@/store";
import Image from "next/image";
import { GoSidebarCollapse } from "react-icons/go";
import { sidebarRoutes } from "./map-routes";
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
      <aside className="dark:bg-slate-950 border-r dark:border-red-500 fixed z-10 pb-3  w-full flex flex-col justify-between h-screen bg-white transition-all duration-300 lg:w-[7%] xl:w-[7%] 2xl:w-[6%]">
        <div>
          <div className="mt-2 text-center">
            {/* <Image
              src={session?.user?.image ?? "/assets/images/rucio.jpg"}
              alt="a"
              className="m-auto rounded-full object-cover lg:w-10 lg:h-10"
              width={10}
              height={10}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            /> */}
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
        <div className=" pt-4 flex justify-center items-center border-t dark:border-red-500">
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
