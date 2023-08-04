import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { DragDropContext } from "react-beautiful-dnd";
import {
  fetchColumns,
  updateTasksStatus,
  resetColumns,
  resetTasks,
} from "../store";
import { Column, LoadingColumn, NewColumn } from "./Column";
import EmptyColumn from "./EmptyColumn";

function Board() {
  const dispatch = useDispatch();
  const [columnsData, activeBoardId] = useSelector((state) => {
    const columnsData = state.columns.data;
    const activeBoardId = state.boards.activeBoardId;
    return [columnsData, activeBoardId];
  });
  const [doFetchColumns, isLoadingColumns] = useThunk(fetchColumns);
  const [doUpdateTasks, isUpdatingTasks] = useThunk(updateTasksStatus);

  const handleDragAndDrop = function (results) {
    // NOTE: source is start point, destination is end point
    const { source, destination, draggableId } = results;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    doUpdateTasks({
      columnId: Number(destination.droppableId),
      taskId: Number(draggableId),
    });
  };

  useEffect(() => {
    dispatch(resetColumns());
    dispatch(resetTasks());

    if (activeBoardId !== 0) doFetchColumns({ boardId: activeBoardId });
  }, [doFetchColumns, activeBoardId]);

  if (isLoadingColumns || activeBoardId === 0) {
    return (
      <div className="column__container">
        <LoadingColumn times={3} />
      </div>
    );
  }

  return columnsData && columnsData.length > 0 ? (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className="column__container">
        {columnsData.map((status) => {
          return (
            <Column
              key={status.id}
              statusName={status.statusName}
              decorationColor={status.decorationColor}
              columnId={status.id}
              isUpdatingTasks={isUpdatingTasks}
            />
          );
        })}
        <NewColumn />
      </div>
    </DragDropContext>
  ) : (
    <EmptyColumn />
  );
}

export default Board;
