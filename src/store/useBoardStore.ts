import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoardStore {
  activeBoardId: number | null;
  setActiveBoard: (nextBoardId: number | null) => void;
}

export const useBoardStore = create<BoardStore>()(
  devtools(
    (set) => ({
      activeBoardId: null,
      setActiveBoard: (nextBoardId) => {
        set({ activeBoardId: nextBoardId }, false, "setActiveBoard");
      },
    }),
    { name: "BoardStore" },
  ),
);
