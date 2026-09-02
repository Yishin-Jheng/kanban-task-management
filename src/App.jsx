import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Board from "@/components/Board/Board";
import Header from "@/components/Header/Header";
import HiddenSwitch from "@/components/HiddenSwitch/HiddenSwitch";
import Login from "@/components/Login/Login";
import Modal from "@/components/Modal/Modal";
import PageLoading from "@/components/PageLoading/PageLoading";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useThunk } from "@/hooks/useThunk";
import { retrieveSession } from "@/store";
import styles from "./App.module.scss";

export const SidebarContext = createContext();

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(
    () => window.matchMedia("(max-width: 670px)").matches,
  );
  const [doCheckSession, isChecking] = useThunk(retrieveSession); // XXX: 這是在做什麼的？
  const session = useSelector((state) => state.users.data.session);
  const isMobile = useMediaQuery({ query: "(max-width: 670px)" });
  const showSidebarBackround = isMobile && !sidebarHidden;

  const handleHidden = function () {
    setSidebarHidden(!sidebarHidden);
  };

  useEffect(() => {
    if (!session) {
      doCheckSession();
    }
  }, [session, doCheckSession]);

  if (isChecking) {
    return <PageLoading />;
  }

  if (!session) {
    return <Login />;
  }

  return (
    // XXX: 因為 context 會讓下面所有元件都重新渲染，看了就會很想全部換成 zustand
    <SidebarContext.Provider value={{ sidebarHidden, handleHidden }}>
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
          // XXX: onWheel是什麼捏？
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
        <Modal />
      </div>
    </SidebarContext.Provider>
  );
}

export default App;
