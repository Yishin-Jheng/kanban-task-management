import Skeleton from "@/components/Skeleton/Skeleton";
import styles from "./Column.module.scss";

interface LoadingTaskProps {
  taskNumber: number;
}
function LoadingTask(props: LoadingTaskProps) {
  const { taskNumber } = props;

  return Array(taskNumber)
    .fill(0)
    .map((_, i) => {
      return (
        <li key={i} className={styles.loadingTask}>
          <Skeleton styleType="task" />
          <Skeleton styleType="subtask" />
        </li>
      );
    });
}

export default LoadingTask;
