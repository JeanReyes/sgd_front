import { changeCollapseMenu } from "@/actions/cookies/actions";
import { create } from "zustand";

interface State {
  isCollapseMenu: boolean;
  setCollapseState: (collapse: boolean) => void;
  openCollapseMenu: () => void;
  closeCollapseMenu: () => void;
}

export const useCollapseMenu = create<State>()((set) => ({
  isCollapseMenu: false,
  setCollapseState: (collapse: boolean) => set({ isCollapseMenu: collapse }),
  openCollapseMenu: () => {
    set({ isCollapseMenu: false });
    changeCollapseMenu(false);
  },
  closeCollapseMenu: () => {
    set({ isCollapseMenu: true });
    changeCollapseMenu(true);
  },
}));
