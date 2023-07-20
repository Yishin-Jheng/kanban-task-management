import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { updateTasksByForm } from "../thunks/updateTasks";
import { createTasks } from "../thunks/createTasks";
import { deleteTasks } from "../thunks/deleteTasks";
import { createBoards } from "../thunks/createBoards";
import { updateBoards } from "../thunks/updateBoards";
import { deleteBoards } from "../thunks/deleteBoards";
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
    closeModal(state, action) {
      state.isOpen = false;
    },
  },
  extraReducers(builder) {
    // users/login
    builder.addCase(userLogin.fulfilled, (state, action) => {
      return {
        ...state,
        isOpen: action.payload.session === null ? true : false,
        whichOpen: "errorMessageModal",
        errorMsg:
          action.payload.session === null
            ? "Email or password is incorrect. Please try again."
            : null,
      };
    });

    // boards/create & boards/update & boards/delete
    // tasks/create & tasks/update/byForm & tasks/delete
    builder.addMatcher(
      isAnyOf(
        createBoards.fulfilled,
        createTasks.fulfilled,
        updateBoards.fulfilled,
        updateTasksByForm.fulfilled,
        deleteBoards.fulfilled,
        deleteTasks.fulfilled
      ),
      (state, action) => {
        return {
          ...state,
          isOpen: true,
          whichOpen: "loadingModal",
          isLoading: false,
        };
      }
    );
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
