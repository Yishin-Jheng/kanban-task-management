import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./fetchTasks";

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
  },
});

export const tasksReducer = tasksSlice.reducer;
