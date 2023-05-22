import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards } from "../thunks/fetchBoards";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    data: [],
    error: null,
  },
  extraReducers(builder) {
    // boards/fetch
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.error = action.error; // NOT payload here
    });
  },
});

export const boardsReducer = boardsSlice.reducer;
