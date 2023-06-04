import { createSlice } from "@reduxjs/toolkit";
import { fetchSubtasks } from "../thunks/fetchSubtasks";
import { updateSubtasks } from "../thunks/updateSubtasks";

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

    // subtasks/update
    builder.addCase(updateSubtasks.fulfilled, (state, action) => {
      const subtaskData = state.data.find(
        (subtasks) => subtasks.id === action.payload.subtaskId
      );
      subtaskData.checkOrNot = !action.payload.currentCheck;
    });
    builder.addCase(updateSubtasks.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const subtasksReducer = subtasksSlice.reducer;
