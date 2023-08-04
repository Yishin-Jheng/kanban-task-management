import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchColumns = createAsyncThunk(
  "columns/fetch",
  async (arg, { rejectWithValue }) => {
    const { boardId } = arg;
    const { data, error: getColError } = await supabase
      .from("columns")
      .select("*")
      .order("id", { ascending: true })
      .eq("boardId", boardId);

    if (getColError) {
      return rejectWithValue("Fetch columns error");
    } else {
      return data;
    }
  }
);

export { fetchColumns };
