import { useModalStore } from "@/store/useModalStore";
import styles from "./Column.module.scss";

function NewColumn() {
  const { setModal } = useModalStore.getState();
  const modalEditBoard = () => {
    setModal({
      modalType: "boardForm",
      isAddNew: false,
    });
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnStatus}>
        <div className={styles.statusIcon}></div>
        <p className={styles.statusTitle}></p>
      </div>
      <div className={styles.newColumn} onClick={modalEditBoard}>
        + New Column
      </div>
    </div>
  );
}

export default NewColumn;
