import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormData } from "../../hooks/useFormData";
import { useThunk } from "../../hooks/useThunk";
import { createBoards, updateBoards, setModal } from "../../store";
import { DeletableInput } from "../modal-components/DeletableInput";
import Input from "../modal-components/Input";

function NewOrEditBoardModal({ createOrNot }) {
  const dispatch = useDispatch();
  const [boardsData, activeBoardId, statusData] = useSelector((state) => {
    const boardsData = state.boards.data;
    const activeBoardId = state.boards.activeBoardId;
    const statusData = state.columns.data;
    return [boardsData, activeBoardId, statusData];
  });
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [getFormData, handleFormChange] = useFormData();
  const [doCreateBoard, isCreatingBoard] = useThunk(createBoards);
  const [doUpdateBoard, isUpdatingBoard] = useThunk(updateBoards);

  const formData = getFormData();
  const [title, btnText] = createOrNot
    ? ["Add New Board", "Create New Board"]
    : ["Edit Board", "Save Changes"];

  const showLoadingModal = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "loadingModal",
        isLoading: true,
      })
    );
  };

  const handleSubmit = (formData) => {
    return (e) => {
      const form = formData().current;
      e.preventDefault();
      setCheckInvalid(true);

      if (form.boardName) {
        showLoadingModal();

        if (createOrNot) {
          doCreateBoard({ ...form });
        } else {
          doUpdateBoard({ boardId: activeBoardId, ...form });
        }
      }
    };
  };

  return (
    <>
      <div className="modal__title">
        <span>{title}</span>
      </div>

      <Input
        checkInvalid={checkInvalid}
        label="Board Name"
        type="text"
        value={
          createOrNot
            ? ""
            : boardsData.find((board) => board.id === activeBoardId).boardName
        }
        placeholder="e.g. Web Design"
        handleFormChange={handleFormChange(formData, "boardName")}
      />

      <DeletableInput
        checkInvalid={checkInvalid}
        label="Board Columns"
        btnLabel="+ Add New Column"
        valueKey="statusName"
        values={
          createOrNot
            ? [
                {
                  id: 1,
                  placeholder: "e.g. Todo",
                },
                {
                  id: 2,
                  placeholder: "e.g. Doing",
                },
              ]
            : statusData.filter((col) => col.boardId === activeBoardId)
        }
        handleFormChange={handleFormChange(formData, "columns")}
        handleFormDelete={handleFormChange(formData, "deletedColumns")}
      />

      <button
        className="btn-medium btn-medium--primary"
        disabled={isUpdatingBoard || isCreatingBoard}
        onClick={handleSubmit(getFormData)}
      >
        {btnText}
      </button>
    </>
  );
}

export default NewOrEditBoardModal;
