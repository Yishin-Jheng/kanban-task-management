import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
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
import styles from "./Modal.module.scss";

function Modal() {
  const {
    isOpen,
    whichOpen,
    createOrNot,
    deleteType,
    detailObj,
    errorTitle,
    errorMsg,
  } = useSelector((state) => state.modal);
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef("");
  const isMobile2 = useMediaQuery({ query: `(max-width: 515px)` });
  const windowHeight = useWindowHeight();
  const isShowHorizontal = windowHeight - formHeight < 180;

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, [whichOpen, detailObj]);

  return (
    isOpen && (
      <>
        <form
          ref={formRef}
          className={clsx(
            styles.modal,
            isShowHorizontal && !isMobile2
              ? styles.horizontalModal
              : styles.verticalModal,
          )}
        >
          {whichOpen === "taskDetail" && (
            <TaskDetailModal taskInfo={detailObj} />
          )}
          {whichOpen === "taskModal" && (
            <NewOrEditTaskModal
              createOrNot={createOrNot}
              taskInfo={detailObj}
            />
          )}
          {whichOpen === "boardModal" && (
            <NewOrEditBoardModal createOrNot={createOrNot} />
          )}
          {whichOpen === "deleteModal" && (
            <DeleteModal type={deleteType} detailObj={detailObj} />
          )}
          {whichOpen === "successModal" && <SuccessModal />}
          {whichOpen === "errorMessageModal" && (
            <ErrorMessageModal errorTitle={errorTitle} errorMsg={errorMsg} />
          )}
        </form>
        <ModalBackground />
      </>
    )
  );
}

export default Modal;
