import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useThunk } from "../../hooks/useThunk";
import { fetchSubtasks, setModal } from "../../store";
import DotMenu from "../small-components/DotMenu";
import CheckBox from "../modal-components/CheckBox";
import Dropdown from "../modal-components/Dropdown";
import Skeleton from "../small-components/Skeleton";

function TaskDetailModal({ detailObj }) {
  const dispatch = useDispatch();
  const [subtasksData, statusData] = useSelector((state) => {
    const subtasksData = state.subtasks.data;
    const statusData = state.columns.data;
    return [subtasksData, statusData];
  });
  const [doFetchSubtasks, isLoadingSubtasks, loadingSubtasksError] =
    useThunk(fetchSubtasks);
  const modalEditTask = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "taskModal",
        createOrNot: false,
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
            No subtask yet. Try to add new One.
          </div>
          <button className="btn-medium" onClick={modalEditTask}>
            + New Subtask
          </button>
        </>
      );
    }
  } else {
    subtaskContent = <Skeleton times={3} className="skeleton__outer--board" />;
  }

  useEffect(() => {
    doFetchSubtasks({ taskId: detailObj.id });
  }, [doFetchSubtasks]);

  return (
    <form className="modal">
      <div className="modal__title">
        <span>{detailObj.title}</span>
        <DotMenu position={"modal"} />
      </div>

      <p className="modal__content">{detailObj.description}</p>

      <div className="subtask">
        <span className="modal__subtitle">
          Subtasks ({detailObj.finishedSubNum} of {detailObj.totalSubNum})
        </span>

        {subtaskContent}
      </div>

      <Dropdown
        selectObj={{
          title: "Current Status",
          selected: "Doing",
          options: statusData.map((status) => status.statusName),
        }}
      />
    </form>
  );
}

export default TaskDetailModal;
