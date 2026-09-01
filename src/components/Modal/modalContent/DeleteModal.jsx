import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useThunk } from "@/hooks/useThunk";
import { deleteBoards, deleteTasks } from "@/store";
import { closeModal } from "@/store/slices/modalSlice";
import styles from "../Modal.module.scss";

function DeleteModal({ boardOrTask, detailObj }) {
  const dispatch = useDispatch();
  const [boardsData, activeBoardId] = useSelector((state) => {
    const boardsData = state.boards.data;
    const activeBoardId = state.boards.activeBoardId;
    return [boardsData, activeBoardId];
  });
  const boardTitle = boardsData.find(
    (board) => board.id === activeBoardId,
  ).boardName;
  const [doDeleteTasks, isDeletingTasks] = useThunk(deleteTasks);
  const [doDeleteBoards, isDeletingBoards] = useThunk(deleteBoards);

  const handleDelete =
    boardOrTask === "task"
      ? () => doDeleteTasks({ taskId: detailObj.id })
      : () => doDeleteBoards({ boardId: activeBoardId });

  return (
    <>
      <div className={styles.modalDeleteTitle}>
        <span>{`Delete this ${boardOrTask}?`}</span>
      </div>

      <p className={styles.modalContent}>
        {boardOrTask === "task"
          ? `Are you sure you want to delete the ‘${detailObj.title}’ task and its subtasks? This action cannot be reversed.`
          : `Are you sure you want to delete the ‘${boardTitle}’ board? This action
        will remove all columns and tasks and cannot be reversed.`}
      </p>

      <div className={styles.modalDeleteBtns}>
        <Button type="formWarning" text="Delete" onClick={handleDelete}>
          {isDeletingTasks || isDeletingBoards ? (
            <LoadingIcon color="#fff" />
          ) : (
            "Delete"
          )}
        </Button>
        <Button
          type="form"
          text="Cancel"
          onClick={() => dispatch(closeModal())}
        />
      </div>
    </>
  );
}

export default DeleteModal;
