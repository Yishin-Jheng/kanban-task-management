import { useModalStore } from "@/store/useModalStore";
import styles from "./Modal.module.scss";

function ModalBackground({ isDisable }) {
  const { closeModal } = useModalStore.getState();
  return (
    <div
      className={styles.modalBackground}
      onClick={() => {
        if (!isDisable) {
          closeModal();
        }
      }}
    ></div>
  );
}

export default ModalBackground;
