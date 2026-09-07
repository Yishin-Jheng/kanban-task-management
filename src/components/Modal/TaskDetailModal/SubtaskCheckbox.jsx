import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubtask } from "@/api/subtasks";
import CheckBox from "@/components/formComponents/CheckBox/CheckBox";

/**
 * SubtaskCheckbox
 * @param {{id: number, description: string, checkOrNot: boolean}} props.subtaskInfo 子任務詳細資訊
 * @param {number} props.taskId 所屬的任務ID
 * @param {number} props.columnId 所屬任務的狀態列ID
 */
function SubtaskCheckbox(props) {
  const { subtaskInfo, taskId, columnId } = props;
  const { id, description, checkOrNot: isChecked } = subtaskInfo;
  const queryClient = useQueryClient();

  const { mutateAsync: doUpdateSubtask, isPending: isPendingUpdateSubtask } =
    useMutation({
      mutationFn: updateSubtask,
      onSuccess: (_, arg) => {
        const { subtaskId, isChecked } = arg;

        queryClient.setQueryData(["subtasks", taskId], (subtasks) => {
          if (!subtasks) return;

          return subtasks.map((item) =>
            item.id === subtaskId ? { ...item, checkOrNot: isChecked } : item,
          );
        });
        queryClient.invalidateQueries({
          queryKey: ["tasks", columnId],
        });
      },
    });

  return (
    <CheckBox
      key={id}
      id={id}
      description={description}
      isChecked={isChecked}
      isLoading={isPendingUpdateSubtask}
      onChange={() => {
        doUpdateSubtask({
          subtaskId: id,
          isChecked: !isChecked,
        });
      }}
    />
  );
}

export default SubtaskCheckbox;
