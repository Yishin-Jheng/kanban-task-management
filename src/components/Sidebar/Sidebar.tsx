import { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import {
  boardIcon,
  darkThemeIcon,
  hideSidebarIcon,
  lightThemeIcon,
} from "@/assets/icon";
import logoForLightTheme from "@/assets/logo-dark.svg";
import logoForDarkTheme from "@/assets/logo-light.svg";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import BoardsList from "@/components/Sidebar/BoardsList";
import { useModalStore } from "@/store/useModalStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import styles from "./Sidebar.module.scss";

type ThemeType = "light" | "dark";

interface SidebarProps {
  /** 是否為行動裝置 */
  isMobile: boolean;
}

function Sidebar(props: SidebarProps) {
  const { isMobile } = props;
  const isSidebarHidden = useSidebarStore((store) => store.isSidebarHidden);
  const { toggleSidebar } = useSidebarStore.getState();
  const { setModal } = useModalStore.getState();
  const [theme, setTheme] = useState<ThemeType>("light");
  const logo = theme === "light" ? logoForLightTheme : logoForDarkTheme;

  const modalAddBoard = () => {
    if (isMobile) toggleSidebar();
    setModal({
      modalType: "boardForm",
      isAddNew: true,
    });
  };

  const { mutate: doLogout, isPending: isPendingLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.reload();
    },
  });

  useEffect(() => {
    const themeRoot = document.querySelector<HTMLElement>("#theme-root");
    if (themeRoot) {
      themeRoot.dataset.theme = theme;
    }
  }, [theme]);

  if (isSidebarHidden && !isMobile) {
    return (
      <figure className={styles.logoImgMin}>
        <img src={logo} alt="logo" />
      </figure>
    );
  }

  return (
    <aside
      className={styles.sideBar}
      data-sidebar-hidden={isSidebarHidden ? "hidden" : ""}
    >
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
              checked={theme === "dark"}
              onChange={() =>
                setTheme((pre) => (pre === "light" ? "dark" : "light"))
              }
            />
            <span></span>
          </div>
          {darkThemeIcon}
        </label>
      </div>
      <div className={styles.logoutButton} onClick={() => doLogout()}>
        {isPendingLogout ? (
          <LoadingIcon size="2rem" />
        ) : (
          <BiLogOutCircle size="2rem" />
        )}
        <span>Log Out</span>
      </div>
      <div className={styles.hiddenSwitch} onClick={toggleSidebar}>
        {hideSidebarIcon}
        <span>Hide Sidebar</span>
      </div>
    </aside>
  );
}

export default Sidebar;
