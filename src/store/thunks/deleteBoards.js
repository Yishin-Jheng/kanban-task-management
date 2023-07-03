import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const deleteBoards = createAsyncThunk("boards/delete", async (arg) => {
  const { boardId } = arg;
  await supabase.from("boards").delete().eq("id", boardId);

  return boardId;
});

export { deleteBoards };
