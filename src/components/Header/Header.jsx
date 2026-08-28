import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { SidebarContext } from "@/App";
import { setModal } from "@/store";
import logoMin from "@/assets/logo-mobile.svg";
import DotMenu from "@/components/smallComponents/DotMenu";
import Skeleton from "@/components/smallComponents/Skeleton";
import styles from "./Header.module.scss";

function Header({ isMobile }) {
  const dispatch = useDispatch();
  const { sidebarHidden, handleHidden } = useContext(SidebarContext);
  const [boardsData, activeBoardId, statusData] = useSelector((state) => {
    const boardsData = state.boards.data;
    const activeBoardId = state.boards.activeBoardId;
    const statusData = state.columns.data;
    return [boardsData, activeBoardId, statusData];
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

  const downIcon = (
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
    </svg>
  );
  const upIcon = (
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
    </svg>
  );
  const arrowIcon = sidebarHidden ? downIcon : upIcon;

  let btnContent;
  if (isMobile) {
    btnContent = (
      <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FFF"
          d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
        />
      </svg>
    );
  } else {
    btnContent = <span>+ Add New Task</span>;
  }

  return (
    <header className={styles.header}>
      {isMobile ? <img src={logoMin} alt="mobile version logo" /> : null}

      {boardsData && boardsData.length ? (
        <span className={styles.headerTitle} onClick={handleHidden}>
          {
            boardsData.filter((board) => board.id === activeBoardId)[0]
              .boardName
          }
        </span>
      ) : (
        // XXX: 待抽共用元件
        <Skeleton times={1} className="skeleton__outer--title" />
      )}

      {isMobile ? (
        <div className={styles.sidebarHiddenBtn} onClick={handleHidden}>
          {arrowIcon}
        </div>
      ) : null}

      {/* XXX: 待抽共用元件 */}
      <button
        disabled={!activeColumns[0]}
        className={clsx(
          styles.createTaskBtn,
          `btn ${isMobile ? "btn--mobile" : ""} ${
            !activeColumns[0] ? "btn--disable" : ""
          }`,
        )}
        onClick={modalAddTask}
      >
        {btnContent}
      </button>

      <DotMenu />
    </header>
  );
}

export default Header;
