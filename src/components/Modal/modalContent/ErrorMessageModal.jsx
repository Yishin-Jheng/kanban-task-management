import { useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import { closeModal } from "@/store/slices/modalSlice";
import styles from "../Modal.module.scss";

function ErrorMessageModal({ errorMsg }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.modalTitle}>
        <span>Something is wrong...</span>
      </div>
      <p className={styles.modalContent}>{errorMsg}</p>
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

export default ErrorMessageModal;
