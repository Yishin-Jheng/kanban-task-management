import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { getColumns } from "@/api/columns";
import { addIcon, downIcon, upIcon } from "@/assets/icon";
import logoMin from "@/assets/logo-mobile.svg";
import Button from "@/components/Button/Button";
import DotMenu from "@/components/DotMenu/DotMenu";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useBoardStore } from "@/store/useBoardStore";
import { useModalStore } from "@/store/useModalStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import styles from "./Header.module.scss";

function Header({ isMobile }) {
  const isSidebarHidden = useSidebarStore((store) => store.isSidebarHidden);
  const activeBoardId = useBoardStore((store) => store.activeBoardId);
  const { toggleSidebar } = useSidebarStore.getState();
  const { setModal } = useModalStore.getState();

  const modalAddTask = () => {
    setModal({
      modalType: "taskForm",
      isAddNew: true,
    });
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
            if (isMobile) toggleSidebar();
          }}
        >
          {boardName ?? ""}
          {isMobile && <>{isSidebarHidden ? downIcon : upIcon}</>}
        </h1>
      )}
      <Button
        className={styles.createTaskBtn}
        isMobile={isMobile}
        isDisabled={isColumnsEmpty}
        onClick={modalAddTask}
      >
        {isMobile ? addIcon : <span>+ Add New Task</span>}
      </Button>
      <DotMenu
        type="board"
        targetInfo={{ id: activeBoardId, title: boardName }}
      />
    </header>
  );
}

export default Header;
