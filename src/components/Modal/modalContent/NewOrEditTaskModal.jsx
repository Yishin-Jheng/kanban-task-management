import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getColumns } from "@/api/columns";
import Button from "@/components/Button/Button";
import { DeletableInput } from "@/components/formComponents/DeletableInput/DeletableInput";
import { Dropdown } from "@/components/formComponents/Dropdown/Dropdown";
import Input from "@/components/formComponents/Input/Input";
import Textarea from "@/components/formComponents/Textarea/Textarea";
import { useFormData } from "@/hooks/useFormData";
import { useThunk } from "@/hooks/useThunk";
import { createTasks, setModal, updateTasksByForm } from "@/store";
import styles from "../Modal.module.scss";

const exampleInputs = [
  {
    id: 1,
    placeholder: "e.g. Make coffee",
  },
  {
    id: 2,
    placeholder: "e.g. Drink coffee & smile",
  },
];

function NewOrEditTaskModal({ createOrNot, detailObj }) {
  const dispatch = useDispatch();
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);
  const subtasksData = useSelector((state) => state.subtasks.data);
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [getFormData, handleFormChange] = useFormData();
  const [doCreateTask, isCreatingTask] = useThunk(createTasks);
  const [doUpdateTask, isUpdatingTask] = useThunk(updateTasksByForm);

  const formData = getFormData();

  const { data: columns = [] } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn: () => getColumns({ boardId: activeBoardId }),
    enabled: !!activeBoardId,
  });

  const activeStatus = createOrNot
    ? columns[0]
    : columns.find((col) => col.id === detailObj.columnId);

  const showLoadingModal = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "loadingModal",
        isLoading: true,
      }),
    );
  };

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
        <span>{createOrNot ? "Add New Task" : "Edit Task"}</span>
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
            ? exampleInputs
            : subtasksData.filter((s) => s.taskId === detailObj.id)
        }
        handleFormChange={handleFormChange(formData, "subtasks")}
        handleFormDelete={handleFormChange(formData, "deletedSubtasks")}
      />
      <Dropdown
        label="Status"
        value={activeStatus?.statusName}
        options={columns}
        handleFormChange={handleFormChange(formData, "columnId")}
      />
      <Button
        type="formPrimary"
        text={createOrNot ? "Create Task" : "Save Changes"}
        isDisabled={isUpdatingTask || isCreatingTask}
        onClick={handleSubmit(getFormData)}
      />
    </>
  );
}

export default NewOrEditTaskModal;
