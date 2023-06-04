import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setForm } from "../../store";
import Input from "../modal-components/Input";
import DeletableInput from "../modal-components/DeletableInput";

function NewOrEditBoardModal({ createOrNot }) {
  const dispatch = useDispatch();
  const [boardsData, activeBoardId, statusData] = useSelector((state) => {
    const boardsData = state.boards.data;
    const activeBoardId = state.boards.activeBoardId;
    const statusData = state.columns.data;
    return [boardsData, activeBoardId, statusData];
  });
  const [title, btnText] = createOrNot
    ? ["Add New Board", "Create New Board"]
    : ["Edit Board", "Save Changes"];
  const itemsPlaceholderArr = [
    {
      id: 1,
      placeholder: "e.g. Todo",
    },
    {
      id: 2,
      placeholder: "e.g. Doing",
    },
  ];

  useEffect(() => {
    dispatch(
      setForm({
        title: createOrNot
          ? ""
          : boardsData.find((board) => board.id === activeBoardId).boardName,
        columns: createOrNot ? itemsPlaceholderArr : statusData,
      })
    );
  }, []);

  return (
    <form className="modal" onSubmit={(e) => e.preventDefault()}>
      <div className="modal__title">
        <span>{title}</span>
      </div>

      <Input
        inputObj={{
          id: "new-board-name",
          title: "Board Name",
          placeholder: "e.g. Web Design",
        }}
      />

      <DeletableInput
        inputArr={"board"}
        subTitle={"Board Columns"}
        btnText={"+ Add New Column"}
      />

      <button className="btn-medium btn-medium--primary">{btnText}</button>
    </form>
  );
}

export default NewOrEditBoardModal;
