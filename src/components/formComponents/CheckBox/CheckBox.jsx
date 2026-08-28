import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";
import { updateSubtasks, updateTasksSubNum } from "@/store";
import { useThunk } from "@/hooks/useThunk";
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
          <IconContext.Provider value={{ size: "16px", color: "#635fc7" }}>
            {/* XXX: loading-icon常常重複利用，之後再看看怎麼抽 */}
            <TbLoader className="loading-icon" />
          </IconContext.Provider>
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
