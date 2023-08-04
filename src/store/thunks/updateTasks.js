import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const updateTasksStatus = createAsyncThunk(
  "tasks/update/status",
  async (arg, { rejectWithValue }) => {
    const { columnId, taskId } = arg;
    const { error: putTaskError } = await supabase
      .from("tasks")
      .update({ columnId: columnId })
      .eq("id", taskId)
      .single();

    if (putTaskError) {
      return rejectWithValue("Update columnId of task error");
    } else {
      return arg;
    }
  }
);

const updateTasksSubNum = createAsyncThunk(
  "tasks/update/subNum",
  async (arg, { rejectWithValue }) => {
    const { taskId, subNum } = arg;
    const { data: currentSubNum, error: getSubNumError } = await supabase
      .from("tasks")
      .select("finishedSubNum")
      .eq("id", taskId);

    const { error: putTaskError } = await supabase
      .from("tasks")
      .update({ finishedSubNum: currentSubNum[0].finishedSubNum + subNum })
      .eq("id", taskId)
      .single();

    if (getSubNumError || putTaskError) {
      return rejectWithValue("Update finished subtask number of task error");
    } else {
      return arg;
    }
  }
);

const updateTasksByForm = createAsyncThunk(
  "tasks/update/byForm",
  async (arg, { rejectWithValue }) => {
    const { taskId, title, description, columnId, subtasks, deletedSubtasks } =
      arg;
    const updatedSubtasks = subtasks.filter((s) => s.isUpdated);
    const createdSubtasks = subtasks.filter((s) => !s.isUpdated && !s.taskId);
    const deleteFinishedSubtasks = deletedSubtasks.filter((s) => s.checkOrNot);

    // Task part - Update
    const { data: currentSubNum, error: getSubNumError } = await supabase
      .from("tasks")
      .select("finishedSubNum")
      .eq("id", taskId);

    const { error: putTaskError } = await supabase
      .from("tasks")
      .update({
        title: title,
        description: description,
        columnId: columnId,
        totalSubNum: subtasks.length,
        finishedSubNum:
          currentSubNum[0].finishedSubNum - deleteFinishedSubtasks.length,
      })
      .eq("id", taskId)
      .single();

    // Subtask part - Delete
    try {
      await Promise.all(
        deletedSubtasks.map(async (sub) => {
          const { error: deleteSubError } = await supabase
            .from("subtasks")
            .delete()
            .eq("id", sub.id)
            .single();

          if (deleteSubError) {
            throw new Error(deleteSubError);
          }
        })
      );
    } catch (error) {
      return rejectWithValue("Delete subtask error");
    }

    // Subtask part - Update
    if (updatedSubtasks.length > 0) {
      const { error: putSubError } = await supabase.from("subtasks").upsert([
        ...updatedSubtasks.map((subtask) => {
          return {
            id: subtask.id,
            description: subtask.description,
          };
        }),
      ]);

      if (putSubError) {
        return rejectWithValue("Update subtask error");
      }
    }

    // Subtask part - Create
    if (createdSubtasks.length > 0) {
      const { error: postSubError } = await supabase.from("subtasks").insert([
        ...createdSubtasks.map((subtask) => {
          return {
            description: subtask.description,
            checkOrNot: false,
            taskId: taskId,
          };
        }),
      ]);

      if (postSubError) {
        return rejectWithValue("Create subtask error");
      }
    }

    if (getSubNumError || putTaskError) {
      return rejectWithValue("update task error");
    } else {
      return { ...arg, deleteFinishedSubtasks };
    }
  }
);

export { updateTasksStatus, updateTasksSubNum, updateTasksByForm };
