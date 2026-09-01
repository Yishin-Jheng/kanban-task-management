import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useThunk } from "@/hooks/useThunk";
import { updateSubtasks, updateTasksSubNum } from "@/store";
import styles from "./CheckBox.module.scss";

function CheckBox({ itemObj }) {
  const [doUpdateSubtasks, isLoadingSubtasks] = useThunk(updateSubtasks);
  const [doUpdateTasks, isLoadingTasks] = useThunk(updateTasksSubNum);

  return (
    <div className={styles.checkboxWrapper}>
      <label
        className={styles.checkboxLabel}
        htmlFor={
          isLoadingSubtasks || isLoadingTasks ? "" : `subtask-${itemObj.id}`
        }
      >
        {isLoadingSubtasks || isLoadingTasks ? (
          <LoadingIcon />
        ) : (
          <>
            <input
              id={`subtask-${itemObj.id}`}
              type="checkbox"
              defaultChecked={itemObj.checkOrNot}
              onChange={() => {
                doUpdateSubtasks({
                  currentCheck: itemObj.checkOrNot,
                  subtaskId: itemObj.id,
                });
                doUpdateTasks({
                  taskId: itemObj.taskId,
                  subNum: itemObj.checkOrNot ? -1 : 1,
                });
              }}
            />
            <span className={styles.checkmark}></span>
          </>
        )}

        <p>{itemObj.description}</p>
      </label>
    </div>
  );
}

export default CheckBox;
