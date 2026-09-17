import Button from "@/components/Button/Button";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

/**
 * ErrorMessageModal
 * @param {string} props.errorTitle 標題
 * @param {string} props.errorMsg 內容
 */
function ErrorMessageModal(props) {
  const { errorTitle = "Something is wrong...", errorMsg = "" } = props;
  const { closeModal } = useModalStore.getState();

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{errorTitle}</span>
      </div>
      <p className={styles.modalContent}>{errorMsg}</p>
      <Button type="form" text="Close" onClick={closeModal} />
    </>
  );
}

export default ErrorMessageModal;
