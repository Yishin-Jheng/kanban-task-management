import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { boardsReducer, setActiveBoard } from "./slices/boardsSlice";
import { columnsReducer, resetColumns } from "./slices/columnsSlice";
import {
  addListArray,
  formReducer,
  removeListArray,
  setForm,
  setListArray,
} from "./slices/formSlice";
import { closeModal, modalReducer, setModal } from "./slices/modalSlice";
import { subtasksReducer } from "./slices/subtasksSlice";
import { resetTasks, tasksReducer } from "./slices/tasksSlice";
import { usersReducer } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
    subtasks: subtasksReducer,
    modal: modalReducer,
    form: formReducer,
  },
});

setupListeners(store.dispatch);

export * from "./thunks/createBoards";
export * from "./thunks/createTasks";
export * from "./thunks/deleteBoards";
export * from "./thunks/deleteTasks";
export * from "./thunks/fetchSubtasks";
export * from "./thunks/fetchTasks";
export * from "./thunks/updateBoards";
export * from "./thunks/updateSubtasks";
export * from "./thunks/updateTasks";
export * from "./thunks/userLogin";
export {
  addListArray,
  closeModal,
  removeListArray,
  resetColumns,
  resetTasks,
  setActiveBoard,
  setForm,
  setListArray,
  setModal,
  store,
};
