import { useSelector, useDispatch } from "react-redux";
import { useThunk } from "../../hooks/useThunk";
import { deleteTasks, deleteBoards } from "../../store";
import { closeModal } from "../../store/slices/modalSlice";
import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";

function DeleteModal({ boardOrTask, detailObj }) {
  const dispatch = useDispatch();
  const [boardsData, activeBoardId] = useSelector((state) => {
    const boardsData = state.boards.data;
    const activeBoardId = state.boards.activeBoardId;
    return [boardsData, activeBoardId];
  });
  const boardTitle = boardsData.find(
    (board) => board.id === activeBoardId
  ).boardName;
  const [doDeleteTasks, isDeletingTasks, deletingTasksError] =
    useThunk(deleteTasks);
  const [doDeleteBoards, isDeletingBoards, deletingBoardsError] =
    useThunk(deleteBoards);

  const handleDelete =
    boardOrTask === "task"
      ? () => doDeleteTasks({ taskId: detailObj.id })
      : () => doDeleteBoards({ boardId: activeBoardId });

  return (
    <form className="modal">
      <div className="modal__title modal__delete">
        <span>{`Delete this ${boardOrTask}?`}</span>
      </div>

      <p className="modal__content">
        {boardOrTask === "task"
          ? `Are you sure you want to delete the ‘${detailObj.title}’ task and its subtasks? This action cannot be reversed.`
          : `Are you sure you want to delete the ‘${boardTitle}’ board? This action
        will remove all columns and tasks and cannot be reversed.`}
      </p>

      <div className="modal__delete__btns">
        <div className="btn-medium btn-medium--warning" onClick={handleDelete}>
          {isDeletingTasks || isDeletingBoards ? (
            <IconContext.Provider value={{ size: "16px", color: "#fff" }}>
              <TbLoader className="loading-icon" />
            </IconContext.Provider>
          ) : (
            "Delete"
          )}
        </div>

        <div
          className="btn-medium"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </div>
      </div>
    </form>
  );
}

export default DeleteModal;
