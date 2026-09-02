import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { SidebarContext } from "@/App";
import { boardIcon } from "@/assets/icon";
import Skeleton from "@/components/Skeleton/Skeleton";
import { resetColumns, resetTasks, setActiveBoard } from "@/store";
import styles from "./Sidebar.module.scss";

function BoardsList() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: `(max-width: 670px)` });
  const { handleHidden } = useContext(SidebarContext);
  const { activeBoardId } = useSelector((state) => state.boards);

  const { data: boardsList, isFetching: isFetchingBoardsList } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    placeholderData: [],
  });
  const boardsLength = boardsList?.length;
  const isShowSkeleton = isFetchingBoardsList && !boardsLength;

  // TODO: 導入 zustand 後需調整
  useEffect(() => {
    if (!activeBoardId && boardsLength) {
      dispatch(setActiveBoard(boardsList[0].id));
    }
  }, [activeBoardId, boardsList, dispatch]);

  return (
    <>
      <span className={styles.boardTitle}>
        All Borads ({boardsLength ?? "-"})
      </span>
      {isShowSkeleton && <Skeleton numbers={3} styleType="board" />}
      {boardsLength > 0 && (
        <ul className={styles.boardsList}>
          {boardsList.map((board) => {
            const isActive = activeBoardId === board.id;
            return (
              <li
                key={board.id}
                className={styles.boardItem}
                data-active={isActive ? "active" : ""}
                onClick={() => {
                  if (isActive) return;
                  if (isMobile) handleHidden();
                  dispatch(setActiveBoard(board.id));
                  dispatch(resetColumns());
                  dispatch(resetTasks());
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
