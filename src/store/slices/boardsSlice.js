import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setActiveBoard } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
