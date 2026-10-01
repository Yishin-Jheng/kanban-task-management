import { useModalStore } from "@/store/useModalStore";
import styles from "./Modal.module.scss";

interface ModalBackgroundProps {
  /** 是否禁用 */
  isDisabled?: boolean;
}

function ModalBackground(props: ModalBackgroundProps) {
  const { isDisabled } = props;
  const { closeModal } = useModalStore.getState();

  return (
    <div
      className={styles.modalBackground}
      onClick={() => {
        if (!isDisabled) {
          closeModal();
        }
      }}
    ></div>
  );
}

export default ModalBackground;
