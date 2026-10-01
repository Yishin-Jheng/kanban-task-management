import { useState } from "react";
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getColumns } from "@/api/columns";
import { getSubtasks } from "@/api/subtasks";
import type { Task } from "@/api/tasks";
import { updateTaskStatus } from "@/api/tasks";
import Button from "@/components/Button/Button";
import type { ButtonSetting } from "@/components/DotMenu/DotMenu";
import DotMenu from "@/components/DotMenu/DotMenu";
import Dropdown from "@/components/formComponents/Dropdown/Dropdown";
import SubtaskCheckbox from "@/components/Modal/modalContent/SubtaskCheckbox";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useBoardStore } from "@/store/useBoardStore";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

interface TaskDetailModalProps {
  /** 任務詳細資訊 */
  taskInfo: Task;
}

function TaskDetailModal(props: TaskDetailModalProps) {
  const { taskInfo } = props;
  const { id: taskId } = taskInfo;

  const queryClient = useQueryClient();
  const activeBoardId = useBoardStore((store) => store.activeBoardId);
  const { setModal } = useModalStore.getState();
  const [columnId, setColumnId] = useState(taskInfo.columnId);

  const { data: columns = [] } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn:
      typeof activeBoardId === "number"
        ? () => getColumns({ boardId: activeBoardId })
        : skipToken,
    select: (data) =>
      data.map((col) => ({ text: col.statusName, value: col.id })),
  });
  const activeStatus = columns.find((col) => col.value === columnId);

  const {
    data: subtasks = [],
    isFetching: isFetchingSubtasks,
    isError: isErrorSubtasks,
  } = useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getSubtasks({ taskId }),
  });
  const subtasksLength = subtasks.length;
  const finishedNum = subtasks.filter((subtask) => subtask.checkOrNot).length;
  const isShowSkeleton =
    isFetchingSubtasks && !isErrorSubtasks && !subtasksLength;

  const { mutate: doUpdateTaskStatus, isPending: isPendingUpdateTaskStatus } =
    useMutation({
      mutationFn: updateTaskStatus,
      onSuccess: (_, arg) => {
        setColumnId(arg.columnId);
        void queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
    });

  const modalEditTask = () => {
    setModal({
      modalType: "taskForm",
      isAddNew: false,
      task: taskInfo,
    });
  };
  const dotMenuSetting: ButtonSetting[] = [
    {
      btnType: "default",
      btnText: "Edit Task",
      onClick: modalEditTask,
    },
    {
      btnType: "warning",
      btnText: "Delete Task",
      onClick: () => {
        setModal({
          modalType: "delete",
          deleteType: "task",
          target: taskInfo,
        });
      },
    },
  ];

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{taskInfo.title}</span>
        <DotMenu settings={dotMenuSetting} />
      </div>
      <p className={styles.modalContent}>{taskInfo.description}</p>
      <div className={styles.subtask}>
        <span className={styles.modalSubtitle}>
          {`Subtasks (${finishedNum} of ${taskInfo.totalSubNum})`}
        </span>
        <div className={styles.subtaskContent}>
          {isShowSkeleton && <Skeleton numbers={3} styleType="modal" />}
          {!isShowSkeleton && subtasksLength === 0 && (
            <>
              <div className={styles.subtaskMessage}>
                No subtask yet. Try to add a new one.
              </div>
              <Button type="form" onClick={modalEditTask}>
                + New Subtask
              </Button>
            </>
          )}
          {subtasksLength > 0 &&
            subtasks.map((subtask) => {
              return (
                <SubtaskCheckbox
                  key={subtask.id}
                  subtaskInfo={subtask}
                  columnId={columnId}
                />
              );
            })}
        </div>
      </div>
      <Dropdown
        label="Current Status"
        value={activeStatus?.value}
        options={columns}
        isLoading={isPendingUpdateTaskStatus}
        onChange={(value) => {
          doUpdateTaskStatus({
            taskId,
            columnId: value,
          });
        }}
      />
    </>
  );
}

export default TaskDetailModal;
