import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import Button from "@/components/Button/Button";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useThunk } from "@/hooks/useThunk";
import { deleteBoards, deleteTasks } from "@/store";
import { closeModal } from "@/store/slices/modalSlice";
import styles from "../Modal.module.scss";

function DeleteModal({ type, detailObj }) {
  const dispatch = useDispatch();
  const [activeBoardId] = useSelector((state) => {
    const activeBoardId = state.boards.activeBoardId;
    return [activeBoardId];
  });
  const [doDeleteTasks, isDeletingTasks] = useThunk(deleteTasks);
  const [doDeleteBoards, isDeletingBoards] = useThunk(deleteBoards);
  const isDeleting = isDeletingTasks || isDeletingBoards;

  const { data: boardName } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    select: (data) => {
      const activeBoard = data.find((board) => board.id === activeBoardId);
      return activeBoard?.boardName;
    },
  });

  const deleteActionMap = {
    task: () => doDeleteTasks({ taskId: detailObj.id }),
    board: () => doDeleteBoards({ boardId: activeBoardId }),
  };

  return (
    <>
      <div className={styles.modalDeleteTitle}>
        <span>{`Delete this ${type}?`}</span>
      </div>
      <p className={styles.modalContent}>
        {type === "task" &&
          `Are you sure you want to delete the ‘${detailObj.title}’ task and its subtasks? This action cannot be reversed.`}
        {type === "board" &&
          `Are you sure you want to delete the ‘${boardName}’ board? This action
        will remove all columns and tasks and cannot be reversed.`}
      </p>
      <div className={styles.modalDeleteBtns}>
        <Button
          type="formWarning"
          text="Delete"
          onClick={deleteActionMap[type]}
        >
          {!isDeleting && "Delete"}
          {isDeleting && <LoadingIcon color="#fff" />}
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
