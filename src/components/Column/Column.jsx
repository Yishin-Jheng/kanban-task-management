import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { setModal, fetchTasks } from "@/store";
import { useThunk } from "@/hooks/useThunk";
import Skeleton from "@/components/smallComponents/Skeleton";
import styles from "./Column.module.scss";

function Column({ statusName, decorationColor, columnId, isUpdatingTasks }) {
  const dispatch = useDispatch();
  const { data: tasksData } = useSelector((state) => {
    return state.tasks;
  });
  const [doFetchTasks, isLoadingTasks] = useThunk(fetchTasks);
  const tasksDataOfThisColumn = tasksData.filter(
    (task) => task.columnId === columnId,
  );

  const modalTaskDetail = (taskObj) => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "taskDetail",
        detailObj: taskObj,
      }),
    );
  };

  const loadingTask = (times) => {
    return Array(times)
      .fill(0)
      .map((_, i) => {
        return (
          <li key={i} className={styles.task}>
            {/* XXX: 待抽元件 */}
            <Skeleton times={1} className="skeleton__outer--task" />
            <Skeleton times={1} className="skeleton__outer--subtask" />
          </li>
        );
      });
  };

  useEffect(() => {
    if (tasksDataOfThisColumn.length < 1) {
      doFetchTasks({ columnId });
    }
  }, [doFetchTasks]);

  return (
    <div className={styles.column}>
      <div className={styles.columnStatus}>
        <div
          className={styles.statusIcon}
          style={{ backgroundColor: decorationColor }}
        >
          &nbsp;
        </div>
        <p
          className={styles.statusTitle}
        >{`${statusName} (${tasksDataOfThisColumn.length})`}</p>
      </div>

      <Droppable
        droppableId={columnId.toString()}
        isDropDisabled={isLoadingTasks}
      >
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className={styles.columnBlock}
            {...provided.droppableProps}
          >
            {isLoadingTasks
              ? loadingTask(3)
              : tasksDataOfThisColumn.map((task, index) => (
                  <Draggable
                    key={task.id}
                    index={index}
                    draggableId={task.id.toString()}
                    isDragDisabled={isUpdatingTasks}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        className={styles.task}
                        onClick={() => {
                          modalTaskDetail(task);
                        }}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <p className={styles.taskDescription}>{task.title}</p>
                        <p className={styles.subtask}>
                          {task.finishedSubNum} of {task.totalSubNum} subtasks
                        </p>
                      </li>
                    )}
                  </Draggable>
                ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

function NewColumn() {
  const dispatch = useDispatch();
  const modalEditBoard = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "boardModal",
        createOrNot: false,
      }),
    );
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnStatus}>
        <div className={styles.statusIcon}></div>
        <p className={styles.statusTitle}></p>
      </div>

      <div className={styles.newColumn} onClick={modalEditBoard}>
        + New Column
      </div>
    </div>
  );
}

function LoadingColumn({ times }) {
  const columnContent = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={styles.column}>
          <Skeleton times={1} className="skeleton__outer--status" />

          <ul className={styles.columnBlock}>
            <li className={styles.task}>
              <Skeleton times={1} className="skeleton__outer--task" />
              <Skeleton times={1} className="skeleton__outer--subtask" />
            </li>
            <li className={styles.task}>
              <Skeleton times={1} className="skeleton__outer--task" />
              <Skeleton times={1} className="skeleton__outer--subtask" />
            </li>
            <li className={styles.task}>
              <Skeleton times={1} className="skeleton__outer--task" />
              <Skeleton times={1} className="skeleton__outer--subtask" />
            </li>
          </ul>
        </div>
      );
    });

  return columnContent;
}

export { Column, NewColumn, LoadingColumn };
