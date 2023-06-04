import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../thunks/fetchTasks";
import { updateTasks } from "../thunks/updateTasks";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    error: null,
  },
  extraReducers(builder) {
    // tasks/fetch
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data.push(...action.payload);
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.error = action.error;
    });

    // tasks/update
    builder.addCase(updateTasks.fulfilled, (state, action) => {
      const taskData = state.data.find(
        (tasks) => tasks.id === action.payload.taskId
      );
      taskData.columnId = action.payload.columnId;
    });
    builder.addCase(updateTasks.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
