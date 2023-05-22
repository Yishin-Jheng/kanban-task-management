import Input from "../modal-components/Input";
import Dropdown from "../modal-components/Dropdown";
import Textarea from "../modal-components/Textarea";
import DeletableInput from "../modal-components/DeletableInput";

function NewOrEditTaskModal({ createOrNot, valueObj }) {
  const [title, btnText] = createOrNot
    ? ["Add New Task", "Create Task"]
    : ["Edit Task", "Save Changes"];

  return (
    <form className="modal" onSubmit={(e) => e.preventDefault()}>
      <div className="modal__title">
        <span>{title}</span>
      </div>

      <Input
        inputObj={{
          id: "new-task-title",
          title: "Title",
          placeholder: "e.g. Take coffee break",
        }}
      />

      <Textarea
        inputObj={{
          id: "new-task-description",
          title: "Description",
          placeholder:
            "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.",
        }}
      />

      <DeletableInput
        inputArr={[
          {
            id: 1,
            placeholder: "e.g. Make coffee",
          },
          {
            id: 2,
            placeholder: "e.g. Drink coffee & smile",
          },
        ]}
        subTitle={"Subtasks"}
        btnText={"+ Add New Subtask"}
      />

      <Dropdown
        selectObj={{
          title: "Status",
          selected: "Doing",
          options: ["Todo", "Doing", "Done"],
        }}
      />
      <button className="btn-medium btn-medium--primary">{btnText}</button>
    </form>
  );
}

export default NewOrEditTaskModal;
