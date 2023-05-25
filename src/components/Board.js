import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { fetchColumns } from "../store";
import { Column, LoadingColumn, NewColumn } from "./Column";

function Board({ boardId, statusArr, taskArr }) {
  const { data: columnsData } = useSelector((state) => {
    return state.columns;
  });
  const [doFetchColumns, isLoadingColumns, loadingColumnsError] =
    useThunk(fetchColumns);

  useEffect(() => {
    // TODO: make boardId not hardcode
    doFetchColumns({ boardId: 1 });
  }, [doFetchColumns]);

  if (isLoadingColumns) {
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
