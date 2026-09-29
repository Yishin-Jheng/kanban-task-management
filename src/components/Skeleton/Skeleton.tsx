import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  /** 顯示數量 */
  numbers?: number;
  /** 樣式類型 */
  styleType?: "board" | "modal" | "task" | "subtask" | "status" | "title";
}

function Skeleton(props: SkeletonProps) {
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
