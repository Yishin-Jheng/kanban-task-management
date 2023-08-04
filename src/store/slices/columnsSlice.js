import { createSlice } from "@reduxjs/toolkit";
import { fetchColumns } from "../thunks/fetchColumns";
import { updateBoards } from "../thunks/updateBoards";

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    data: [],
    error: null,
  },
  reducers: {
    resetColumns(state, action) {
      state.data = [];
    },
  },
  extraReducers(builder) {
    // columns/fetch
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchColumns.rejected, (state, action) => {
      state.error = action.error;
    });

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
        })
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
