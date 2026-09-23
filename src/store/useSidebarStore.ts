import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SidebarStore {
  isSidebarHidden: boolean;
  setSidebarHidden: (isHidden: boolean) => void;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  devtools(
    (set) => ({
      isSidebarHidden: false,
      setSidebarHidden: (isHidden) => {
        set({ isSidebarHidden: isHidden }, false, "setSidebarHidden");
      },
      toggleSidebar: () => {
        set(
          (state) => ({ isSidebarHidden: !state.isSidebarHidden }),
          false,
          "toggleSidebar",
        );
      },
    }),
    { name: "SidebarStore" },
  ),
);
