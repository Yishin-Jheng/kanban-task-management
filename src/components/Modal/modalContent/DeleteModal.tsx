import { useMutation } from "@tanstack/react-query";
import { deleteBoard } from "@/api/boards";
import { deleteTask } from "@/api/tasks";
import Button from "@/components/Button/Button";
import type { DeleteTargetInfo } from "@/store/useModalStore";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

const typeSettingMap = {
  board: {
    mutateFunc: (id: number) => deleteBoard({ boardId: id }),
    getModalContent: (title: string) => {
      return `Are you sure you want to delete the ‘${title}’ board? This action
        will remove all columns and tasks and cannot be reversed.`;
    },
  },
  task: {
    mutateFunc: (id: number) => deleteTask({ taskId: id }),
    getModalContent: (title: string) => {
      return `Are you sure you want to delete the ‘${title}’ task and its subtasks? This action cannot be reversed.`;
    },
  },
};

interface DeleteModalProps {
  /** 元件類型 */
  type: keyof typeof typeSettingMap;
  /** 元件詳細資訊 */
  targetInfo: DeleteTargetInfo;
  /** 刪除成功後的 callback */
  onSuccess?: () => void;
}

function DeleteModal(props: DeleteModalProps) {
  const { type, targetInfo, onSuccess } = props;
  const { id, title } = targetInfo;
  const { setModal, closeModal } = useModalStore.getState();
  const setting = typeSettingMap[type];

  const { mutate: doDeleteItem, isPending: isPendingDeleteItem } = useMutation({
    mutationFn: setting.mutateFunc,
    onSuccess: () => {
      if (onSuccess) onSuccess();
      setModal({ modalType: "success" });
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
