import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const updateTasksStatus = createAsyncThunk(
  "tasks/update/status",
  async (arg) => {
    const { columnId, taskId } = arg;
    await supabase
      .from("tasks")
      .update({ columnId: columnId })
      .eq("id", taskId);

    return arg;
  }
);

const updateTasksSubNum = createAsyncThunk(
  "tasks/update/subNum",
  async (arg) => {
    const { taskId, subNum } = arg;
    const { data: currentSubNum, error } = await supabase
      .from("tasks")
      .select("finishedSubNum")
      .eq("id", taskId);

    await supabase
      .from("tasks")
      .update({ finishedSubNum: currentSubNum[0].finishedSubNum + subNum })
      .eq("id", taskId);

    return arg;
  }
);

export { updateTasksStatus, updateTasksSubNum };
