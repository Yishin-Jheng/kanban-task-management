import { createSlice } from "@reduxjs/toolkit";
import { updateBoards } from "../thunks/updateBoards";

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    data: [],
    error: null,
  },
  reducers: {
    resetColumns(state) {
      state.data = [];
    },
  },
  extraReducers(builder) {
    // boards/update
    builder.addCase(updateBoards.fulfilled, (state, action) => {
      // Create
      action.payload.createdColumnsData.map((createdCol) => {
        state.data.push(createdCol);
        return createdCol;
      });
      // Update
      state.data.map((col) =>
        action.payload.updatedColumns.map((updatedCol) => {
          if (col.id === updatedCol.id) {
            col.statusName = updatedCol.statusName;
          }
          return updatedCol;
        }),
      );
      // Delete
      action.payload.deletedColumns.map((deletedCol) => {
        state.data = state.data.filter((col) => col.id !== deletedCol.id);
        return deletedCol;
      });
    });
    builder.addCase(updateBoards.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const { resetColumns } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
