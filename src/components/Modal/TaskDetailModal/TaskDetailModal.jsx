import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getColumns } from "@/api/columns";
import { getSubtasks } from "@/api/subtasks";
import Button from "@/components/Button/Button";
import DotMenu from "@/components/DotMenu/DotMenu";
import { DropdownRequestVer } from "@/components/formComponents/Dropdown/Dropdown";
import SubtaskCheckbox from "@/components/Modal/TaskDetailModal/SubtaskCheckbox";
import Skeleton from "@/components/Skeleton/Skeleton";
import { setModal } from "@/store";
import styles from "../Modal.module.scss";

/**
 * TaskDetailModal
 * @param {{ id: number, columnId: number, title: string, description: string, totalSubNum: number,finishedSubNum: number }} props.taskInfo 任務詳細資訊
 */
function TaskDetailModal(props) {
  const { taskInfo } = props;
  const { id: taskId, columnId } = taskInfo;
  const dispatch = useDispatch();
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);

  const { data: columns = [] } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn: () => getColumns({ boardId: activeBoardId }),
    enabled: !!activeBoardId,
  });
  const activeStatus = columns.find((col) => col.id === columnId);

  const {
    data: subtasks,
    isFetching: isFetchingSubtasks,
    isError: isErrorSubtasks,
  } = useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getSubtasks({ taskId }),
    enabled: !!taskId,
  });
  const subtasksLength = subtasks?.length;
  const finishedNum = subtasks?.filter((subtask) => subtask.checkOrNot).length;
  const isShowSkeleton =
    isFetchingSubtasks && !isErrorSubtasks && !subtasksLength;

  const modalEditTask = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "taskModal",
        createOrNot: false,
        taskInfo: taskInfo,
      }),
    );
  };

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{taskInfo.title}</span>
        <DotMenu position="modal" taskInfo={taskInfo} />
      </div>
      <p className={styles.modalContent}>{taskInfo.description}</p>
      <div className={styles.subtask}>
        <span className={styles.modalSubtitle}>
          {`Subtasks (${finishedNum ?? "-"} of ${taskInfo.totalSubNum})`}
        </span>
        <div className={styles.subtaskContent}>
          {isShowSkeleton && <Skeleton numbers={3} styleType="modal" />}
          {!isShowSkeleton && !subtasksLength && (
            <>
              <div className={styles.subtaskMessage}>
                No subtask yet. Try to add a new one.
              </div>
              <Button
                type="form"
                text="+ New Subtask"
                onClick={modalEditTask}
              />
            </>
          )}
          {subtasksLength > 0 &&
            subtasks.map((subtask) => {
              return (
                <SubtaskCheckbox
                  key={subtask.id}
                  subtaskInfo={subtask}
                  taskId={taskId}
                  columnId={columnId}
                />
              );
            })}
        </div>
      </div>
      <DropdownRequestVer
        label="Current Status"
        value={activeStatus?.statusName ?? "-"}
        options={columns}
        taskId={taskId}
      />
    </>
  );
}

export default TaskDetailModal;
