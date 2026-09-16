import { useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import { closeModal } from "@/store/slices/modalSlice";
import styles from "../Modal.module.scss";

function SuccessModal() {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.modalTitle}>
        <span>Saved Successfully !</span>
      </div>
      <p className={styles.modalContent}>
        Save is done. Click button to close modal window.
      </p>
      <Button
        type="form"
        text="Close"
        onClick={() => {
          dispatch(closeModal());
        }}
      />
    </>
  );
}

export default SuccessModal;
