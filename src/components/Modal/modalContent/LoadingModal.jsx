import { useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { closeModal } from "@/store/slices/modalSlice";
import styles from "../Modal.module.scss";

function LoadingModal({ isLoading }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.modalTitle}>
        <span>
          {isLoading ? "Is Saving Your Change Now..." : "Saved Successfully !"}
        </span>
      </div>
      <p className={styles.modalContent}>
        {isLoading
          ? "Please do not close this page before save is done."
          : "Save is done. Click button to close modal window."}
      </p>
      <Button
        type="form"
        isDisabled={isLoading}
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        {isLoading ? <LoadingIcon size="2rem" /> : "Close"}
      </Button>
    </>
  );
}

export default LoadingModal;
