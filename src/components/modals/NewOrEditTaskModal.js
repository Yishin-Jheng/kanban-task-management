import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormData } from "../../hooks/useFormData";
import { useThunk } from "../../hooks/useThunk";
import { updateTasksByForm, createTasks, setModal } from "../../store";
import Input from "../modal-components/Input";
import Textarea from "../modal-components/Textarea";
import { Dropdown } from "../modal-components/Dropdown";
import { DeletableInput } from "../modal-components/DeletableInput";

function NewOrEditTaskModal({ createOrNot, detailObj }) {
  const dispatch = useDispatch();
  const [subtasksData, statusData] = useSelector((state) => {
    const subtasksData = state.subtasks.data;
    const statusData = state.columns.data;
    return [subtasksData, statusData];
  });
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [getFormData, handleFormChange] = useFormData();
  const [doCreateTask, isCreatingTask, createTaskError] = useThunk(createTasks);
  const [doUpdateTask, isUpdatingTask, updatingTaskError] =
    useThunk(updateTasksByForm);

  const formData = getFormData();
  const [title, btnText] = createOrNot
    ? ["Add New Task", "Create Task"]
    : ["Edit Task", "Save Changes"];

  const showLoadingModal = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "loadingModal",
        isLoading: true,
      })
    );
  };

  const handleSubmit = (formDataRef) => {
    return (e) => {
      const form = formDataRef().current;
      e.preventDefault();
      setCheckInvalid(true);

      if (form.title && form.description) {
        showLoadingModal();

        if (createOrNot) {
          doCreateTask({ ...form });
        } else {
          doUpdateTask({ taskId: detailObj.id, ...form });
        }
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
        label="Title"
        value={createOrNot ? "" : detailObj.title}
        placeholder="e.g. Take coffee break"
        handleFormChange={handleFormChange(formData, "title")}
      />

      <Textarea
        checkInvalid={checkInvalid}
        label="Description"
        value={createOrNot ? "" : detailObj.description}
        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        handleFormChange={handleFormChange(formData, "description")}
      />

      <DeletableInput
        checkInvalid={checkInvalid}
        label="Subtasks"
        btnLabel="+ Add New Subtask"
        valueKey="description"
        values={
          createOrNot
            ? [
                {
                  id: 1,
                  placeholder: "e.g. Make coffee",
                },
                {
                  id: 2,
                  placeholder: "e.g. Drink coffee & smile",
                },
              ]
            : subtasksData.filter((s) => s.taskId === detailObj.id)
        }
        handleFormChange={handleFormChange(formData, "subtasks")}
        handleFormDelete={handleFormChange(formData, "deletedSubtasks")}
      />

      <Dropdown
        label="Status"
        value={
          createOrNot
            ? statusData[0].statusName
            : statusData.find((col) => col.id === detailObj.columnId).statusName
        }
        options={statusData}
        handleFormChange={handleFormChange(formData, "columnId")}
      />

      <button
        className="btn-medium btn-medium--primary"
        disabled={isUpdatingTask || isCreatingTask}
      >
        {btnText}
      </button>
    </form>
  );
}

export default NewOrEditTaskModal;
