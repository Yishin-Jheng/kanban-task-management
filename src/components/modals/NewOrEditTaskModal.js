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
    const subtasksData = state.subtasks.data.filter(
      (s) => s.taskId === detailObj.id
    );
    const statusData = state.columns.data;
    return [subtasksData, statusData];
  });
  const { getFormData, handleFormChange } = useFormData();
  const formData = getFormData();
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [doUpdateTask, isUpdatingTask_, updatingTaskError] =
    useThunk(updateTasksByForm);
  const [doCreateTask, isCreatingTask, createTaskError] = useThunk(createTasks);
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

  const handleSubmit = (formData) => {
    return (e) => {
      const form = formData().current;
      e.preventDefault();
      setCheckInvalid(true);

      if (form.title && form.description) {
        showLoadingModal();

        if (!createOrNot) {
          if (form.subtasks.length !== subtasksData.length)
            console.log(form.subtasks, subtasksData);

          // TODO: if there are some existing subtasks are deleted, we should also send a request to delete these subtasks when task is updating
          // 目前是考慮在送出表單時標記那些在本次修改中被刪除的既有任務，在thunck中再把他們挑出來進行刪除
          // doUpdateTask({ taskId: detailObj.id, ...form });
        }
        if (createOrNot) doCreateTask({ ...form });
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
            : subtasksData
        }
        handleFormChange={handleFormChange(formData, "subtasks")}
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

      <button className="btn-medium btn-medium--primary">{btnText}</button>
    </form>
  );
}

export default NewOrEditTaskModal;
