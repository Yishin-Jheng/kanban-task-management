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

const exampleInputs = [
  { localId: 1, placeholder: "e.g. Make coffee" },
  { localId: 2, placeholder: "e.g. Drink coffee & smile" },
  { localId: 3, placeholder: "e.g. Go to work" },
];

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
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [getFormData, handleFormChange] = useFormData();

  const formData = getFormData();

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
      onSuccess: () => {
        dispatch(
          setModal({
            isOpen: true,
            whichOpen: "loadingModal",
            isLoading: false,
          }),
        );
        refetchSubtasks();
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
    });

  const handleSubmit = (formDataRef) => {
    return () => {
      const form = formDataRef().current;
      setCheckInvalid(true);

      if (form.title && form.description) {
        // console.log({ taskId: taskId, ...form });
        doUpsertTask({ taskId, ...form });
      }
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
        value={taskInfo.title}
        placeholder="e.g. Take coffee break"
        checkInvalid={checkInvalid}
        handleFormChange={handleFormChange(formData, "title")}
      />
      <Textarea
        label="Description"
        value={taskInfo.description}
        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        checkInvalid={checkInvalid}
        handleFormChange={handleFormChange(formData, "description")}
      />
      <DeletableInput
        label="Subtasks"
        btnLabel="+ Add New Subtask"
        valueKey="description"
        // BUG: 如果不變更subtasks的值會無法觸發onChange，導致form裡面紀錄的資料是空的
        values={createOrNot ? exampleInputs : subtasks}
        checkInvalid={checkInvalid}
        onChange={handleFormChange(formData, "subtasks")}
      />
      <Dropdown
        label="Status"
        // BUG: 目前下拉顯示的選項會跟formData不一樣，之後改state時需要留意
        value={activeStatus?.value}
        options={columns}
        onChange={(option) => {
          const handleChange = handleFormChange(formData, "columnId");
          handleChange(option.value);
        }}
      />
      <Button
        type="formPrimary"
        text={createOrNot ? "Create Task" : "Save Changes"}
        isDisabled={isPendingUpsertTask}
        onClick={handleSubmit(getFormData)}
      >
        {isPendingUpsertTask && <LoadingIcon color="#fff" />}
      </Button>
    </>
  );
}

export default NewOrEditTaskModal;
