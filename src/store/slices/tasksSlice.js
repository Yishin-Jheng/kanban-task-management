import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../thunks/fetchTasks";
import {
  updateTasksStatus,
  updateTasksSubNum,
  updateTasksByForm,
} from "../thunks/updateTasks";
import { createTasks } from "../thunks/createTasks";
import { deleteTasks } from "../thunks/deleteTasks";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    error: null,
  },
  reducers: {
    resetTasks(state, action) {
      state.data = [];
    },
  },
  extraReducers(builder) {
    // tasks/fetch
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data = [...state.data, ...action.payload];
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.error = action.error;
    });

    // tasks/update/status
    builder.addCase(updateTasksStatus.fulfilled, (state, action) => {
      const taskData = state.data.find(
        (tasks) => tasks.id === action.payload.taskId
      );
      taskData.columnId = action.payload.columnId;
    });
    builder.addCase(updateTasksStatus.rejected, (state, action) => {
      state.error = action.error;
    });

    // tasks/update/subNum
    builder.addCase(updateTasksSubNum.fulfilled, (state, action) => {
      const taskData = state.data.find(
        (tasks) => tasks.id === action.payload.taskId
      );
      taskData.finishedSubNum += action.payload.subNum;
    });
    builder.addCase(updateTasksSubNum.rejected, (state, action) => {
      state.error = action.error;
    });

    // tasks/update/byForm
    builder.addCase(updateTasksByForm.fulfilled, (state, action) => {
      const taskData = state.data.find(
        (tasks) => tasks.id === action.payload.task.taskId
      );
      Object.assign(taskData, {
        title: action.payload.task.title,
        description: action.payload.task.description,
        columnId: action.payload.task.columnId,
        totalSubNum: action.payload.task.subtasks.length,
      });
    });
    builder.addCase(updateTasksByForm.rejected, (state, action) => {
      state.error = action.error;
    });

    // tasks/create
    builder.addCase(createTasks.fulfilled, (state, action) => {
      state.data.push({
        ...action.payload,
      });
    });
    builder.addCase(createTasks.rejected, (state, action) => {
      state.error = action.error;
    });

    // task/delete
    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      state.data = state.data.filter((task) => task.id !== action.payload);
    });
    builder.addCase(deleteTasks.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const { resetTasks } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
