import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

const fetchBoards = createAsyncThunk(
  "boards/fetch",
  async (_, { rejectWithValue }) => {
    const { data, error: getBoardError } = await supabase
      .from("boards")
      .select("*")
      .order("id", { ascending: true });

    if (getBoardError) {
      return rejectWithValue("Fetch boards error");
    } else {
      return data;
    }
  }
);

export { fetchBoards };
