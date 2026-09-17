import Button from "@/components/Button/Button";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

function SuccessModal() {
  const { closeModal } = useModalStore.getState();
  return (
    <>
      <div className={styles.modalTitle}>
        <span>Saved Successfully !</span>
      </div>
      <p className={styles.modalContent}>
        Save is done. Click button to close modal window.
      </p>
      <Button type="form" text="Close" onClick={closeModal} />
    </>
  );
}

export default SuccessModal;
