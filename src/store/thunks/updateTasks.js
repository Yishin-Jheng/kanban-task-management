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
    const { taskId, title, description, columnId, subtasks, deletedSubtasks } =
      arg;
    const updatedSubtasks = subtasks.filter((s) => s.isUpdated);
    const createdSubtasks = subtasks.filter((s) => !s.isUpdated && !s.taskId);
    const deleteFinishedSubtasks = deletedSubtasks.filter((s) => s.checkOrNot);

    // Task part
    const { data: currentSubNum, error } = await supabase
      .from("tasks")
      .select("finishedSubNum")
      .eq("id", taskId);

    await supabase
      .from("tasks")
      .update({
        title: title,
        description: description,
        columnId: columnId,
        totalSubNum: subtasks.length,
        finishedSubNum:
          currentSubNum[0].finishedSubNum - deleteFinishedSubtasks.length,
      })
      .eq("id", taskId);

    // Subtask part
    deletedSubtasks.map(async (s) => {
      await supabase.from("subtasks").delete().eq("id", s.id);
    });

    if (updatedSubtasks.length > 0) {
      await supabase.from("subtasks").upsert([
        ...updatedSubtasks.map((subtask) => {
          return {
            id: subtask.id,
            description: subtask.description,
          };
        }),
      ]);
    }

    if (createdSubtasks.length > 0) {
      await supabase.from("subtasks").insert([
        ...createdSubtasks.map((subtask) => {
          return {
            description: subtask.description,
            checkOrNot: false,
            taskId: taskId,
          };
        }),
      ]);
    }

    return { ...arg, deleteFinishedSubtasks };
  }
);

export { updateTasksStatus, updateTasksSubNum, updateTasksByForm };
