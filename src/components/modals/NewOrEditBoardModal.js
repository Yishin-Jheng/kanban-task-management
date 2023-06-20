import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormData } from "../../hooks/useFormData";
import Input from "../modal-components/Input";
import { DeletableInput } from "../modal-components/DeletableInput";

function NewOrEditBoardModal({ createOrNot }) {
  const [boardsData, activeBoardId, statusData] = useSelector((state) => {
    const boardsData = state.boards.data;
    const activeBoardId = state.boards.activeBoardId;
    const statusData = state.columns.data;
    return [boardsData, activeBoardId, statusData];
  });
  const { getFormData, handleFormChange } = useFormData();
  const formData = getFormData();
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [title, btnText] = createOrNot
    ? ["Add New Board", "Create New Board"]
    : ["Edit Board", "Save Changes"];

  const handleSubmit = (formData) => {
    return (e) => {
      const form = formData().current;
      e.preventDefault();
      setCheckInvalid(true);
      console.log(form);

      if (form.title) {
        // TODO: send update request to supabase
        console.log("Submit successfully!");
      }
    };
  };

  return (
    <form className="modal" onSubmit={handleSubmit(getFormData)}>
      <div className="modal__title">
        <span>{title}</span>
      </div>

      <Input
        checkInvalid={checkInvalid}
        label="Board Name"
        value={
          createOrNot
            ? ""
            : boardsData.find((board) => board.id === activeBoardId).boardName
        }
        placeholder="e.g. Web Design"
        handleFormChange={handleFormChange(formData, "title")}
      />

      <DeletableInput
        checkInvalid={checkInvalid}
        label="Board Columns"
        btnLabel="+ Add New Subtask"
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
      />

      <button className="btn-medium btn-medium--primary">{btnText}</button>
    </form>
  );
}

export default NewOrEditBoardModal;
