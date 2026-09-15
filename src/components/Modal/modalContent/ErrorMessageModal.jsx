import { useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import { closeModal } from "@/store/slices/modalSlice";
import styles from "../Modal.module.scss";

/**
 * ErrorMessageModal
 * @param {string} props.errorTitle 標題
 * @param {string} props.errorMsg 內容
 */
function ErrorMessageModal(props) {
  const { errorTitle = "Something is wrong...", errorMsg = "" } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{errorTitle}</span>
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
