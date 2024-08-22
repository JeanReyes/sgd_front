import { useCollapseMenu } from "@/store";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

export const SidebarHalf = () => {
  const handleCollapseMenu = useCollapseMenu(
    (state) => state.openCollapseMenu
  );
  return (
    <aside className="dark:bg-slate-800 border-r dark:border-red-500  fixed z-10  pb-3 px-6 w-full flex flex-col justify-between h-screen bg-white transition-all duration-300 lg:w-[10%] xl:w-[10%] 2xl:w-[7%]">
      <div>
        <TbLayoutSidebarRightCollapse
          className="cursor-pointer"
          size={30}
          onClick={handleCollapseMenu}
        />
      </div>
    </aside>
  );
};
