import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchBoards = createAsyncThunk("boards/fetch", async () => {
  const { data, error } = await supabase.from("boards").select("*");

  return data;
});

export { fetchBoards };
