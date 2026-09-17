import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useSidebarStore = create(
  devtools(
    (set) => ({
      isSidebarHidden: false,
      setSidebarHidden: (isHidden) => {
        set(() => ({
          isSidebarHidden: isHidden,
        }));
      },
      toggleSidebar: () => {
        set((state) => ({
          isSidebarHidden: !state.isSidebarHidden,
        }));
      },
    }),
    { name: "SidebarStore" },
  ),
);
