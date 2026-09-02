import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { SidebarContext } from "@/App";
import { addIcon, downIcon, upIcon } from "@/assets/icon";
import logoMin from "@/assets/logo-mobile.svg";
import Button from "@/components/Button/Button";
import DotMenu from "@/components/DotMenu/DotMenu";
import Skeleton from "@/components/Skeleton/Skeleton";
import { setModal } from "@/store";
import styles from "./Header.module.scss";

function Header({ isMobile }) {
  const dispatch = useDispatch();
  const { sidebarHidden, handleHidden } = useContext(SidebarContext);
  const [activeBoardId, statusData] = useSelector((state) => {
    const activeBoardId = state.boards.activeBoardId;
    const statusData = state.columns.data;
    return [activeBoardId, statusData];
  });
  const activeColumns = statusData
    ? statusData.filter((col) => col.boardId === activeBoardId)
    : [];

  const modalAddTask = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "taskModal",
        createOrNot: true,
      }),
    );
  };

  const { data: boardName, isFetching: isFetchingBoardName } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    select: (data) => {
      const activeBoard = data.find((board) => board.id === activeBoardId);
      return activeBoard?.boardName;
    },
  });

  const isShowSkeleton = isFetchingBoardName && !boardName;

  return (
    <header className={styles.header}>
      {isMobile ? <img src={logoMin} alt="mobile version logo" /> : null}
      {isShowSkeleton && <Skeleton styleType="title" />}
      {!isShowSkeleton && (
        <h1 className={styles.headerTitle} onClick={handleHidden}>
          {boardName ?? ""}
        </h1>
      )}
      {isMobile && (
        <div className={styles.sidebarHiddenBtn} onClick={handleHidden}>
          {sidebarHidden ? downIcon : upIcon}
        </div>
      )}
      <Button
        className={styles.createTaskBtn}
        isMobile={isMobile}
        isDisabled={!activeColumns[0]}
        onClick={modalAddTask}
      >
        {isMobile ? addIcon : <span>+ Add New Task</span>}
      </Button>
      <DotMenu />
    </header>
  );
}

export default Header;
