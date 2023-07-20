import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";

function PageLoading() {
  return (
    <div className="login loading">
      <div className="loading__title">Page is Loading ...</div>
      <IconContext.Provider value={{ size: "3rem", color: "#635fc7" }}>
        <TbLoader className="loading-icon" />
      </IconContext.Provider>
    </div>
  );
}

export default PageLoading;
