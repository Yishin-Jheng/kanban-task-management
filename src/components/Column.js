import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { fetchTasks } from "../store";
import { setModal } from "../store";
import Skeleton from "./small-components/Skeleton";

function Column({ statusName, decorationColor, columnId }) {
  const dispatch = useDispatch();
  const { data: tasksData } = useSelector((state) => {
    return state.tasks;
  });
  const [doFetchTasks, isLoadingTasks, loadingTasksError] =
    useThunk(fetchTasks);

  const modalTaskDetail = () => {
    dispatch(
      setModal({
        isOpen: true,
      })
    );
  };
  const loadingTask = (times) => {
    return Array(times)
      .fill(0)
      .map((_, i) => {
        return (
          <li key={i} className="task" onClick={modalTaskDetail}>
            <Skeleton times={1} className="skeleton__outer--task" />
            <Skeleton times={1} className="skeleton__outer--subtask" />
          </li>
        );
      });
  };

  useEffect(() => {
    doFetchTasks({ columnId });
  }, [doFetchTasks]);

  return (
    <div className="column">
      <div className="column__status">
        <div
          className="column__status__icon"
          style={{ backgroundColor: decorationColor }}
        >
          &nbsp;
        </div>
        <p className="column__status__title">{`${statusName} (${
          tasksData.filter((task) => task.columnId === columnId).length
        })`}</p>
      </div>

      <ul className="column__block">
        {isLoadingTasks
          ? loadingTask(3)
          : tasksData
              .filter((task) => task.columnId === columnId)
              .map((task) => {
                return (
                  <li key={task.id} className="task" onClick={modalTaskDetail}>
                    <p className="task__description">{task.description}</p>
                    <p className="task__subtasks">
                      0 of {task.subtasksNum} subtasks
                    </p>
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

function LoadingColumn({ times }) {
  const columnContent = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className="column">
          <Skeleton times={1} className="skeleton__outer--status" />

          <ul className="column__block">
            <li className="task">
              <Skeleton times={1} className="skeleton__outer--task" />
              <Skeleton times={1} className="skeleton__outer--subtask" />
            </li>
            <li className="task">
              <Skeleton times={1} className="skeleton__outer--task" />
              <Skeleton times={1} className="skeleton__outer--subtask" />
            </li>
            <li className="task">
              <Skeleton times={1} className="skeleton__outer--task" />
              <Skeleton times={1} className="skeleton__outer--subtask" />
            </li>
          </ul>
        </div>
      );
    });

  return columnContent;
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export { Column, NewColumn, LoadingColumn };
