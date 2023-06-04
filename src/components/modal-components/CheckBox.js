import { updateSubtasks } from "../../store";
import { useThunk } from "../../hooks/useThunk";
import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";

function CheckBox({ itemObj }) {
  const [doUpdateSubtasks, isLoadingSubtasks, loadingSubtasksError] =
    useThunk(updateSubtasks);

  return (
    <div className="subtask__box">
      <label
        className="subtask__checkbox"
        htmlFor={isLoadingSubtasks ? "" : `subtask-${itemObj.id}`}
      >
        {isLoadingSubtasks ? (
          <IconContext.Provider value={{ size: "16px", color: "#635fc7" }}>
            <TbLoader className="loading-icon" />
          </IconContext.Provider>
        ) : (
          <>
            <input
              id={`subtask-${itemObj.id}`}
              type="checkbox"
              defaultChecked={itemObj.checkOrNot}
              onChange={() => {
                doUpdateSubtasks({
                  currentCheck: itemObj.checkOrNot,
                  subtaskId: itemObj.id,
                });
              }}
            />
            <span className="checkmark"></span>
          </>
        )}

        <p>{itemObj.description}</p>
      </label>
    </div>
  );
}

export default CheckBox;
