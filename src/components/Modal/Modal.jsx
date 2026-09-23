import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
import ModalBackground from "@/components/Modal/ModalBackground";
import DeleteModal from "@/components/Modal/modalContent/DeleteModal";
import ErrorMessageModal from "@/components/Modal/modalContent/ErrorMessageModal";
import NewOrEditBoardModal from "@/components/Modal/modalContent/NewOrEditBoardModal";
import NewOrEditTaskModal from "@/components/Modal/modalContent/NewOrEditTaskModal";
import SuccessModal from "@/components/Modal/modalContent/SuccessModal";
import TaskDetailModal from "@/components/Modal/modalContent/TaskDetailModal";
import { useWindowHeight } from "@/hooks/useWindowHeight";
import { useModalStore } from "@/store/useModalStore";
import styles from "./Modal.module.scss";

function Modal() {
  const {
    modalType,
    isAddNew,
    task,
    deleteType,
    target,
    errorTitle,
    errorMsg,
  } = useModalStore((store) => store.modalState);
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef("");
  const isMobile2 = useMediaQuery({ query: "(max-width: 515px)" });
  const windowHeight = useWindowHeight();
  const isShowHorizontal = windowHeight - formHeight < 180;

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, [modalType]);

  return (
    !!modalType && (
      <>
        <div
          ref={formRef}
          className={clsx(
            styles.modal,
            isShowHorizontal && !isMobile2
              ? styles.horizontalModal
              : styles.verticalModal,
          )}
        >
          {modalType === "taskDetail" && <TaskDetailModal taskInfo={task} />}
          {modalType === "taskForm" && (
            <NewOrEditTaskModal isAddNew={isAddNew} taskInfo={task} />
          )}
          {modalType === "boardForm" && (
            <NewOrEditBoardModal isAddNew={isAddNew} />
          )}
          {modalType === "delete" && (
            <DeleteModal type={deleteType} targetInfo={target} />
          )}
          {modalType === "success" && <SuccessModal />}
          {modalType === "error" && (
            <ErrorMessageModal errorTitle={errorTitle} errorMsg={errorMsg} />
          )}
        </div>
        <ModalBackground />
      </>
    )
  );
}

export default Modal;
