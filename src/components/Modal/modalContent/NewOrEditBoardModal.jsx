import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBoards, upsertBoard } from "@/api/boards";
import { getColumns } from "@/api/columns";
import Button from "@/components/Button/Button";
import { DeletableInput } from "@/components/formComponents/DeletableInput/DeletableInput";
import Input from "@/components/formComponents/Input/Input";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useFormData } from "@/hooks/useFormData";
import { useBoardStore } from "@/store/useBoardStore";
import { useModalStore } from "@/store/useModalStore";
import styles from "../Modal.module.scss";

/**
 * NewOrEditBoardModal
 * @param {boolean} props.isAddNew 是否為新增任務
 */
function NewOrEditBoardModal(props) {
  const { isAddNew } = props;
  const boardId = useBoardStore((store) =>
    isAddNew ? null : store.activeBoardId,
  );
  const { setActiveBoard } = useBoardStore.getState();
  const { setModal } = useModalStore.getState();
  const [invalidKeys, setInvalidKeys] = useState([]);

  const { data: boardName, refetch: refetchBoards } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    enabled: !!boardId,
    select: (data) => {
      const board = data.find((board) => board.id === boardId);
      return board?.boardName;
    },
  });

  const { data: columns = [], refetch: refetchColumns } = useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => getColumns({ boardId }),
    enabled: !!boardId,
    select: (data) => data.map((item) => ({ ...item, localId: item.id })),
  });

  const { mutateAsync: doUpsertBoard, isPending: isPendingUpsertBoard } =
    useMutation({
      mutationFn: upsertBoard,
      onSuccess: (currentboardId) => {
        setModal({
          isOpen: true,
          modalType: "successModal",
        });
        if (boardId) refetchColumns();
        refetchBoards();
        setActiveBoard(currentboardId);
      },
    });

  const [formData, getOnFormChange] = useFormData(
    { id: boardId },
    { boardName, columns },
  );
  const checkInvalid = () => {
    const { boardName } = formData;
    const invalidKeys = [];
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
        placeholders={["e.g. Todo", "e.g. Doing"]}
        isInvalid={invalidKeys.includes("columns")}
        onChange={getOnFormChange("columns")}
      />
      <Button
        type="formPrimary"
        text={isAddNew ? "Create New Board" : "Save Changes"}
        isDisabled={isPendingUpsertBoard}
        onClick={handleSubmit}
      >
        {isPendingUpsertBoard && <LoadingIcon color="#fff" />}
      </Button>
    </>
  );
}

export default NewOrEditBoardModal;
