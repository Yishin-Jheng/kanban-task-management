import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    whichOpen: "",
    createOrNot: true,
    deleteBoardOrTask: "",
    detailObj: {},
    isLoading: true,
    errorMsg: null,
  },
  reducers: {
    setModal(_, action) {
      return action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
