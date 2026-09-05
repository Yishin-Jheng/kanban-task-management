import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getColumns } from "@/api/columns";
import { getSubtasks } from "@/api/subtasks";
import Button from "@/components/Button/Button";
import DotMenu from "@/components/DotMenu/DotMenu";
import CheckBox from "@/components/formComponents/CheckBox/CheckBox";
import { DropdownRequestVer } from "@/components/formComponents/Dropdown/Dropdown";
import Skeleton from "@/components/Skeleton/Skeleton";
import { setModal } from "@/store";
import styles from "../Modal.module.scss";

/**
 * TaskDetailModal
 * @param {{ id: number, columnId: number, title: string, description: string, totalSubNum: number }} props.detailObj 目標task的細節資訊
 */
function TaskDetailModal(props) {
  const { detailObj } = props;
  const taskId = detailObj.id;
  const dispatch = useDispatch();
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);

  const { data: columns = [] } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn: () => getColumns({ boardId: activeBoardId }),
    enabled: !!activeBoardId,
  });

  const activeStatus = columns.find((col) => col.id === detailObj.columnId);

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
        detailObj: detailObj,
      }),
    );
  };

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{detailObj.title}</span>
        <DotMenu position="modal" detailObj={detailObj} />
      </div>
      <p className={styles.modalContent}>{detailObj.description}</p>
      <div className={styles.subtask}>
        <span className={styles.modalSubtitle}>
          {`Subtasks (${finishedNum ?? "-"} of ${detailObj.totalSubNum})`}
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
              return <CheckBox key={subtask.id} itemObj={subtask} />;
            })}
        </div>
      </div>
      <DropdownRequestVer
        label="Current Status"
        value={activeStatus?.statusName}
        options={columns}
        taskId={detailObj.id}
      />
    </>
  );
}

export default TaskDetailModal;
