import styles from "./Skeleton.module.scss";

/**
 * Skeleton
 * @param {number} numbers 顯示條數
 * @param {'board' | 'modal' | 'task' | 'subtask' | 'status' | 'title'} styleType 樣式類型
 */
function Skeleton(props) {
  const { numbers = 1, styleType = "task" } = props;

  const loadingBoxes = Array(numbers)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={styles.skeleton} data-type={styleType}>
          <div className={styles.skeletonInner} />
        </div>
      );
    });

  return loadingBoxes;
}

export default Skeleton;
