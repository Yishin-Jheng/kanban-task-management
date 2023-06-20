import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const createTasks = createAsyncThunk("tasks/create", async (arg) => {
  const { title, description, columnId, subtasks } = arg;
  const insertData = {
    title: title,
    description: description,
    columnId: columnId,
    totalSubNum: subtasks.length,
    finishedSubNum: 0,
  };

  const { data: taskData, error } = await supabase
    .from("tasks")
    .insert([insertData])
    .select();

  await supabase
    .from("subtasks")
    .insert(
      subtasks.map((subtask) => {
        return {
          description: subtask.description,
          checkOrNot: false,
          taskId: taskData[0].id,
        };
      })
    )
    .select();

  return taskData[0];
});

export { createTasks };
