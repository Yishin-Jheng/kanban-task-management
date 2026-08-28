import { useDispatch } from "react-redux";
import { setModal } from "@/store";
import styles from "./EmptyColumn.module.scss";

function EmptyColumn() {
  const dispatch = useDispatch();
  const modalAddColumn = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "boardModal",
        createOrNot: false,
      }),
    );
  };

  return (
    <div className={styles.empty}>
      <p className={styles.emptyDescription}>
        This board is empty. Create a new column to get started.
      </p>
      {/* XXX: 待抽元件 */}
      <button className="btn" onClick={modalAddColumn}>
        + Add New Column
      </button>
    </div>
  );
}

export default EmptyColumn;
