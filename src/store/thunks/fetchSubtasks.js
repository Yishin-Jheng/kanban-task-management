import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchSubtasks = createAsyncThunk(
  "subtasks/fetch",
  async (arg, { rejectWithValue }) => {
    const { taskId } = arg;
    const { data, error: getSubError } = await supabase
      .from("subtasks")
      .select("*")
      .order("id", { ascending: true })
      .eq("taskId", taskId);

    if (getSubError) {
      return rejectWithValue("Fetch subtasks error");
    } else {
      return data;
    }
  }
);

export { fetchSubtasks };
