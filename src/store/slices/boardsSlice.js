import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards } from "../thunks/fetchBoards";
import { createBoards } from "../thunks/createBoards";
import { updateBoards } from "../thunks/updateBoards";
import { deleteBoards } from "../thunks/deleteBoards";

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

    // boards/create
    builder.addCase(createBoards.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(createBoards.rejected, (state, action) => {
      state.error = action.error;
    });

    // boards/update
    builder.addCase(updateBoards.fulfilled, (state, action) => {
      const boardData = state.data.find(
        (board) => board.id === action.payload.boardId
      );
      boardData.boardName = action.payload.boardName;
    });
    builder.addCase(updateBoards.rejected, (state, action) => {
      state.error = action.error;
    });

    // boards/delete
    builder.addCase(deleteBoards.fulfilled, (state, action) => {
      state.data = state.data.filter((board) => board.id !== action.payload);
      state.activeBoardId = state.data[0].id;
    });
    builder.addCase(deleteBoards.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const { setActiveBoard } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
