import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { SidebarContext } from "@/App";
import {
  boardIcon,
  darkThemeIcon,
  hideSidebarIcon,
  lightThemeIcon,
} from "@/assets/icon";
import logoLight from "@/assets/logo-dark.svg";
import logoDark from "@/assets/logo-light.svg";
import BoardsList from "@/components/Sidebar/BoardsList";
import { setModal } from "@/store";
import styles from "./Sidebar.module.scss";

function Sidebar({ isMobile }) {
  const dispatch = useDispatch();
  const { sidebarHidden, handleHidden } = useContext(SidebarContext);
  const [theme, setTheme] = useState("light");
  const logo = theme === "light" ? logoLight : logoDark;
  let themeRoot = document.querySelector("#theme-root");
  themeRoot.dataset.theme = theme;

  const modalAddBoard = () => {
    if (isMobile) handleHidden();
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "boardModal",
        createOrNot: true,
      }),
    );
  };

  const handleThemeSwitch = function () {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (sidebarHidden && !isMobile) {
    return (
      <figure className={styles.logoImgMin}>
        <img src={logo} alt="logo" />
      </figure>
    );
  }
  if (sidebarHidden) return null;

  return (
    <aside className={styles.sideBar}>
      <figure className={styles.logoImg}>
        <img src={logo} alt="logo" />
      </figure>
      <div className={styles.boardWrapper}>
        <BoardsList />
        <div className={styles.boardItemButton} onClick={modalAddBoard}>
          {boardIcon}
          <span>+ Create New Board</span>
        </div>
      </div>
      <div className={styles.themeSwitch}>
        <label>
          {lightThemeIcon}
          <div className={styles.themeSwitchToggle}>
            <input
              type="checkbox"
              name="themeSwitch"
              onClick={handleThemeSwitch}
            />
            <span></span>
          </div>
          {darkThemeIcon}
        </label>
      </div>
      <div className={styles.hiddenSwitch} onClick={handleHidden}>
        {hideSidebarIcon}
        <span>Hide Sidebar</span>
      </div>
    </aside>
  );
}

export default Sidebar;
