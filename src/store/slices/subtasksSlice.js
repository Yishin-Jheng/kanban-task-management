import { createSlice } from "@reduxjs/toolkit";
import { fetchSubtasks } from "../thunks/fetchSubtasks";

const subtasksSlice = createSlice({
  name: "subtasks",
  initialState: {
    data: [],
    error: null,
  },
  extraReducers(builder) {
    // subtasks/fetch
    builder.addCase(fetchSubtasks.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchSubtasks.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const subtasksReducer = subtasksSlice.reducer;
