import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    title: "",
    description: "",
    subtasks: [],
    columns: [],
    columnId: 0,
    status: "",
    formCheck: false,
  },
  reducers: {
    setForm(state, action) {
      return { ...state, ...action.payload };
    },
    setListArray(state, action) {
      if (action.payload.forBoardOrTask === "task") {
        state.subtasks.find(
          (subtask) => subtask.id === action.payload.id
        ).description = action.payload.value;
      } else {
        state.columns.find(
          (column) => column.id === action.payload.id
        ).statusName = action.payload.value;
      }
    },
    addListArray(state, action) {
      if (action.payload.forBoardOrTask === "task") {
        const maxNum = Math.max(...state.subtasks.map((subtask) => subtask.id));
        state.subtasks.push({
          id: maxNum >= 0 ? maxNum + 1 : 1,
          description: "",
        });
      } else {
        const maxNum = Math.max(...state.columns.map((column) => column.id));
        state.columns.push({
          id: maxNum >= 0 ? maxNum + 1 : 1,
          statusName: "",
        });
      }
    },
    removeListArray(state, action) {
      if (action.payload.forBoardOrTask === "task") {
        state.subtasks = state.subtasks.filter(
          (subtask) => subtask.id !== action.payload.id
        );
      } else {
        state.columns = state.columns.filter(
          (column) => column.id !== action.payload.id
        );
      }
    },
  },
});

export const { setForm, setListArray, addListArray, removeListArray } =
  formSlice.actions;
export const formReducer = formSlice.reducer;
