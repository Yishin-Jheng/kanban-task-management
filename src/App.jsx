import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import { retrieveSession } from "@/api/auth";
import Board from "@/components/Board/Board";
import Header from "@/components/Header/Header";
import HiddenSwitch from "@/components/HiddenSwitch/HiddenSwitch";
import Login from "@/components/Login/Login";
import Modal from "@/components/Modal/Modal";
import PageLoading from "@/components/PageLoading/PageLoading";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useSidebarStore } from "@/store/useSidebarStore";
import styles from "./App.module.scss";

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 670px)" });
  const isSidebarHidden = useSidebarStore((store) => store.isSidebarHidden);
  const { toggleSidebar, setSidebarHidden } = useSidebarStore.getState();
  const showSidebarBackround = isMobile && !isSidebarHidden;

  const { data: isLogin, isPending: isPendingSession } = useQuery({
    queryKey: ["session"],
    queryFn: retrieveSession,
    select: (userData) => !!userData,
  });

  useEffect(() => {
    setSidebarHidden(window.matchMedia("(max-width: 670px)").matches);
  }, []);

  if (isPendingSession) {
    return <PageLoading />;
  }

  return (
    <>
      {!isLogin && <Login />}
      {isLogin && (
        <div
          className={styles.container}
          data-sidebar-hidden={isSidebarHidden ? "hidden" : ""}
        >
          <Header isMobile={isMobile} />
          <Sidebar isMobile={isMobile} />
          {isSidebarHidden && <HiddenSwitch />}
          <main
            className={styles.main}
            data-sidebar-hidden={isSidebarHidden ? "hidden" : ""}
            onWheel={(e) => {
              e.target.scrollLeft += e.deltaY;
            }}
          >
            <Board />
          </main>
          {showSidebarBackround && (
            <div
              className={styles.mobileSidebarBackground}
              onClick={toggleSidebar}
            />
          )}
        </div>
      )}
      <Modal />
    </>
  );
}

export default App;
