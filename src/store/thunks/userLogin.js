import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const retrieveSession = createAsyncThunk(
  "users/retrieveSession",
  async (arg) => {
    const { data: sessionData } = await supabase.auth.getSession();

    return sessionData;
  }
);

const userLogin = createAsyncThunk(
  "users/login",
  async (arg, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: arg.email,
      password: arg.password,
    });

    if (error) {
      return rejectWithValue(error.message);
    } else {
      return data;
    }
  }
);

export { retrieveSession, userLogin };
