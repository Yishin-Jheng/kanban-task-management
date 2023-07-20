import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store";
import DeleteModal from "./modals/DeleteModal";
import LoadingModal from "./modals/LoadingModal";
import ErrorMessageModal from "./modals/ErrorMessageModal";
import NewOrEditBoardModal from "./modals/NewOrEditBoardModal";
import NewOrEditTaskModal from "./modals/NewOrEditTaskModal";
import TaskDetailModal from "./modals/TaskDetailModal";

function Modal() {
  const dispatch = useDispatch();
  const {
    isOpen,
    whichOpen,
    createOrNot,
    deleteBoardOrTask,
    detailObj,
    isLoading,
    errorMsg,
  } = useSelector((state) => {
    return state.modal;
  });

  function ModalBackground({ disable }) {
    return (
      <div
        className="modal__background"
        onClick={() => {
          if (!disable) {
            dispatch(closeModal());
          }
        }}
      ></div>
    );
  }

  if (!isOpen) {
    return;
  }

  if (whichOpen === "boardModal") {
    return (
      <>
        <NewOrEditBoardModal createOrNot={createOrNot} />
        <ModalBackground />
      </>
    );
  }

  if (whichOpen === "taskModal") {
    return (
      <>
        <NewOrEditTaskModal createOrNot={createOrNot} detailObj={detailObj} />
        <ModalBackground />
      </>
    );
  }

  if (whichOpen === "deleteModal") {
    return (
      <>
        <DeleteModal boardOrTask={deleteBoardOrTask} detailObj={detailObj} />
        <ModalBackground />
      </>
    );
  }

  if (whichOpen === "loadingModal") {
    return (
      <>
        <LoadingModal isLoading={isLoading} />
        <ModalBackground disable={true} />
      </>
    );
  }

  if (whichOpen === "errorMessageModal") {
    return (
      <>
        <ErrorMessageModal errorMsg={errorMsg} />
        <ModalBackground />
      </>
    );
  }

  return (
    <>
      <TaskDetailModal detailObj={detailObj} />
      <ModalBackground />
    </>
  );
}

export default Modal;
