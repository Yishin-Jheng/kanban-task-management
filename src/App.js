import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HiddenSwitch from "./components/small-components/HiddenSwitch";

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 670px)` });
  const showBackround = isMobile && !sidebarHidden;

  const handleHidden = function () {
    setSidebarHidden(!sidebarHidden);
  };

  useEffect(() => {
    if (isMobile) {
      setSidebarHidden(true);
    }
  }, [isMobile]);

  return (
    <div
      className={`container ${sidebarHidden ? "min-sidebar__container" : ""}`}
    >
      <Header
        isMobile={isMobile}
        sidebarHidden={sidebarHidden}
        handleHidden={handleHidden}
      />
      <Sidebar
        isMobile={isMobile}
        sidebarHidden={sidebarHidden}
        handleHidden={handleHidden}
      />
      {sidebarHidden ? (
        <HiddenSwitch
          sidebarHidden={sidebarHidden}
          handleHidden={handleHidden}
        />
      ) : null}
      <main
        className={sidebarHidden ? "min-sidebar__main" : ""}
        onWheel={(e) => {
          e.target.scrollLeft += e.deltaY;
        }}
      >
        <Main />
      </main>

      {showBackround ? (
        <div
          className="modal__background modal__background--header"
          onClick={handleHidden}
        ></div>
      ) : null}

      <Modal />
    </div>
  );
}

export default App;
