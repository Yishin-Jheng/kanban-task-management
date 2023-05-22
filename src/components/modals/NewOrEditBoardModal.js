import Input from "../modal-components/Input";
import DeletableInput from "../modal-components/DeletableInput";

function NewOrEditBoardModal({ createOrNot, valueObj }) {
  const [title, btnText] = createOrNot
    ? ["Add New Board", "Create New Board"]
    : ["Edit Board", "Save Changes"];

  return (
    <form className="modal modal" onSubmit={(e) => e.preventDefault()}>
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
        inputArr={[
          {
            id: 1,
            placeholder: "e.g. Todo",
          },
          {
            id: 2,
            placeholder: "e.g. Doing",
          },
        ]}
        subTitle={"Board Columns"}
        btnText={"+ Add New Column"}
      />

      <button className="btn-medium btn-medium--primary">{btnText}</button>
    </form>
  );
}

export default NewOrEditBoardModal;
