import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useBoardStore = create(
  devtools(
    (set) => ({
      activeBoardId: null,
      setActiveBoard: (nextBoardId) => {
        set(
          (state) => ({
            activeBoardId:
              typeof nextBoardId === "function"
                ? nextBoardId(state.activeBoardId)
                : nextBoardId,
          }),
          false,
          "setActiveBoard",
        );
      },
    }),
    { name: "BoardStore" },
  ),
);
