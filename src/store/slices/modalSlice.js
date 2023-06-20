import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { updateTasksByForm } from "../thunks/updateTasks";
import { createTasks } from "../thunks/createTasks";
import { deleteTasks } from "../thunks/deleteTasks";

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
    // tasks/update/byForm & /create & /delete
    builder.addMatcher(
      isAnyOf(
        updateTasksByForm.fulfilled,
        createTasks.fulfilled,
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
