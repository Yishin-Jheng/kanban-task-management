import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "@/api/boards";
import { deleteTask } from "@/api/tasks";
import Button from "@/components/Button/Button";
import { useBoardStore } from "@/store/useBoardStore";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

const typeSettingMap = {
  board: {
    mutateFunc: (id: number) => deleteBoard({ boardId: id }),
    refetchQueryKey: ["boards"],
    getModalContent: (title: string) => {
      return `Are you sure you want to delete the ‘${title}’ board? This action
        will remove all columns and tasks and cannot be reversed.`;
    },
  },
  task: {
    mutateFunc: (id: number) => deleteTask({ taskId: id }),
    refetchQueryKey: ["tasks"],
    getModalContent: (title: string) => {
      return `Are you sure you want to delete the ‘${title}’ task and its subtasks? This action cannot be reversed.`;
    },
  },
};

interface DeleteModalProps {
  /** 元件類型 */
  type: keyof typeof typeSettingMap;
  /** 元件詳細資訊 */
  targetInfo: { id: number; title: string };
}

function DeleteModal(props: DeleteModalProps) {
  const { type, targetInfo } = props;
  const { id, title } = targetInfo;
  const { setActiveBoard } = useBoardStore.getState();
  const { setModal, closeModal } = useModalStore.getState();
  const queryClient = useQueryClient();
  const setting = typeSettingMap[type];

  const { mutate: doDeleteItem, isPending: isPendingDeleteItem } = useMutation({
    mutationFn: setting.mutateFunc,
    onSuccess: () => {
      if (type === "board") {
        setActiveBoard(null);
      }
      setModal({ modalType: "success" });
      void queryClient.invalidateQueries({
        queryKey: setting.refetchQueryKey,
      });
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
          isLoading={isPendingDeleteItem}
          onClick={() => {
            doDeleteItem(id);
          }}
        >
          Delete
        </Button>
        <Button type="form" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default DeleteModal;
