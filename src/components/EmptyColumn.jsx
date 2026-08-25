import { useDispatch } from "react-redux";
import { setModal } from "../store";

function EmptyColumn() {
  const dispatch = useDispatch();
  const modalAddColumn = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "boardModal",
        createOrNot: false,
      })
    );
  };

  return (
    <div className="empty">
      <p className="empty__title">
        This board is empty. Create a new column to get started.
      </p>
      <button className="btn" onClick={modalAddColumn}>
        + Add New Column
      </button>
    </div>
  );
}

export default EmptyColumn;
