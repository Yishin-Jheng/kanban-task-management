import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Subtask } from "@/api/subtasks";
import { updateSubtask } from "@/api/subtasks";
import CheckBox from "@/components/formComponents/CheckBox/CheckBox";

interface SubtaskCheckboxProps {
  /** 子任務詳細資訊 */
  subtaskInfo: Subtask;
  /** 所屬任務的狀態列ID */
  columnId: number;
}

function SubtaskCheckbox(props: SubtaskCheckboxProps) {
  const { subtaskInfo, columnId } = props;
  const { id, description, checkOrNot: isChecked, taskId } = subtaskInfo;
  const queryClient = useQueryClient();

  const { mutate: doUpdateSubtask, isPending: isPendingUpdateSubtask } =
    useMutation({
      mutationFn: updateSubtask,
      onSuccess: (_, arg) => {
        const { subtaskId, isChecked } = arg;

        queryClient.setQueryData<Subtask[]>(
          ["subtasks", taskId],
          (subtasks) => {
            if (!subtasks) return;
            return subtasks.map((item) =>
              item.id === subtaskId ? { ...item, checkOrNot: isChecked } : item,
            );
          },
        );
        void queryClient.invalidateQueries({
          queryKey: ["tasks", columnId],
        });
      },
    });

  return (
    <CheckBox
      key={id}
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
