import { useDispatch } from "react-redux";
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

      <div>
        {/* XXX: 待抽元件 */}
        <div
          className="btn-medium"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Close
        </div>
      </div>
    </>
  );
}

export default ErrorMessageModal;
