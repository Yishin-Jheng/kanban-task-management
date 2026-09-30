import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getBoards } from "@/api/boards";
import { getColumns } from "@/api/columns";
import { updateTaskStatus } from "@/api/tasks";
import Column from "@/components/Column/Column";
import EmptyColumn from "@/components/Column/EmptyColumn";
import LoadingColumn from "@/components/Column/LoadingColumn";
import NewColumn from "@/components/Column/NewColumn";
import { useBoardStore } from "@/store/useBoardStore";
import styles from "./Board.module.scss";

function Board() {
  const queryClient = useQueryClient();
  const activeBoardId = useBoardStore((store) => store.activeBoardId);

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
    data: columns = [],
    isFetching: isFetchingColumns,
    isError: isErrorColumns,
  } = useQuery({
    queryKey: ["columns", activeBoardId],
    queryFn:
      typeof activeBoardId === "number"
        ? () => getColumns({ boardId: activeBoardId })
        : skipToken,
  });
  const columnsLength = columns.length;
  const isFetching = isFetchingBoards || isFetchingColumns;
  const isError = isErrorBoards || isErrorColumns;
  const isShowSkeleton = isFetching && !isError && !columnsLength;

  const { mutate: doUpdateTaskStatus, isPending: isPendingUpdateTaskStatus } =
    useMutation({
      mutationFn: updateTaskStatus,
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
    });

  const handleDragAndDrop = function (results: DropResult) {
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
          <LoadingColumn colNumber={3} />
        </div>
      )}
      {!isShowSkeleton && columnsLength === 0 && (
        <EmptyColumn
          isError={isError}
          isBoardsEmpty={isSuccessBoards && boards.length === 0}
        />
      )}
      {columnsLength > 0 && (
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className={styles.columnContainer}>
            {columns.map((col) => {
              return (
                <Column
                  key={col.id}
                  statusName={col.statusName}
                  decorationColor={col.decorationColor}
                  columnId={col.id}
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
