import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createBoards } from "../thunks/createBoards";
import { createTasks } from "../thunks/createTasks";
import { deleteBoards } from "../thunks/deleteBoards";
import { deleteTasks } from "../thunks/deleteTasks";
import { fetchSubtasks } from "../thunks/fetchSubtasks";
import { fetchTasks } from "../thunks/fetchTasks";
import { updateBoards } from "../thunks/updateBoards";
import { updateSubtasks } from "../thunks/updateSubtasks";
import {
  updateTasksByForm,
  updateTasksStatus,
  updateTasksSubNum,
} from "../thunks/updateTasks";
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

    // columns/fetch & tasks/fetch & subtasks/fetch
    builder.addMatcher(
      isAnyOf(fetchTasks.rejected, fetchSubtasks.rejected),
      (state) => {
        return {
          ...state,
          isOpen: true,
          whichOpen: "errorMessageModal",
          errorMsg:
            "Fetching data failed. Please check your internet and try again.",
        };
      },
    );

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
        updateTasksStatus.rejected,
        updateTasksSubNum.rejected,
        updateTasksByForm.rejected,
        updateSubtasks.rejected,
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
