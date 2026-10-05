import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/api/tasks";
import { getTasks } from "@/api/tasks";
import LoadingTask from "@/components/Column/LoadingTask";
import { useModalStore } from "@/store/useModalStore";
import styles from "./Column.module.scss";

interface ColumnProps {
  /** 狀態名稱 */
  statusName: string;
  /** 裝飾色 */
  decorationColor: string;
  /** 狀態列ID */
  columnId: number;
  /** 是否禁用拖曳 */
  isDragDisabled?: boolean;
}

function Column(props: ColumnProps) {
  const {
    statusName,
    decorationColor,
    columnId,
    isDragDisabled = false,
  } = props;
  const { setModal } = useModalStore.getState();

  const {
    data: tasks = [],
    isFetching: isFetchingTasks,
    isError: isErrorTasks,
  } = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => getTasks({ columnId }),
    enabled: !!columnId,
  });

  const tasksLength = tasks.length;
  const isShowSkeleton = isFetchingTasks && !isErrorTasks && !tasksLength;

  const modalTaskDetail = (taskObj: Task) => {
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
        <p className={styles.statusTitle}>{`${statusName} (${tasksLength})`}</p>
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
            {isShowSkeleton && <LoadingTask taskNumber={3} />}
            {tasksLength > 0 &&
              tasks.map((task, index) => {
                return (
                  <Draggable
                    key={task.id}
                    index={index}
                    draggableId={String(task.id)}
                    isDragDisabled={isDragDisabled}
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

export default Column;
