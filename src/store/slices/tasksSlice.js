import { createSlice } from "@reduxjs/toolkit";
import { createTasks } from "../thunks/createTasks";
import { deleteTasks } from "../thunks/deleteTasks";
import { updateTasksByForm } from "../thunks/updateTasks";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    error: null,
  },
  reducers: {
    resetTasks(state) {
      state.data = [];
    },
  },
  extraReducers(builder) {
    // tasks/update/byForm
    builder.addCase(updateTasksByForm.fulfilled, (state, action) => {
      const taskData = state.data.find(
        (task) => task.id === action.payload.taskId,
      );
      Object.assign(taskData, {
        title: action.payload.title,
        description: action.payload.description,
        columnId: action.payload.columnId,
        totalSubNum: action.payload.subtasks.length,
        finishedSubNum:
          taskData.finishedSubNum -
          action.payload.deleteFinishedSubtasks.length,
      });
    });
    builder.addCase(updateTasksByForm.rejected, (state, action) => {
      state.error = action.error;
    });

    // tasks/create
    builder.addCase(createTasks.fulfilled, (state, action) => {
      state.data.push(action.payload);
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
