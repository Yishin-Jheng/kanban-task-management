import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomColor } from "./createBoards";
import supabase from "../supabase";

const updateBoards = createAsyncThunk(
  "boards/update",
  async (arg, { rejectWithValue }) => {
    const { boardId, boardName, columns, deletedColumns } = arg;
    const updatedColumns = columns.filter((col) => col.isUpdated);
    const createdColumns = columns.filter(
      (col) => !col.isUpdated && !col.boardId
    );

    // Board part - Update
    const { error: putBoardError } = await supabase
      .from("boards")
      .update({
        boardName: boardName,
      })
      .eq("id", boardId)
      .single();

    // Column part - Delete
    // NOTE: 利用 Promise.all 去等待所有刪除的請求完成，再利用 try-catch 去接住錯誤，使外層的 async thunk 可以在這正確的時機下被標記為 rejected
    try {
      await Promise.all(
        deletedColumns.map(async (col) => {
          const { error: deleteColError } = await supabase
            .from("columns")
            .delete()
            .eq("id", col.id)
            .single();

          if (deleteColError) {
            throw new Error(deleteColError);
          }
        })
      );
    } catch (error) {
      return rejectWithValue("Delete column error");
    }

    // Column part - Update
    if (updatedColumns.length > 0) {
      const { error: putColError } = await supabase.from("columns").upsert([
        ...updatedColumns.map((col) => {
          return {
            id: col.id,
            statusName: col.statusName,
          };
        }),
      ]);

      if (putColError) {
        return rejectWithValue("Update column error");
      }
    }

    // Column part - Create
    let createdColumnsData = [];
    if (createdColumns.length > 0) {
      const { data, error: postColError } = await supabase
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

      if (postColError) {
        return rejectWithValue("Create column error");
      } else {
        createdColumnsData = data;
      }
    }

    if (putBoardError) {
      return rejectWithValue("Update board error");
    } else {
      return { ...arg, updatedColumns, createdColumnsData };
    }
  }
);

export { updateBoards };
