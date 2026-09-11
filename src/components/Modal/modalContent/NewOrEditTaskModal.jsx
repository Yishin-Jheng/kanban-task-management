import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getColumns } from "@/api/columns";
import { getSubtasks } from "@/api/subtasks";
import { upsertTask } from "@/api/tasks";
import Button from "@/components/Button/Button";
import { DeletableInput } from "@/components/formComponents/DeletableInput/DeletableInput";
import Dropdown from "@/components/formComponents/Dropdown/Dropdown";
import Input from "@/components/formComponents/Input/Input";
import Textarea from "@/components/formComponents/Textarea/Textarea";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useFormData } from "@/hooks/useFormData";
import { setModal } from "@/store";
import styles from "../Modal.module.scss";

/**
 * NewOrEditTaskModal
 * @param {boolean} props.createOrNot 是否為新增任務
 * @param {{ id: number, columnId: number, title: string, description: string, totalSubNum: number,finishedSubNum: number }} props.taskInfo 任務詳細資訊
 */
function NewOrEditTaskModal(props) {
  const { createOrNot, taskInfo = {} } = props;
  const { id: taskId, columnId } = taskInfo;

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);
  const [invalidKeys, setInvalidKeys] = useState([]);

  const { data: columns = [] } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn: () => getColumns({ boardId: activeBoardId }),
    enabled: !!activeBoardId,
    select: (data) =>
      data.map((col) => ({ text: col.statusName, value: col.id })),
  });
  const activeStatus = createOrNot
    ? columns[0]
    : columns.find((col) => col.value === columnId);

  const { data: subtasks = [], refetch: refetchSubtasks } = useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getSubtasks({ taskId }),
    enabled: createOrNot && !!taskId,
    select: (data) => data.map((item) => ({ ...item, localId: item.id })),
  });

  const { mutateAsync: doUpsertTask, isPending: isPendingUpsertTask } =
    useMutation({
      mutationFn: upsertTask,
      onSuccess: (columnId) => {
        dispatch(
          setModal({
            isOpen: true,
            whichOpen: "loadingModal",
            isLoading: false,
          }),
        );
        if (taskId) refetchSubtasks();
        queryClient.invalidateQueries({
          queryKey: ["tasks", columnId],
        });
      },
    });

  const [formData, getOnFormChange] = useFormData(taskInfo, {
    subtasks,
    columnId: activeStatus?.value,
  });
  const checkInvalid = () => {
    const { title, description } = formData;
    const invalidKeys = [];
    if (!title) invalidKeys.push("title");
    if (!description) invalidKeys.push("description");
    setInvalidKeys(invalidKeys);
    return invalidKeys.length > 0;
  };
  const handleSubmit = () => {
    return () => {
      if (checkInvalid()) return;
      doUpsertTask(formData);
    };
  };

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{createOrNot ? "Add New Task" : "Edit Task"}</span>
      </div>
      <Input
        label="Title"
        type="text"
        value={formData.title}
        placeholder="e.g. Take coffee break"
        isRequired
        isInvalid={invalidKeys.includes("title")}
        onChange={getOnFormChange("title")}
      />
      <Textarea
        label="Description"
        value={formData.description}
        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        isRequired
        isInvalid={invalidKeys.includes("description")}
        onChange={getOnFormChange("description")}
      />
      <DeletableInput
        label="Subtasks"
        btnLabel="+ Add New Subtask"
        valueKey="description"
        values={formData.subtasks}
        isInvalid={invalidKeys.includes("subtasks")}
        onChange={getOnFormChange("subtasks")}
      />
      <Dropdown
        label="Status"
        value={formData.columnId}
        options={columns}
        onChange={getOnFormChange("columnId")}
      />
      <Button
        type="formPrimary"
        text={createOrNot ? "Create Task" : "Save Changes"}
        isDisabled={isPendingUpsertTask}
        onClick={handleSubmit()}
      >
        {isPendingUpsertTask && <LoadingIcon color="#fff" />}
      </Button>
    </>
  );
}

export default NewOrEditTaskModal;
