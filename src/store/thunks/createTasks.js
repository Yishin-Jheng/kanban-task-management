import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const createTasks = createAsyncThunk("tasks/create", async (arg) => {
  const insertData = {
    title: arg.title,
    description: arg.description,
    columnId: arg.columnId,
    totalSubNum: arg.subtasks.length,
    finishedSubNum: 0,
  };

  const { data: taskData, error } = await supabase
    .from("tasks")
    .insert([insertData])
    .select();

  await supabase.from("subtasks").insert(
    arg.subtasks.map((subtask) => {
      return {
        description: subtask.description,
        checkOrNot: false,
        taskId: taskData[0].id,
      };
    })
  );

  return taskData[0];
});

export { createTasks };
