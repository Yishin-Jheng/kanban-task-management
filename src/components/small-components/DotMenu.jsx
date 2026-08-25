import { useDispatch } from "react-redux";
import { setModal } from "../../store";

function DotMenu({ position, detailObj }) {
  const dispatch = useDispatch();
  const inTaskModal = position === "modal";
  const modalEdit = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: inTaskModal ? "taskModal" : "boardModal",
        createOrNot: false,
        detailObj: inTaskModal ? detailObj : null,
      })
    );
  };
  const modalDelete = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "deleteModal",
        deleteBoardOrTask: inTaskModal ? "task" : "board",
        detailObj: inTaskModal ? detailObj : null,
      })
    );
  };

  return (
    <div className="dots-menu">
      <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
      <ul
        className={`dots-menu__list ${
          inTaskModal ? "dots-menu__list--modal" : ""
        }`}
      >
        <li className="dots-menu__edit" onClick={modalEdit}>
          {inTaskModal ? "Edit Task" : "Edit Board"}
        </li>
        <li className="dots-menu__delete" onClick={modalDelete}>
          {inTaskModal ? "Delete Task" : "Delete Board"}
        </li>
      </ul>
    </div>
  );
}

export default DotMenu;
