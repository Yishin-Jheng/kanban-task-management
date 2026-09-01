import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import styles from "./PageLoading.module.scss";

function PageLoading() {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.loadingTitle}>Page is Loading ...</div>
      <LoadingIcon size="3rem" />
    </div>
  );
}

export default PageLoading;
