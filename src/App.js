import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useThunk } from "./hooks/useThunk";
import { retrieveSession } from "./store";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HiddenSwitch from "./components/small-components/HiddenSwitch";
import PageLoading from "./components/PageLoading";
import Login from "./components/Login";
export const SidebarContext = createContext();

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [doCheckSession, isChecking, checkSessionError] =
    useThunk(retrieveSession);
  const session = useSelector((state) => state.users.data.session);
  const isMobile = useMediaQuery({ query: `(max-width: 670px)` });
  const showSidebarBackround = isMobile && !sidebarHidden;

  const handleHidden = function () {
    setSidebarHidden(!sidebarHidden);
  };

  useEffect(() => {
    doCheckSession();

    if (isMobile) {
      setSidebarHidden(true);
    }
  }, [isMobile, doCheckSession]);

  let content;
  if (isChecking) {
    content = <PageLoading />;
  } else {
    if (session) {
      content = (
        <SidebarContext.Provider value={{ sidebarHidden, handleHidden }}>
          <div
            className={`container ${
              sidebarHidden ? "min-sidebar__container" : ""
            }`}
          >
            <Header isMobile={isMobile} />

            <Sidebar isMobile={isMobile} />

            {sidebarHidden ? <HiddenSwitch /> : null}

            <main
              className={sidebarHidden ? "min-sidebar__main" : ""}
              onWheel={(e) => {
                e.target.scrollLeft += e.deltaY;
              }}
            >
              <Main />
            </main>

            {showSidebarBackround ? (
              <div
                className="modal__background modal__background--header"
                onClick={handleHidden}
              ></div>
            ) : null}

            <Modal />
          </div>
        </SidebarContext.Provider>
      );
    } else {
      content = (
        <>
          <Login />
          <Modal />
        </>
      );
    }
  }

  return content;
}

export default App;
