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
import type { Task } from "@/api/tasks";
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
      mutationFn: (arg: {
        taskId: number;
        prevColumnId: number;
        newColumnId: number;
      }) =>
        updateTaskStatus({
          taskId: arg.taskId,
          columnId: arg.newColumnId,
        }),
      onSettled: (_data, _error, arg) => {
        void queryClient.invalidateQueries({
          queryKey: ["tasks", arg.prevColumnId],
        });
        void queryClient.invalidateQueries({
          queryKey: ["tasks", arg.newColumnId],
        });
      },
    });

  const handleDragAndDrop = function (results: DropResult) {
    const { source: startPoint, destination: endPoint, draggableId } = results;

    if (!endPoint) return;

    const taskId = Number(draggableId);
    const prevColumnId = Number(startPoint.droppableId);
    const newColumnId = Number(endPoint.droppableId);

    if (prevColumnId === newColumnId) return;

    const prevTasks =
      queryClient.getQueryData<Task[]>(["tasks", prevColumnId]) ?? [];
    const newTasks =
      queryClient.getQueryData<Task[]>(["tasks", newColumnId]) ?? [];
    const task = prevTasks.find((task) => task.id === taskId);

    if (!task) return;

    void queryClient.cancelQueries({ queryKey: ["tasks", prevColumnId] });
    void queryClient.cancelQueries({ queryKey: ["tasks", newColumnId] });
    queryClient.setQueryData(
      ["tasks", prevColumnId],
      prevTasks.filter((task) => task.id !== taskId),
    );
    queryClient.setQueryData(["tasks", newColumnId], [...newTasks, task]);

    doUpdateTaskStatus({
      taskId,
      prevColumnId,
      newColumnId,
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
                  isDragDisabled={isPendingUpdateTaskStatus}
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
