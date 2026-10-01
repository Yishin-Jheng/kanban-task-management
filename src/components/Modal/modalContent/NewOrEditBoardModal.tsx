import { useState } from "react";
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { BoardForm } from "@/api/boards";
import { getBoards, upsertBoard } from "@/api/boards";
import { getColumns } from "@/api/columns";
import Button from "@/components/Button/Button";
import { DeletableInput } from "@/components/formComponents/DeletableInput/DeletableInput";
import Input from "@/components/formComponents/Input/Input";
import { useFormData } from "@/hooks/useFormData";
import { useBoardStore } from "@/store/useBoardStore";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

interface NewOrEditBoardModalProps {
  /** 是否為新增版塊 */
  isAddNew: boolean;
}

function NewOrEditBoardModal(props: NewOrEditBoardModalProps) {
  const { isAddNew } = props;
  const queryClient = useQueryClient();
  const boardId = useBoardStore((store) =>
    isAddNew ? null : store.activeBoardId,
  );
  const { setActiveBoard } = useBoardStore.getState();
  const { setModal } = useModalStore.getState();
  const [invalidKeys, setInvalidKeys] = useState<(keyof BoardForm)[]>([]);

  const { data: boardName } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    enabled: typeof boardId === "number",
    select: (data) => {
      const board = data.find((board) => board.id === boardId);
      return board?.boardName;
    },
  });

  const { data: columns } = useQuery({
    queryKey: ["columns", boardId],
    queryFn:
      typeof boardId === "number" ? () => getColumns({ boardId }) : skipToken,
  });

  const { mutate: doUpsertBoard, isPending: isPendingUpsertBoard } =
    useMutation({
      mutationFn: upsertBoard,
      onSuccess: (currentboardId) => {
        setModal({ modalType: "success" });
        setActiveBoard(currentboardId);

        void queryClient.invalidateQueries({ queryKey: ["boards"] });
        void queryClient.invalidateQueries({
          queryKey: ["columns", currentboardId],
        });
      },
    });

  const [formData, getOnFormChange] = useFormData<BoardForm>(
    { id: boardId, boardName: "", columns: [] },
    { boardName, columns },
  );
  const checkInvalid = () => {
    const { boardName } = formData;
    const invalidKeys: (keyof BoardForm)[] = [];
    if (!boardName) invalidKeys.push("boardName");
    setInvalidKeys(invalidKeys);
    return invalidKeys.length > 0;
  };
  const handleSubmit = () => {
    if (checkInvalid()) return;
    doUpsertBoard(formData);
  };

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{isAddNew ? "Add New Board" : "Edit Board"}</span>
      </div>
      <Input
        label="Board Name"
        type="text"
        value={formData.boardName}
        placeholder="e.g. Web Design"
        isRequired
        isInvalid={invalidKeys.includes("boardName")}
        onChange={getOnFormChange("boardName")}
      />
      <DeletableInput
        label="Board Columns"
        btnLabel="+ Add New Column"
        valueKey="statusName"
        values={formData.columns}
        emptyValue={{ statusName: "" }}
        placeholders={["e.g. Todo", "e.g. Doing"]}
        isInvalid={invalidKeys.includes("columns")}
        onChange={getOnFormChange("columns")}
      />
      <Button
        type="formPrimary"
        isLoading={isPendingUpsertBoard}
        onClick={handleSubmit}
      >
        {isAddNew ? "Create New Board" : "Save Changes"}
      </Button>
    </>
  );
}

export default NewOrEditBoardModal;
