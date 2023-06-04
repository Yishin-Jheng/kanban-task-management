import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const updateSubtasks = createAsyncThunk("subtasks/update", async (arg) => {
  const { currentCheck, subtaskId } = arg;
  const { data, error } = await supabase
    .from("subtasks")
    .update({ checkOrNot: !currentCheck })
    .eq("id", subtaskId);

  return arg;
});

export { updateSubtasks };
