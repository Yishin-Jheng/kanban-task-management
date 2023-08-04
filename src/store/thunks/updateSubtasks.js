import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const updateSubtasks = createAsyncThunk(
  "subtasks/update",
  async (arg, { rejectWithValue }) => {
    const { currentCheck, subtaskId } = arg;
    const { error: putSubError } = await supabase
      .from("subtasks")
      .update({ checkOrNot: !currentCheck })
      .eq("id", subtaskId)
      .single();

    if (putSubError) {
      return rejectWithValue("Update subtask error");
    } else {
      return arg;
    }
  }
);

export { updateSubtasks };
