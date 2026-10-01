import Button from "@/components/Button/Button";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

interface DeleteModalProps {
  /** 標題 */
  errorTitle?: string;
  /** 內容 */
  errorMsg?: string;
}

function ErrorMessageModal(props: DeleteModalProps) {
  const { errorTitle = "Something is wrong...", errorMsg = "" } = props;
  const { closeModal } = useModalStore.getState();

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{errorTitle}</span>
      </div>
      <p className={styles.modalContent}>{errorMsg}</p>
      <Button type="form" onClick={closeModal}>
        Close
      </Button>
    </>
  );
}

export default ErrorMessageModal;
