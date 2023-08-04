import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const deleteBoards = createAsyncThunk(
  "boards/delete",
  async (arg, { rejectWithValue }) => {
    const { boardId } = arg;
    const { error: deleteBoardError } = await supabase
      .from("boards")
      .delete()
      .eq("id", boardId)
      .single();

    if (deleteBoardError) {
      return rejectWithValue("Delete board error");
    } else {
      return boardId;
    }
  }
);

export { deleteBoards };
