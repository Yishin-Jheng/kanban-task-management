import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/tasks";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useModalStore } from "@/store/useModalStore";
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

/**
 * Column
 * @param {string} props.statusName 狀態名稱
 * @param {string} props.decorationColor 裝飾色
 * @param {number} props.columnId 狀態列ID
 * @param {boolean} props.isLoading 是否載入中
 */
function Column(props) {
  const { statusName, decorationColor, columnId, isLoading } = props;
  const { setModal } = useModalStore.getState();

  const {
    data: tasks,
    isFetching: isFetchingTasks,
    isError: isErrorTasks,
  } = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => getTasks({ columnId }),
    enabled: !!columnId,
  });

  const tasksLength = tasks?.length;
  const isShowSkeleton = isFetchingTasks && !isErrorTasks && !tasksLength;

  const modalTaskDetail = (taskObj) => {
    setModal({
      modalType: "taskDetail",
      task: taskObj,
    });
  };

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
        >{`${statusName} (${tasksLength ?? "-"})`}</p>
      </div>
      <Droppable
        droppableId={columnId.toString()}
        isDropDisabled={isShowSkeleton}
      >
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className={styles.columnBlock}
            {...provided.droppableProps}
          >
            {isShowSkeleton && loadingTask(3)}
            {tasksLength > 0 &&
              tasks.map((task, index) => {
                return (
                  <Draggable
                    key={task.id}
                    index={index}
                    draggableId={String(task.id)}
                    isDragDisabled={isLoading}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        className={styles.task}
                        onClick={() => modalTaskDetail(task)}
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
                );
              })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

function NewColumn() {
  const { setModal } = useModalStore.getState();
  const modalEditBoard = () => {
    setModal({
      modalType: "boardForm",
      isAddNew: false,
    });
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
  return Array(numbers)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={styles.column}>
        <Skeleton styleType="status" />
        <ul className={styles.columnBlock}>{loadingTask(3)}</ul>
      </div>
    ));
}

export { Column, LoadingColumn, NewColumn };
