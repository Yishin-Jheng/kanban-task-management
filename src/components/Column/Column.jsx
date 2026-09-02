import { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useThunk } from "@/hooks/useThunk";
import { fetchTasks, setModal } from "@/store";
import styles from "./Column.module.scss";

const loadingTask = (numbers) => {
  return Array(numbers)
    .fill(0)
    .map((_, i) => {
      return (
        <li key={i} className={styles.loadingTask}>
          <Skeleton styleType="task" />
          <Skeleton styleType="subtask" />
        </li>
      );
    });
};

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

function LoadingColumn({ numbers }) {
  const columnContent = Array(numbers)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={styles.column}>
          <Skeleton styleType="status" />
          <ul className={styles.columnBlock}>{loadingTask(3)}</ul>
        </div>
      );
    });

  return columnContent;
}

export { Column, LoadingColumn, NewColumn };
