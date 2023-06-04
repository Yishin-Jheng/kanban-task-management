import { useSelector, useDispatch } from "react-redux";
import { setListArray, addListArray, removeListArray } from "../../store";

function DeletableInput({ forBoardOrTask, subTitle, btnText }) {
  const dispatch = useDispatch();
  const formObj = useSelector((state) => state.form);

  const handleChange = (e, id) => {
    dispatch(setListArray({ forBoardOrTask, id: id, value: e.target.value }));
  };
  const handleAddInput = () => {
    dispatch(addListArray({ forBoardOrTask }));
  };
  const handleRemoveInput = (id) => {
    dispatch(removeListArray({ forBoardOrTask, id: id }));
  };

  let listItems;
  if (forBoardOrTask === "task") {
    listItems = formObj.subtasks.map((obj) => {
      return (
        <div key={obj.id} className="input-box__container">
          <input
            id={`new-task-subtask-${obj.id}`}
            type="text"
            value={obj.description ? obj.description : ""}
            placeholder={obj.placeholder ? obj.placeholder : ""}
            onChange={(e) => handleChange(e, obj.id)}
          />
          <svg
            width="16"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleRemoveInput(obj.id)}
          >
            <g fillRule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
      );
    });
  } else {
    listItems = formObj.columns.map((obj) => {
      return (
        <div key={obj.id} className="input-box__container">
          <input
            id={`new-task-subtask-${obj.id}`}
            type="text"
            value={obj.statusName ? obj.statusName : ""}
            placeholder={obj.placeholder ? obj.placeholder : ""}
            onChange={(e) => handleChange(e, obj.id)}
          />
          <svg
            width="16"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleRemoveInput(obj.id)}
          >
            <g fillRule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
      );
    });
  }

  return (
    <div className="input-box">
      <span className="modal__subtitle">{subTitle}</span>

      <div className="modal__scrollbox">{listItems}</div>

      <button className="btn-medium" onClick={handleAddInput}>
        {btnText}
      </button>
    </div>
  );
}

export default DeletableInput;
