import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { getColumns } from "@/api/columns";
import { updateTaskStatus } from "@/api/tasks";
import { Column, LoadingColumn, NewColumn } from "@/components/Column/Column";
import EmptyColumn from "@/components/Column/EmptyColumn";
import styles from "./Board.module.scss";

function Board() {
  const queryClient = useQueryClient();
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);

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

  const {
    mutateAsync: doUpdateTaskStatus,
    isPending: isPendingUpdateTaskStatus,
  } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleDragAndDrop = function (results) {
    const { source: startPoint, destination: endPoint, draggableId } = results;

    if (!endPoint) return;
    if (startPoint.droppableId === endPoint.droppableId) return;

    doUpdateTaskStatus({
      taskId: Number(draggableId),
      columnId: Number(endPoint.droppableId),
    });
  };

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
                  isLoading={isPendingUpdateTaskStatus}
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
