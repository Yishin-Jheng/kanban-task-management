import { createSlice } from "@reduxjs/toolkit";
import { retrieveSession, userLogin } from "../thunks/userLogin";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    error: null,
  },
  extraReducers(builder) {
    // users/retrieveSession
    builder.addCase(retrieveSession.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(retrieveSession.rejected, (state, action) => {
      state.error = action.error;
    });

    // users/login
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
