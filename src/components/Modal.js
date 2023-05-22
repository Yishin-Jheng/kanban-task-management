import { useSelector, useDispatch } from "react-redux";
import { setModal, closeModal } from "../store";
import DeleteModal from "./modals/DeleteModal";
import NewOrEditBoardModal from "./modals/NewOrEditBoardModal";
import NewOrEditTaskModal from "./modals/NewOrEditTaskModal";
import TaskDetailModal from "./modals/TaskDetailModal";

function Modal() {
  const dispatch = useDispatch();
  const { isOpen, whichOpen, createOrNot, deleteBoardOrTask } = useSelector(
    (state) => {
      return state.modal;
    }
  );

  function ModalBackground() {
    return (
      <div
        className="modal__background"
        onClick={() => {
          dispatch(closeModal());
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
        <NewOrEditTaskModal createOrNot={createOrNot} />
        <ModalBackground />
      </>
    );
  }

  if (whichOpen === "deleteModal") {
    return (
      <>
        <DeleteModal boardOrTask={deleteBoardOrTask} />
        <ModalBackground />
      </>
    );
  }

  return (
    <>
      <TaskDetailModal />
      <ModalBackground />
    </>
  );
}

export default Modal;
