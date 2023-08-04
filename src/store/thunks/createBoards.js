import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const createBoards = createAsyncThunk(
  "boards/create",
  async (arg, { rejectWithValue }) => {
    const insertData = {
      boardName: arg.boardName,
    };

    const { data: boardData, error: postBoardError } = await supabase
      .from("boards")
      .insert([insertData])
      .select();

    const { error: postColError } = await supabase.from("columns").insert(
      arg.columns.map((col) => {
        return {
          statusName: col.statusName,
          decorationColor: getRandomColor(),
          boardId: boardData[0].id,
        };
      })
    );

    if (postBoardError || postColError) {
      return rejectWithValue("Create board error");
    } else {
      return boardData[0];
    }
  }
);

// Choose the decoration color of column randomly
function getRandomColor() {
  let letters = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export { createBoards, getRandomColor };
