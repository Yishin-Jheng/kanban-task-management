import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomColor } from "./createBoards";
import supabase from "../supabase";

const updateBoards = createAsyncThunk("boards/update", async (arg) => {
  const { boardId, boardName, columns, deletedColumns } = arg;
  const updatedColumns = columns.filter((col) => col.isUpdated);
  const createdColumns = columns.filter(
    (col) => !col.isUpdated && !col.boardId
  );

  // Board part
  await supabase
    .from("boards")
    .update({
      boardName: boardName,
    })
    .eq("id", boardId);

  // Column part
  deletedColumns.map(async (col) => {
    await supabase.from("columns").delete().eq("id", col.id);
  });

  if (updatedColumns.length > 0) {
    await supabase.from("columns").upsert([
      ...updatedColumns.map((col) => {
        return {
          id: col.id,
          statusName: col.statusName,
        };
      }),
    ]);
  }

  let createdColumnsData = [];
  if (createdColumns.length > 0) {
    const { data, error } = await supabase
      .from("columns")
      .insert([
        ...createdColumns.map((col) => {
          return {
            statusName: col.statusName,
            decorationColor: getRandomColor(),
            boardId: boardId,
          };
        }),
      ])
      .select();

    createdColumnsData = data;
  }

  return { ...arg, updatedColumns, createdColumnsData };
});

export { updateBoards };
