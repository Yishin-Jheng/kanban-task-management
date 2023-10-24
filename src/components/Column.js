import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { setModal, fetchTasks } from "../store";
import Skeleton from "./small-components/Skeleton";

function Column({ statusName, decorationColor, columnId, isUpdatingTasks }) {
  const dispatch = useDispatch();
  const { data: tasksData } = useSelector((state) => {
    return state.tasks;
  });
  const [doFetchTasks, isLoadingTasks] = useThunk(fetchTasks);
  const tasksDataOfThisColumn = tasksData.filter(
    (task) => task.columnId === columnId
  );

  const modalTaskDetail = (taskObj) => {
    dispatch(
      setModal({
        isOpen: true,
        whichOpen: "taskDetail",
        detailObj: taskObj,
      })
    );
  };

  const loadingTask = (times) => {
    return Array(times)
      .fill(0)
      .map((_, i) => {
        return (
          <li key={i} className="task">
            <Skeleton times={1} className="skeleton__outer--task" />
            <Skeleton times={1} className="skeleton__outer--subtask" />
          </li>
        );
      });
  };

  useEffect(() => {
    if (tasksDataOfThisColumn.length < 1) {
      doFetchTasks({ columnId });
    }
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
        <p className="column__status__title">{`${statusName} (${tasksDataOfThisColumn.length})`}</p>
      </div>

      <Droppable
        droppableId={columnId.toString()}
        isDropDisabled={isLoadingTasks}
      >
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className="column__block"
            {...provided.droppableProps}
          >
            {isLoadingTasks
              ? loadingTask(3)
              : tasksDataOfThisColumn.map((task, index) => (
                  <Draggable
                    key={task.id}
                    index={index}
                    draggableId={task.id.toString()}
                    isDragDisabled={isUpdatingTasks}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        className="task"
                        onClick={() => {
                          modalTaskDetail(task);
                        }}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <p className="task__description">{task.title}</p>
                        <p className="task__subtasks">
                          {task.finishedSubNum} of {task.totalSubNum} subtasks
                        </p>
                      </li>
                    )}
                  </Draggable>
                ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
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

export { Column, NewColumn, LoadingColumn };
