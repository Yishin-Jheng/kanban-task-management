import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchBoards = createAsyncThunk("boards/fetch", async () => {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("id", { ascending: true });

  return data;
});

export { fetchBoards };
