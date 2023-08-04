import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const createTasks = createAsyncThunk(
  "tasks/create",
  async (arg, { rejectWithValue }) => {
    const insertData = {
      title: arg.title,
      description: arg.description,
      columnId: arg.columnId,
      totalSubNum: arg.subtasks.length,
      finishedSubNum: 0,
    };

    const { data: taskData, error: postTaskError } = await supabase
      .from("tasks")
      .insert([insertData])
      .select();

    const { error: postSubError } = await supabase.from("subtasks").insert(
      arg.subtasks.map((subtask) => {
        return {
          description: subtask.description,
          checkOrNot: false,
          taskId: taskData[0].id,
        };
      })
    );

    if (postTaskError || postSubError) {
      return rejectWithValue("Create task error");
    } else {
      return taskData[0];
    }
  }
);

export { createTasks };
