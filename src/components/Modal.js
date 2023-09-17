import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { closeModal } from "../store";
import DeleteModal from "./modals/DeleteModal";
import LoadingModal from "./modals/LoadingModal";
import ErrorMessageModal from "./modals/ErrorMessageModal";
import NewOrEditBoardModal from "./modals/NewOrEditBoardModal";
import NewOrEditTaskModal from "./modals/NewOrEditTaskModal";
import TaskDetailModal from "./modals/TaskDetailModal";

function Modal() {
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
  const [formHeight, setFormHeight] = useState(0);
  const windowHeight = useWindowHeight();
  const formRef = useRef("");

  useEffect(() => {
    if (formRef.current) {
      // NOTE:
      // 有些 task 抓到的高度比實際高度還要矮上不少(>100px)，而且每次抓到的數字都會有點浮動。
      // 暫時還是沒辦法讓他抓得很準確，但目前有讓dropdown可以視情況變更展開方向，理論上針對不同視窗高度應該都是可以適應的。
      setFormHeight(formRef.current.clientHeight);
    }
  }, [whichOpen, detailObj]);

  if (!isOpen) {
    return;
  }

  let modalContent;
  if (whichOpen === "taskDetail") {
    modalContent = <TaskDetailModal detailObj={detailObj} />;
  }

  if (whichOpen === "taskModal") {
    modalContent = (
      <NewOrEditTaskModal createOrNot={createOrNot} detailObj={detailObj} />
    );
  }

  if (whichOpen === "boardModal") {
    modalContent = <NewOrEditBoardModal createOrNot={createOrNot} />;
  }

  if (whichOpen === "deleteModal") {
    modalContent = (
      <DeleteModal boardOrTask={deleteBoardOrTask} detailObj={detailObj} />
    );
  }

  if (whichOpen === "loadingModal") {
    modalContent = <LoadingModal isLoading={isLoading} />;
  }

  if (whichOpen === "errorMessageModal") {
    modalContent = <ErrorMessageModal errorMsg={errorMsg} />;
  }

  return (
    <>
      <form
        ref={formRef}
        className={`modal ${
          windowHeight - formHeight < 180
            ? "modal--horizontal"
            : "modal--vertical"
        }`}
      >
        {modalContent}
      </form>
      <ModalBackground disable={whichOpen === "loadingModal"} />
    </>
  );
}

function ModalBackground({ disable }) {
  const dispatch = useDispatch();
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

export default Modal;
