import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import { DeletableInput } from "@/components/formComponents/DeletableInput/DeletableInput";
import { Dropdown } from "@/components/formComponents/Dropdown/Dropdown";
import Input from "@/components/formComponents/Input/Input";
import Textarea from "@/components/formComponents/Textarea/Textarea";
import { useFormData } from "@/hooks/useFormData";
import { useThunk } from "@/hooks/useThunk";
import { createTasks, setModal, updateTasksByForm } from "@/store";
import styles from "../Modal.module.scss";

function NewOrEditTaskModal({ createOrNot, detailObj }) {
  const dispatch = useDispatch();
  const [subtasksData, statusData] = useSelector((state) => {
    const subtasksData = state.subtasks.data;
    const statusData = state.columns.data;
    return [subtasksData, statusData];
  });
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [getFormData, handleFormChange] = useFormData();
  const [doCreateTask, isCreatingTask] = useThunk(createTasks);
  const [doUpdateTask, isUpdatingTask] = useThunk(updateTasksByForm);

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
      }),
    );
  };

  // BUG: 任務狀態沒有正常變更
  const handleSubmit = (formDataRef) => {
    return () => {
      const form = formDataRef().current;
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
    <>
      <div className={styles.modalTitle}>
        <span>{title}</span>
      </div>
      <Input
        checkInvalid={checkInvalid}
        label="Title"
        type="text"
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
      <Button
        type="formPrimary"
        text={btnText}
        isDisabled={isUpdatingTask || isCreatingTask}
        onClick={handleSubmit(getFormData)}
      />
    </>
  );
}

export default NewOrEditTaskModal;
