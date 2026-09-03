import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { getColumns } from "@/api/columns";
import Button from "@/components/Button/Button";
import { DeletableInput } from "@/components/formComponents/DeletableInput/DeletableInput";
import Input from "@/components/formComponents/Input/Input";
import { useFormData } from "@/hooks/useFormData";
import { useThunk } from "@/hooks/useThunk";
import { createBoards, setModal, updateBoards } from "@/store";
import styles from "../Modal.module.scss";

function NewOrEditBoardModal({ createOrNot }) {
  const dispatch = useDispatch();
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);

  const [checkInvalid, setCheckInvalid] = useState(false);
  const [getFormData, handleFormChange] = useFormData();
  const [doCreateBoard, isCreatingBoard] = useThunk(createBoards);
  const [doUpdateBoard, isUpdatingBoard] = useThunk(updateBoards);

  const formData = getFormData();
  const [title, btnText] = createOrNot
    ? ["Add New Board", "Create New Board"]
    : ["Edit Board", "Save Changes"];

  const showLoadingModal = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "loadingModal",
        isLoading: true,
      }),
    );
  };

  const handleSubmit = (formData) => {
    return () => {
      const form = formData().current;
      setCheckInvalid(true);

      if (form.boardName) {
        showLoadingModal();
        if (createOrNot) {
          doCreateBoard({ ...form });
          return;
        }
        doUpdateBoard({ boardId: activeBoardId, ...form });
      }
    };
  };

  const { data: boardName } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    enabled: !createOrNot,
    select: (data) => {
      const activeBoard = data.find((board) => board.id === activeBoardId);
      return activeBoard?.boardName;
    },
  });

  const { data: columns = [] } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn: () => getColumns({ boardId: activeBoardId }),
    enabled: !!activeBoardId,
  });

  return (
    <>
      <div className={styles.modalTitle}>
        <span>{title}</span>
      </div>
      <Input
        checkInvalid={checkInvalid}
        label="Board Name"
        type="text"
        value={createOrNot ? "" : boardName}
        placeholder="e.g. Web Design"
        handleFormChange={handleFormChange(formData, "boardName")}
      />
      <DeletableInput
        checkInvalid={checkInvalid}
        label="Board Columns"
        btnLabel="+ Add New Column"
        valueKey="statusName"
        values={
          createOrNot
            ? [
                {
                  id: 1,
                  placeholder: "e.g. Todo",
                },
                {
                  id: 2,
                  placeholder: "e.g. Doing",
                },
              ]
            : columns.filter((col) => col.boardId === activeBoardId)
        }
        handleFormChange={handleFormChange(formData, "columns")}
        handleFormDelete={handleFormChange(formData, "deletedColumns")}
      />
      <Button
        type="formPrimary"
        text={btnText}
        isDisabled={isUpdatingBoard || isCreatingBoard}
        onClick={handleSubmit(getFormData)}
      />
    </>
  );
}

export default NewOrEditBoardModal;
