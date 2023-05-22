import { useDispatch } from "react-redux";
import { setModal } from "../store";
import Skeleton from "./small-components/Skeleton";

function Column({ statusName, decorationColor, taskArr }) {
  const dispatch = useDispatch();
  const modalTaskDetail = () => {
    dispatch(
      setModal({
        isOpen: true,
      })
    );
  };

  return (
    <div className="column">
      {/* <Skeleton times={1} className="skeleton__outer--status" /> */}
      <div className="column__status">
        <div
          className="column__status__icon"
          style={{ backgroundColor: decorationColor }}
        >
          &nbsp;
        </div>
        <p className="column__status__title">{`${statusName} (${taskArr.length})`}</p>
      </div>

      <ul className="column__block">
        {taskArr.map((task) => {
          return (
            <li key={task.id} className="task" onClick={modalTaskDetail}>
              {/* <Skeleton times={1} className="skeleton__outer--task" />
              <Skeleton times={1} className="skeleton__outer--subtask" /> */}

              <p className="task__description">{task.description}</p>
              <p className="task__subtasks">0 of {task.subtasksNum} subtasks</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NewColumn() {
  const dispatch = useDispatch();
  const modalEditBoard = () => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "boardModal",
        createOrNot: false,
      })
    );
  };

  return (
    <div className="column">
      <div className="column__status">
        <div className="column__status__icon"></div>
        <p className="column__status__title"></p>
      </div>

      <div className="column__create" onClick={modalEditBoard}>
        + New Column
      </div>
    </div>
  );
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export { Column, NewColumn };
