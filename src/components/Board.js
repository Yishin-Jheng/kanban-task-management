import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { fetchColumns, resetTasks } from "../store";
import { Column, LoadingColumn, NewColumn } from "./Column";

function Board() {
  const dispatch = useDispatch();
  const [columnsData, activeBoardId] = useSelector((state) => {
    const columnsData = state.columns.data;
    const activeBoardId = state.boards.activeBoardId;
    return [columnsData, activeBoardId];
  });
  const [doFetchColumns, isLoadingColumns, loadingColumnsError] =
    useThunk(fetchColumns);

  useEffect(() => {
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

  return (
    <div className="column__container">
      {columnsData.map((status) => {
        return (
          <Column
            key={status.id}
            statusName={status.statusName}
            decorationColor={status.decorationColor}
            columnId={status.id}
          />
        );
      })}
      <NewColumn />
    </div>
  );
}

export default Board;
