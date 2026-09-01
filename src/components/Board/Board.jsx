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
  // XXX: useThunk 在做的事情看起來很像react-query
  // 之前的 redux 是把 zustand 和 react-query 結合在一起的感覺嗎？
  // 在現在回想還是覺得分開比較好，把後端跟前端的資料放在一起的話，資料量比較多的時候感覺就會出大事
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

  // XXX: 為啥是看 activeBoardId 去決定要不要 load columns 的資料咧？
  // 以 commeet 專案為例的話，理論上我渲染了 board 元件之後 useQuery 就會直接去拿資料了
  // 是因為這邊 doFetchColumns 更像是 useMutation 嗎？好像是這樣沒錯，那真的很奇怪了
  useEffect(() => {
    if (activeBoardId !== 0) {
      doFetchColumns({ boardId: activeBoardId });
    }
  }, [doFetchColumns, activeBoardId]);

  return (
    <div className={styles.board}>
      {/* XXX: 到現在都還記得以前 andy 說過 jsx 裡面不要再去用三元，確實看起來醜醜的 */}
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
