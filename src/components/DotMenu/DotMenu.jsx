import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "@/store";
import styles from "./DotMenu.module.scss";
import { useClickOutside } from "@/hooks/useClickOutside";

function DotMenu({ position, detailObj }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dotMenuRef = useRef(null);
  const inTaskModal = position === "modal";
  const modalEdit = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: inTaskModal ? "taskModal" : "boardModal",
        createOrNot: false,
        detailObj: inTaskModal ? detailObj : null,
      }),
    );
  };
  const modalDelete = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "deleteModal",
        deleteBoardOrTask: inTaskModal ? "task" : "board",
        detailObj: inTaskModal ? detailObj : null,
      }),
    );
  };

  useClickOutside(dotMenuRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      ref={dotMenuRef}
      className={styles.dotMenu}
      onClick={() => setIsOpen((pre) => !pre)}
    >
      <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
      <ul className={styles.menuList} data-open={isOpen ? "open" : ""}>
        <li className={styles.editBtn} onClick={modalEdit}>
          {inTaskModal ? "Edit Task" : "Edit Board"}
        </li>
        <li className={styles.deleteBtn} onClick={modalDelete}>
          {inTaskModal ? "Delete Task" : "Delete Board"}
        </li>
      </ul>
    </div>
  );
}

export default DotMenu;
