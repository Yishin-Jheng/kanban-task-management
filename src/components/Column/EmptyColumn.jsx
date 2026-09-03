import { TbMoodSadDizzy } from "react-icons/tb";
import { useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import { setModal } from "@/store";
import styles from "./EmptyColumn.module.scss";

/**
 * EmptyColumn
 * @param {boolean} props.isError 是否為取得資料失敗
 * @param {boolean} props.isBoardsEmpty 是否尚未建立任何版塊
 */
function EmptyColumn(props) {
  const { isError = false, isBoardsEmpty = false } = props;
  const dispatch = useDispatch();
  const modalEditBoard = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "boardModal",
        createOrNot: isBoardsEmpty,
      }),
    );
  };

  return (
    <div className={styles.empty}>
      {isError && (
        <>
          <TbMoodSadDizzy size="4rem" color="#635fc7" />
          <p className={styles.emptyDescription}>
            Get boards or columns failed. Please try again.
          </p>
        </>
      )}
      {!isError && (
        <>
          <p className={styles.emptyDescription}>
            {isBoardsEmpty
              ? "You have no boards. Create a new board to get started."
              : "This board is empty. Create a new column to get started."}
          </p>
          <Button
            text={`+ Add New ${isBoardsEmpty ? "Board" : "Column"}`}
            onClick={modalEditBoard}
          />
        </>
      )}
    </div>
  );
}

export default EmptyColumn;
