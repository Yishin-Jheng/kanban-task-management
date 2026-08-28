import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";
import styles from "./PageLoading.module.scss";

function PageLoading() {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.loadingTitle}>Page is Loading ...</div>
      <IconContext.Provider value={{ size: "3rem", color: "#635fc7" }}>
        {/* XXX: loading-icon常常重複利用，之後再看看怎麼抽 */}
        <TbLoader className="loading-icon" />
      </IconContext.Provider>
    </div>
  );
}

export default PageLoading;
