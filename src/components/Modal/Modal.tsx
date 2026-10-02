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
import { MOBILE_WIDTH_2 } from "@/constants/breakpoints";
import { useWindowHeight } from "@/hooks/useWindowHeight";
import { useModalStore } from "@/store/useModalStore";
import styles from "./Modal.module.scss";

function Modal() {
  const modalState = useModalStore((store) => store.modalState);
  const { modalType } = modalState;
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const isMobile2 = useMediaQuery({ query: MOBILE_WIDTH_2 });
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
          {modalType === "taskDetail" && (
            <TaskDetailModal taskInfo={modalState.task} />
          )}
          {modalType === "taskForm" && (
            <NewOrEditTaskModal
              isAddNew={modalState.isAddNew}
              taskInfo={modalState.isAddNew ? undefined : modalState.task}
            />
          )}
          {modalType === "boardForm" && (
            <NewOrEditBoardModal isAddNew={modalState.isAddNew} />
          )}
          {modalType === "delete" && (
            <DeleteModal
              type={modalState.deleteType}
              targetInfo={modalState.target}
            />
          )}
          {modalType === "success" && <SuccessModal />}
          {modalType === "error" && (
            <ErrorMessageModal
              errorTitle={modalState.errorTitle}
              errorMsg={modalState.errorMsg}
            />
          )}
        </div>
        <ModalBackground />
      </>
    )
  );
}

export default Modal;
