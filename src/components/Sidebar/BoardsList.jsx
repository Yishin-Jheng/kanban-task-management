import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { boardIcon } from "@/assets/icon";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useBoardStore } from "@/store/useBoardStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import styles from "./Sidebar.module.scss";

function BoardsList() {
  const isMobile = useMediaQuery({ query: "(max-width: 670px)" });
  const activeBoardId = useBoardStore((store) => store.activeBoardId);
  const { setActiveBoard } = useBoardStore.getState();
  const { toggleSidebar } = useSidebarStore.getState();

  const { data: boards, isFetching: isFetchingBoards } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  const boardsLength = boards?.length;
  const isShowSkeleton = isFetchingBoards && !boardsLength;

  useEffect(() => {
    if (!activeBoardId && boardsLength) {
      setActiveBoard(boards[0].id);
    }
  }, [activeBoardId, boards, boardsLength, setActiveBoard]);

  return (
    <>
      <span className={styles.boardTitle}>
        All Borads ({boardsLength ?? "-"})
      </span>
      {isShowSkeleton && <Skeleton numbers={3} styleType="board" />}
      {boardsLength > 0 && (
        <ul className={styles.boards}>
          {boards.map((board) => {
            const isActive = activeBoardId === board.id;
            return (
              <li
                key={board.id}
                className={styles.boardItem}
                data-active={isActive ? "active" : ""}
                onClick={() => {
                  if (isActive) return;
                  if (isMobile) toggleSidebar();

                  setActiveBoard(board.id);
                }}
              >
                {boardIcon}
                <span>{board.boardName}</span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default BoardsList;
