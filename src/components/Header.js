import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../store";
import DotMenu from "./small-components/DotMenu";
import Skeleton from "./small-components/Skeleton";
import logoMin from "../assets/logo-mobile.svg";

function Header({ isMobile, sidebarHidden, handleHidden }) {
  const dispatch = useDispatch();
  const [boardsData, activeBoardId, statusData] = useSelector((state) => {
    const boardsData = state.boards.data;
    const activeBoardId = state.boards.activeBoardId;
    const statusData = state.columns.data;
    return [boardsData, activeBoardId, statusData];
  });
  const modalAddTask = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "taskModal",
        createOrNot: true,
      })
    );
  };

  const showHiddenMenu = isMobile && !sidebarHidden;
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
    <header className="header">
      {isMobile ? <img src={logoMin} alt="mobile version logo" /> : null}

      {boardsData.length ? (
        <span className="header__title">
          {
            boardsData.filter((board) => board.id === activeBoardId)[0]
              .boardName
          }
        </span>
      ) : (
        <Skeleton times={1} className="skeleton__outer--title" />
      )}

      {isMobile ? (
        <div className="header__sidebar-btn" onClick={handleHidden}>
          {arrowIcon}
        </div>
      ) : null}

      <button
        disabled={showHiddenMenu || !statusData[0]}
        className={`btn ${isMobile ? "btn--mobile" : ""} ${
          showHiddenMenu || !statusData[0] ? "btn--disable" : ""
        } header__create`}
        onClick={modalAddTask}
      >
        {btnContent}
      </button>

      <DotMenu />
    </header>
  );
}

export default Header;
