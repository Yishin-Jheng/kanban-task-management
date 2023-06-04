import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { boardsReducer, setActiveBoard } from "./slices/boardsSlice";
import { columnsReducer } from "./slices/columnsSlice";
import { tasksReducer } from "./slices/tasksSlice";
import { subtasksReducer } from "./slices/subtasksSlice";
import { modalReducer, setModal, closeModal } from "./slices/modalSlice";
import {
  formReducer,
  setForm,
  setListArray,
  addListArray,
  removeListArray,
} from "./slices/formSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
    subtasks: subtasksReducer,
    modal: modalReducer,
    form: formReducer,
  },
});

setupListeners(store.dispatch);

export * from "./thunks/fetchBoards";
export * from "./thunks/fetchColumns";
export * from "./thunks/fetchTasks";
export * from "./thunks/fetchSubtasks";
export * from "./thunks/updateSubtasks";
export {
  store,
  setActiveBoard,
  setModal,
  closeModal,
  setForm,
  setListArray,
  addListArray,
  removeListArray,
};
