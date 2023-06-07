import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setForm } from "../../store";
import Input from "../modal-components/Input";
import { Dropdown } from "../modal-components/Dropdown";
import Textarea from "../modal-components/Textarea";
import DeletableInput from "../modal-components/DeletableInput";

function NewOrEditTaskModal({ createOrNot, detailObj }) {
  const dispatch = useDispatch();
  const [subtasksData, statusData] = useSelector((state) => {
    const subtasksData = state.subtasks.data;
    const statusData = state.columns.data;
    return [subtasksData, statusData];
  });
  const [title, btnText] = createOrNot
    ? ["Add New Task", "Create Task"]
    : ["Edit Task", "Save Changes"];
  const itemsPlaceholderArr = [
    {
      id: 1,
      placeholder: "e.g. Make coffee",
    },
    {
      id: 2,
      placeholder: "e.g. Drink coffee & smile",
    },
  ];

  useEffect(() => {
    dispatch(
      setForm({
        title: createOrNot ? "" : detailObj.title,
        description: createOrNot ? "" : detailObj.description,
        status: createOrNot
          ? statusData[0].statusName
          : statusData[detailObj.columnId - 1].statusName,
        subtasks: createOrNot ? itemsPlaceholderArr : subtasksData,
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
        forBoardOrTask={"task"}
        subTitle={"Subtasks"}
        btnText={"+ Add New Subtask"}
      />

      <Dropdown
        selectObj={{
          title: "Status",
          options: statusData,
        }}
      />
      <button className="btn-medium btn-medium--primary">{btnText}</button>
    </form>
  );
}

export default NewOrEditTaskModal;
