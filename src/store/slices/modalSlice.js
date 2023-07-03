import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { updateTasksByForm } from "../thunks/updateTasks";
import { createTasks } from "../thunks/createTasks";
import { deleteTasks } from "../thunks/deleteTasks";
import { createBoards } from "../thunks/createBoards";
import { updateBoards } from "../thunks/updateBoards";
import { deleteBoards } from "../thunks/deleteBoards";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    whichOpen: "",
    createOrNot: true,
    deleteBoardOrTask: "",
    detailObj: {},
    isLoading: true,
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
