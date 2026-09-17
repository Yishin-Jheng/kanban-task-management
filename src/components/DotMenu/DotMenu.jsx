import { useRef, useState } from "react";
import { dotMenuIcon } from "@/assets/icon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useModalStore } from "@/store/useModalStore";
import styles from "./DotMenu.module.scss";

const typeSettingMap = new Map([
  [
    "board",
    {
      editBtnText: "Edit Board",
      deleteBtnText: "Delete Board",
      editModal: "boardModal",
    },
  ],
  [
    "task",
    {
      editBtnText: "Edit Task",
      deleteBtnText: "Delete Task",
      editModal: "taskModal",
    },
  ],
]);

/**
 * DotMenu
 * @param {type} props.type 元件類型
 * @param {{id: string | number, title: string}} props.targetInfo 元件詳細資訊
 */
function DotMenu(props) {
  const { type, targetInfo = {} } = props;
  const { setModal } = useModalStore.getState();
  const dotMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const setting = typeSettingMap.get(type) ?? {};

  const handleEdit = () => {
    setModal({
      isOpen: true,
      isAddNew: false,
      modalType: setting.editModal,
      detailObj: targetInfo,
    });
  };
  const handleDelete = () => {
    setModal({
      isOpen: true,
      modalType: "deleteModal",
      deleteType: type,
      detailObj: targetInfo,
    });
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
      {dotMenuIcon}
      <ul className={styles.menuList} data-open={isOpen ? "open" : ""}>
        <li className={styles.editBtn} onClick={handleEdit}>
          {setting.editBtnText}
        </li>
        <li className={styles.deleteBtn} onClick={handleDelete}>
          {setting.deleteBtnText}
        </li>
      </ul>
    </div>
  );
}

export default DotMenu;
