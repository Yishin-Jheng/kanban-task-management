import { useState } from "react";
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getColumns } from "@/api/columns";
import { getSubtasks } from "@/api/subtasks";
import type { Task, TaskForm } from "@/api/tasks";
import { upsertTask } from "@/api/tasks";
import Button from "@/components/Button/Button";
import { DeletableInput } from "@/components/formComponents/DeletableInput/DeletableInput";
import Dropdown from "@/components/formComponents/Dropdown/Dropdown";
import Input from "@/components/formComponents/Input/Input";
import Textarea from "@/components/formComponents/Textarea/Textarea";
import { useFormData } from "@/hooks/useFormData";
import { useBoardStore } from "@/store/useBoardStore";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

const defaultTaskInfo: Omit<TaskForm, "subtasks"> = {
  title: "",
  description: "",
  columnId: 0,
};

interface NewOrEditTaskModalProps {
  /** 是否為新增任務 */
  isAddNew: boolean;
  /** 任務詳細資訊 */
  taskInfo?: Task;
}

function NewOrEditTaskModal(props: NewOrEditTaskModalProps) {
  const { isAddNew, taskInfo = defaultTaskInfo } = props;
  const { id: taskId, columnId } = taskInfo;

  const queryClient = useQueryClient();
  const activeBoardId = useBoardStore((store) => store.activeBoardId);
  const { setModal } = useModalStore.getState();
  const [invalidKeys, setInvalidKeys] = useState<(keyof TaskForm)[]>([]);

  const { data: columns = [] } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn:
      typeof activeBoardId === "number"
        ? () => getColumns({ boardId: activeBoardId })
        : skipToken,
    select: (data) =>
      data.map((col) => ({ text: col.statusName, value: col.id })),
  });
  const activeStatus = isAddNew
    ? columns[0]
    : columns.find((col) => col.value === columnId);

  const { data: subtasks } = useQuery({
    queryKey: ["subtasks", taskId],
    queryFn:
      typeof taskId === "number" ? () => getSubtasks({ taskId }) : skipToken,
  });

  const { mutate: doUpsertTask, isPending: isPendingUpsertTask } = useMutation({
    mutationFn: upsertTask,
    onSuccess: () => {
      setModal({ modalType: "success" });
      void queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["subtasks", taskId],
      });
    },
  });

  const [formData, getOnFormChange] = useFormData<TaskForm>(
    { ...taskInfo, subtasks: [] },
    {
      subtasks,
      columnId: activeStatus?.value,
    },
  );
  const checkInvalid = () => {
    const { title, description } = formData;
    const invalidKeys: (keyof TaskForm)[] = [];
    if (!title) invalidKeys.push("title");
    if (!description) invalidKeys.push("description");
    setInvalidKeys(invalidKeys);
    return invalidKeys.length > 0;
  };
  const handleSubmit = () => {
    if (checkInvalid()) return;
    doUpsertTask(formData);
  };

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{isAddNew ? "Add New Task" : "Edit Task"}</span>
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
        emptyValue={{ description: "" }}
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
        isLoading={isPendingUpsertTask}
        onClick={handleSubmit}
      >
        {isAddNew ? "Create Task" : "Save Changes"}
      </Button>
    </>
  );
}

export default NewOrEditTaskModal;
