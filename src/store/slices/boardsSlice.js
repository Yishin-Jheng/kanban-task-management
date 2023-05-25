import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards } from "../thunks/fetchBoards";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    data: [],
    error: null,
    activeBoardId: 0,
  },
  reducers: {
    setActiveBoard(state, action) {
      state.activeBoardId = action.payload;
    },
  },
  extraReducers(builder) {
    // boards/fetch
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.data = action.payload;
      if (!state.activeBoardId) {
        state.activeBoardId = action.payload[0].id;
      }
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.error = action.error; // NOT payload here
    });
  },
});

export const { setActiveBoard } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
