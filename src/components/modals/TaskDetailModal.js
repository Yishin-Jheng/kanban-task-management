import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useThunk } from "../../hooks/useThunk";
import { fetchSubtasks, setModal } from "../../store";
import DotMenu from "../small-components/DotMenu";
import CheckBox from "../modal-components/CheckBox";
import Skeleton from "../small-components/Skeleton";
import { DropdownRequestVer } from "../modal-components/Dropdown";

function TaskDetailModal({ detailObj }) {
  const dispatch = useDispatch();
  const [subtasksData, finishedNum, statusData] = useSelector((state) => {
    const subtasksData = state.subtasks.data;
    const finishedNum = state.tasks.data.find(
      (task) => task.id === detailObj.id
    ).finishedSubNum;
    const statusData = state.columns.data;
    return [subtasksData, finishedNum, statusData];
  });
  const [doFetchSubtasks, isLoadingSubtasks, loadingSubtasksError] =
    useThunk(fetchSubtasks);

  const modalEditTask = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "taskModal",
        createOrNot: false,
        detailObj: detailObj,
      })
    );
  };

  let subtaskContent;
  if (!isLoadingSubtasks) {
    if (subtasksData.length > 0) {
      subtaskContent = subtasksData.map((subtask) => {
        return <CheckBox key={subtask.id} itemObj={subtask} />;
      });
    } else {
      subtaskContent = (
        <>
          <div className="subtask__message">
            No subtask yet. Try to add a new one.
          </div>
          <div className="btn-medium" onClick={modalEditTask}>
            + New Subtask
          </div>
        </>
      );
    }
  } else {
    subtaskContent = <Skeleton times={3} className="skeleton__outer--modal" />;
  }

  useEffect(() => {
    doFetchSubtasks({ taskId: detailObj.id });
  }, [doFetchSubtasks]);

  return (
    <form className="modal">
      <div className="modal__title">
        <span>{detailObj.title}</span>
        <DotMenu position={"modal"} detailObj={detailObj} />
      </div>

      <p className="modal__content">{detailObj.description}</p>

      <div className="subtask">
        <span className="modal__subtitle">
          Subtasks ({finishedNum} of {detailObj.totalSubNum})
        </span>

        {subtaskContent}
      </div>

      <DropdownRequestVer
        selectObj={{
          title: "Current Status",
          taskId: detailObj.id,
          options: statusData,
          selected: statusData[detailObj.columnId - 1].statusName,
        }}
      />
    </form>
  );
}

export default TaskDetailModal;
