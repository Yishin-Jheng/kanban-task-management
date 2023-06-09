import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchTasks = createAsyncThunk("tasks/fetch", async (arg) => {
  const { columnId } = arg;
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("id", { ascending: true })
    .eq("columnId", columnId);

  return data;
});

export { fetchTasks };
