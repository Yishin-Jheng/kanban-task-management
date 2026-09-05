import { createSlice } from "@reduxjs/toolkit";
import { updateSubtasks } from "../thunks/updateSubtasks";

const subtasksSlice = createSlice({
  name: "subtasks",
  initialState: {
    data: [],
    error: null,
  },
  extraReducers(builder) {
    // subtasks/update
    builder.addCase(updateSubtasks.fulfilled, (state, action) => {
      const subtaskData = state.data.find(
        (subtasks) => subtasks.id === action.payload.subtaskId,
      );
      subtaskData.checkOrNot = !action.payload.currentCheck;
    });
    builder.addCase(updateSubtasks.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const subtasksReducer = subtasksSlice.reducer;
