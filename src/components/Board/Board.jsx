import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { Column, LoadingColumn, NewColumn } from "@/components/Column/Column";
import EmptyColumn from "@/components/Column/EmptyColumn";
import { useThunk } from "@/hooks/useThunk";
import { fetchColumns, updateTasksStatus } from "@/store";
import styles from "./Board.module.scss";

function Board() {
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

  // TODO: 之後改成 useQuery配合enabled: activeBoardId !== 0
  useEffect(() => {
    if (activeBoardId !== 0) {
      doFetchColumns({ boardId: activeBoardId });
    }
  }, [doFetchColumns, activeBoardId]);

  return (
    <div className={styles.board}>
      {/* TODO: 之後activeBoardId為0顯示loading的邏輯應該改成拿getBoards的狀態來判斷 */}
      {(isLoadingColumns || activeBoardId === 0) && (
        <div className={styles.columnContainer}>
          <LoadingColumn numbers={3} />
        </div>
      )}
      {!isLoadingColumns &&
        activeBoardId !== 0 &&
        columnsData &&
        columnsData.length === 0 && <EmptyColumn />}
      {columnsData && columnsData.length > 0 && (
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className={styles.columnContainer}>
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
      )}
    </div>
  );
}

export default Board;
