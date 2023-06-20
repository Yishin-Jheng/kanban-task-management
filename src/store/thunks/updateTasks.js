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

const updateTasksByForm = createAsyncThunk(
  "tasks/update/byForm",
  async (arg) => {
    const { taskId, title, description, columnId, subtasks } = arg;
    await supabase
      .from("tasks")
      .update({
        title: title,
        description: description,
        columnId: columnId,
        totalSubNum: subtasks.length,
      })
      .eq("id", taskId);

    const oldSubtasks = subtasks.filter((s) => s.taskId);
    const newSubtasks = subtasks.filter((s) => !oldSubtasks.includes(s));

    const { data: oldSubtasksData, error: oldSubtaskserror } = await supabase
      .from("subtasks")
      .upsert(
        oldSubtasks.map((subtask) => {
          return {
            id: subtask.id,
            description: subtask.description,
          };
        })
      )
      .select();

    const { data: newSubtasksData, error: newSubtasksError } = await supabase
      .from("subtasks")
      .insert(
        newSubtasks.map((subtask) => {
          return {
            description: subtask.description,
            checkOrNot: false,
            taskId: taskId,
          };
        })
      )
      .select();

    return {
      task: arg,
      subtask: { old: oldSubtasksData, new: newSubtasksData },
    };
  }
);

export { updateTasksStatus, updateTasksSubNum, updateTasksByForm };
