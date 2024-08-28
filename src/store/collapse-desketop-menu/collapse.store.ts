import { create } from "zustand";

interface State {
  isCollapseMenu: boolean;
  openCollapseMenu: () => void;
  closeCollapseMenu: () => void;
}

export const useCollapseMenu = create<State>()((set) => ({
  isCollapseMenu: false,
  openCollapseMenu: () => set({ isCollapseMenu: false }),
  closeCollapseMenu: () => set({ isCollapseMenu: true }),
}));
