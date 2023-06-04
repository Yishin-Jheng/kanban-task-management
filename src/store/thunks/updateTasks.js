import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const updateTasks = createAsyncThunk("tasks/update", async (arg) => {
  const { columnId, taskId } = arg;
  const { data, error } = await supabase
    .from("tasks")
    .update({ columnId: columnId })
    .eq("id", taskId);

  return arg;
});

export { updateTasks };
