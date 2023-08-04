import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const deleteTasks = createAsyncThunk(
  "tasks/delete",
  async (arg, { rejectWithValue }) => {
    const { taskId } = arg;
    const { error: deleteTaskError } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .single();

    if (deleteTaskError) {
      return rejectWithValue("Delete task error");
    } else {
      return taskId;
    }
  }
);

export { deleteTasks };
