import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { getColumns } from "@/api/columns";
import { Column, LoadingColumn, NewColumn } from "@/components/Column/Column";
import EmptyColumn from "@/components/Column/EmptyColumn";
import { useThunk } from "@/hooks/useThunk";
import { updateTasksStatus } from "@/store";
import styles from "./Board.module.scss";

function Board() {
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);
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

  const {
    data: boards,
    isFetching: isFetchingBoards,
    isSuccess: isSuccessBoards,
    isError: isErrorBoards,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  const {
    data: columns,
    isFetching: isFetchingColumns,
    isError: isErrorColumns,
  } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn: () => getColumns({ boardId: activeBoardId }),
    enabled: !!activeBoardId,
    placeholderData: keepPreviousData,
  });

  const columnsLength = columns?.length;
  const isFetching = isFetchingBoards || isFetchingColumns;
  const isError = isErrorBoards || isErrorColumns;
  const isShowSkeleton = isFetching && !isError && !columnsLength;

  return (
    <div className={styles.board}>
      {isShowSkeleton && (
        <div className={styles.columnContainer}>
          <LoadingColumn numbers={3} />
        </div>
      )}
      {!isShowSkeleton && !columnsLength && (
        <EmptyColumn
          isError={isError}
          isBoardsEmpty={isSuccessBoards && boards.length === 0}
        />
      )}
      {columnsLength > 0 && (
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className={styles.columnContainer}>
            {columns.map((status) => {
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
