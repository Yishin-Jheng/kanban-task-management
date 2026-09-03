import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { getColumns } from "@/api/columns";
import { addIcon, downIcon, upIcon } from "@/assets/icon";
import logoMin from "@/assets/logo-mobile.svg";
import Button from "@/components/Button/Button";
import DotMenu from "@/components/DotMenu/DotMenu";
import Skeleton from "@/components/Skeleton/Skeleton";
import { SidebarContext } from "@/sidebarContext";
import { setModal } from "@/store";
import styles from "./Header.module.scss";

function Header({ isMobile }) {
  const dispatch = useDispatch();
  const { sidebarHidden, handleHidden } = useContext(SidebarContext);
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);
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

  const { data: isColumnsEmpty = true } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn: () => getColumns({ boardId: activeBoardId }),
    enabled: !!activeBoardId,
    select: (data) => {
      return data?.length === 0;
    },
  });

  const isShowSkeleton = isFetchingBoardName && !boardName;

  return (
    <header className={styles.header}>
      {isMobile ? <img src={logoMin} alt="mobile version logo" /> : null}
      {isShowSkeleton && <Skeleton styleType="title" />}
      {!isShowSkeleton && (
        <h1
          className={styles.headerTitle}
          onClick={() => {
            if (isMobile) handleHidden();
          }}
        >
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
        isDisabled={isColumnsEmpty}
        onClick={modalAddTask}
      >
        {isMobile ? addIcon : <span>+ Add New Task</span>}
      </Button>
      <DotMenu />
    </header>
  );
}

export default Header;
