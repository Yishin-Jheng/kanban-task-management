import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "@/api/boards";
import { deleteTask } from "@/api/tasks";
import Button from "@/components/Button/Button";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { closeModal, setActiveBoard, setModal } from "@/store";
import styles from "../Modal.module.scss";

const typeSettingMap = new Map([
  [
    "board",
    {
      mutateFunc: deleteBoard,
      mutateArgKey: "boardId",
      refetchQueryKey: ["boards"],
      getModalContent: (title) => {
        return `Are you sure you want to delete the ‘${title}’ board? This action
        will remove all columns and tasks and cannot be reversed.`;
      },
    },
  ],
  [
    "task",
    {
      mutateFunc: deleteTask,
      mutateArgKey: "taskId",
      refetchQueryKey: ["tasks"],
      getModalContent: (title) => {
        return `Are you sure you want to delete the ‘${title}’ task and its subtasks? This action cannot be reversed.`;
      },
    },
  ],
]);

/**
 * DeleteModal
 * @param {'board' | 'task'} props.type 元件類型
 * @param {{id: string | number, title: string}} props.detailObj 元件詳細資訊
 */
function DeleteModal(props) {
  const { type, detailObj } = props;
  const { id, title } = detailObj;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const setting = typeSettingMap.get(type) ?? {};

  const { mutateAsync: doDeleteItem, isPending: isPendingDeleteItem } =
    useMutation({
      mutationFn: setting.mutateFunc,
      onSuccess: () => {
        dispatch(
          setModal({
            isOpen: true,
            whichOpen: "loadingModal",
            isLoading: false,
          }),
        );
        queryClient.invalidateQueries({
          queryKey: setting.refetchQueryKey,
        });

        if (type === "board") {
          dispatch(setActiveBoard(null));
        }
      },
    });

  return (
    <>
      <div className={styles.modalDeleteTitle}>
        <span>{`Delete this ${type}?`}</span>
      </div>
      <p className={styles.modalContent}>{setting.getModalContent(title)}</p>
      <div className={styles.modalDeleteBtns}>
        <Button
          type="formWarning"
          text="Delete"
          onClick={() => {
            if (!isPendingDeleteItem && setting) {
              doDeleteItem({ [setting.mutateArgKey]: id });
            }
          }}
        >
          {!isPendingDeleteItem && "Delete"}
          {isPendingDeleteItem && <LoadingIcon color="#fff" />}
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
