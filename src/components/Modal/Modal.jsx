import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { closeModal } from "@/store";
import { useWindowHeight } from "@/hooks/useWindowHeight";
import DeleteModal from "@/components/Modal/modalContent/DeleteModal";
import LoadingModal from "@/components/Modal/modalContent/LoadingModal";
import ErrorMessageModal from "@/components/Modal/modalContent/ErrorMessageModal";
import NewOrEditBoardModal from "@/components/Modal/modalContent/NewOrEditBoardModal";
import NewOrEditTaskModal from "@/components/Modal/modalContent/NewOrEditTaskModal";
import TaskDetailModal from "@/components/Modal/modalContent/TaskDetailModal";
import styles from "./Modal.module.scss";

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
  const isMobile2 = useMediaQuery({ query: `(max-width: 515px)` });
  const formRef = useRef("");

  useEffect(() => {
    if (formRef.current) {
      // NOTE:
      // 有些 task 抓到的高度比實際高度還要矮上不少(>100px)，而且每次抓到的數字都會有點浮動
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
        className={clsx(
          styles.modal,
          windowHeight - formHeight < 180 && !isMobile2
            ? styles.horizontalModal
            : styles.verticalModal,
        )}
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
      className={styles.modalBackground}
      onClick={() => {
        if (!disable) {
          dispatch(closeModal());
        }
      }}
    ></div>
  );
}

export default Modal;
