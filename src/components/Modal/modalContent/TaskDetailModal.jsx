import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import DotMenu from "@/components/DotMenu/DotMenu";
import CheckBox from "@/components/formComponents/CheckBox/CheckBox";
import { DropdownRequestVer } from "@/components/formComponents/Dropdown/Dropdown";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useThunk } from "@/hooks/useThunk";
import { fetchSubtasks, setModal } from "@/store";
import styles from "../Modal.module.scss";

function TaskDetailModal({ detailObj }) {
  const dispatch = useDispatch();
  const [subtasksData, finishedNum, statusData] = useSelector((state) => {
    const subtasksData = state.subtasks.data;
    const finishedNum = state.tasks.data.find(
      (task) => task.id === detailObj.id,
    ).finishedSubNum;
    const statusData = state.columns.data;
    return [subtasksData, finishedNum, statusData];
  });
  const [doFetchSubtasks, isLoadingSubtasks] = useThunk(fetchSubtasks);

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

  let subtaskContent;
  if (!isLoadingSubtasks) {
    if (subtasksData && subtasksData.length > 0) {
      subtaskContent = subtasksData.map((subtask) => {
        return <CheckBox key={subtask.id} itemObj={subtask} />;
      });
    } else {
      subtaskContent = (
        <>
          <div className={styles.subtaskMessage}>
            No subtask yet. Try to add a new one.
          </div>
          <Button type="form" text="+ New Subtask" onClick={modalEditTask} />
        </>
      );
    }
  } else {
    subtaskContent = <Skeleton numbers={3} styleType="modal" />;
  }

  useEffect(() => {
    doFetchSubtasks({ taskId: detailObj.id });
  }, [doFetchSubtasks]);

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{detailObj.title}</span>
        <DotMenu position="modal" detailObj={detailObj} />
      </div>

      <p className={styles.modalContent}>{detailObj.description}</p>

      <div className={styles.subtask}>
        <span className={styles.modalSubtitle}>
          {`Subtasks (${finishedNum === undefined ? "-" : finishedNum} of ${detailObj.totalSubNum})`}
        </span>
        <div className={styles.subtaskContent}>{subtaskContent}</div>
      </div>

      <DropdownRequestVer
        label="Current Status"
        value={
          statusData.find((col) => col.id === detailObj.columnId).statusName
        }
        options={statusData}
        taskId={detailObj.id}
      />
    </>
  );
}

export default TaskDetailModal;
