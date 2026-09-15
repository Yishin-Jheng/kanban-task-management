import { useContext, useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import {
  boardIcon,
  darkThemeIcon,
  hideSidebarIcon,
  lightThemeIcon,
} from "@/assets/icon";
import logoLight from "@/assets/logo-dark.svg";
import logoDark from "@/assets/logo-light.svg";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import BoardsList from "@/components/Sidebar/BoardsList";
import { SidebarContext } from "@/sidebarContext";
import { setActiveBoard, setModal } from "@/store";
import styles from "./Sidebar.module.scss";

function Sidebar({ isMobile }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { sidebarHidden, handleHidden } = useContext(SidebarContext);
  const [theme, setTheme] = useState("light");
  const logo = theme === "light" ? logoLight : logoDark;

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

  const { mutateAsync: doLogout, isPending: isPendingLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(setActiveBoard(0));
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== "session",
      });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  useEffect(() => {
    let themeRoot = document.querySelector("#theme-root");
    themeRoot.dataset.theme = theme;
  }, [theme]);

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
              onClick={() =>
                setTheme((pre) => (pre === "light" ? "dark" : "light"))
              }
            />
            <span></span>
          </div>
          {darkThemeIcon}
        </label>
      </div>
      <div className={styles.logoutButton} onClick={doLogout}>
        {isPendingLogout ? (
          <LoadingIcon size="2rem" />
        ) : (
          <BiLogOutCircle size="2rem" />
        )}
        <span>Log Out</span>
      </div>
      <div className={styles.hiddenSwitch} onClick={handleHidden}>
        {hideSidebarIcon}
        <span>Hide Sidebar</span>
      </div>
    </aside>
  );
}

export default Sidebar;
