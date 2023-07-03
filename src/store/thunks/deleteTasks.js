import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const deleteTasks = createAsyncThunk("tasks/delete", async (arg) => {
  const { taskId } = arg;
  await supabase.from("tasks").delete().eq("id", taskId);

  return taskId;
});

export { deleteTasks };
