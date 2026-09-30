import LoadingTask from "@/components/Column/LoadingTask";
import Skeleton from "@/components/Skeleton/Skeleton";
import styles from "./Column.module.scss";

interface LoadingColumnProps {
  colNumber: number;
}

function LoadingColumn(props: LoadingColumnProps) {
  const { colNumber } = props;

  return Array(colNumber)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={styles.column}>
        <Skeleton styleType="status" />
        <ul className={styles.columnBlock}>
          <LoadingTask taskNumber={3} />
        </ul>
      </div>
    ));
}

export default LoadingColumn;
