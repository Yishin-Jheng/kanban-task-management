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
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [doCheckSession, isChecking] = useThunk(retrieveSession); // XXX: 這是在做什麼的？
  const session = useSelector((state) => state.users.data.session);
  const isMobile = useMediaQuery({ query: `(max-width: 670px)` });
  const showSidebarBackround = isMobile && !sidebarHidden;

  const handleHidden = function () {
    setSidebarHidden(!sidebarHidden);
  };

  // XXX: 雖然有解釋但看起來還是有點奇怪，是否還有更恰當的作法？
  // NOTE: 雖然 React 建議不要透過捕捉一個 state 的變化去改變另一個 state，
  // 但在 isMobile 維持 true 的情況下，sidebarHidden 第一次被更新之後又會在觸發一次 re-render，
  // 下一次的渲染中 sidebarHidden 又被更新，就又會在進行一次 re-render，最終變成無限循環。
  // 這個狀況似乎還是要使用 Effect 去控制 state 更新會比較恰當。
  useEffect(() => {
    if (isMobile) {
      setSidebarHidden(true);
    }
  }, [isMobile]);

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
            className="modal__background modal__background--header"
            onClick={handleHidden}
          />
        )}
        <Modal />
      </div>
    </SidebarContext.Provider>
  );
}

export default App;
