import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchSubtasks = createAsyncThunk("subtasks/fetch", async (arg) => {
  const { taskId } = arg;
  const { data, error } = await supabase
    .from("subtasks")
    .select("*")
    .order("id", { ascending: true })
    .eq("taskId", taskId);

  return data;
});

export { fetchSubtasks };
