import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createBoards } from "../thunks/createBoards";
import { createTasks } from "../thunks/createTasks";
import { deleteBoards } from "../thunks/deleteBoards";
import { deleteTasks } from "../thunks/deleteTasks";
import { updateBoards } from "../thunks/updateBoards";
import { updateTasksByForm } from "../thunks/updateTasks";
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
    setModal(state, action) {
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

    // others
    builder.addMatcher(
      isAnyOf(
        createBoards.fulfilled,
        createTasks.fulfilled,
        updateBoards.fulfilled,
        updateTasksByForm.fulfilled,
        deleteBoards.fulfilled,
        deleteTasks.fulfilled,
      ),
      (state) => {
        return {
          ...state,
          isOpen: true,
          whichOpen: "loadingModal",
          isLoading: false,
        };
      },
    );
    builder.addMatcher(
      isAnyOf(
        createBoards.rejected,
        createTasks.rejected,
        updateBoards.rejected,
        updateTasksByForm.rejected,
        deleteBoards.rejected,
        deleteTasks.rejected,
      ),
      (state, action) => {
        console.error(action.payload);
        return {
          ...state,
          isOpen: true,
          whichOpen: "errorMessageModal",
          errorMsg:
            "Change is invalid. Guest has no permission to modify board or column. If you did not sign in as guest, please check your internet and try again.",
        };
      },
    );
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
