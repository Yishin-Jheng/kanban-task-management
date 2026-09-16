import { useDispatch } from "react-redux";
import { closeModal } from "@/store";
import styles from "./Modal.module.scss";

function ModalBackground({ isDisable }) {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.modalBackground}
      onClick={() => {
        if (!isDisable) {
          dispatch(closeModal());
        }
      }}
    ></div>
  );
}

export default ModalBackground;
