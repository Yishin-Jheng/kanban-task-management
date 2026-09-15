import { useState } from "react";
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
import { SidebarContext } from "@/sidebarContext";
import styles from "./App.module.scss";

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(
    () => window.matchMedia("(max-width: 670px)").matches,
  );
  const isMobile = useMediaQuery({ query: "(max-width: 670px)" });
  const showSidebarBackround = isMobile && !sidebarHidden;

  const handleHidden = function () {
    setSidebarHidden(!sidebarHidden);
  };

  const { data: isLogin, isPending: isPendingSession } = useQuery({
    queryKey: ["session"],
    queryFn: retrieveSession,
    select: (userData) => !!userData,
  });

  if (isPendingSession) {
    return <PageLoading />;
  }

  return (
    // XXX: 因為 context 會讓下面所有元件都重新渲染，看了就會很想全部換成 zustand
    <SidebarContext.Provider value={{ sidebarHidden, handleHidden }}>
      {!isLogin && <Login />}
      {isLogin && (
        <div
          className={styles.container}
          data-sidebar-hidden={sidebarHidden ? "sidebarHidden" : ""}
        >
          <Header isMobile={isMobile} />
          <Sidebar isMobile={isMobile} />
          {sidebarHidden && <HiddenSwitch />}
          <main
            className={styles.main}
            data-sidebar-hidden={sidebarHidden ? "sidebarHidden" : ""}
            onWheel={(e) => {
              e.target.scrollLeft += e.deltaY;
            }}
          >
            <Board />
          </main>
          {showSidebarBackround && (
            <div
              className={styles.mobileSidebarBackground}
              onClick={handleHidden}
            />
          )}
        </div>
      )}
      <Modal />
    </SidebarContext.Provider>
  );
}

export default App;
