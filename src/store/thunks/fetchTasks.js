import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (arg, { rejectWithValue }) => {
    const { columnId } = arg;
    const { data, error: getTaskError } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true })
      .eq("columnId", columnId);

    if (getTaskError) {
      return rejectWithValue("Fetch tasks error");
    } else {
      return data;
    }
  }
);

export { fetchTasks };
