import { createSlice } from "@reduxjs/toolkit";
import { fetchColumns } from "../thunks/fetchColumns";

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    data: [],
    error: null,
  },
  extraReducers(builder) {
    // columns/fetch
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchColumns.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const columnsReducer = columnsSlice.reducer;
