import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchColumns = createAsyncThunk("columns/fetch", async (arg) => {
  const { boardId } = arg;
  const { data, error } = await supabase
    .from("columns")
    .select("*")
    .eq("boardId", boardId);

  return data;
});

export { fetchColumns };
