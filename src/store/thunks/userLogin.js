import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const retrieveSession = createAsyncThunk(
  "users/retrieveSession",
  async (arg) => {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    return sessionData;
  }
);

const userLogin = createAsyncThunk("users/login", async (arg) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: arg.email,
    password: arg.password,
  });

  return data;
});

export { retrieveSession, userLogin };
