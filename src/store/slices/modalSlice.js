import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../thunks/userLogin";

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
  extraReducers(builder) {
    // users/login
    builder.addCase(userLogin.rejected, (state) => {
      return {
        ...state,
        isOpen: true,
        whichOpen: "errorMessageModal",
        errorMsg: "Email or password is incorrect. Please try again.",
      };
    });
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
