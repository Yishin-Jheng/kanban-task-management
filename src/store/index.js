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
import { usersReducer } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    modal: modalReducer,
    form: formReducer,
  },
});

setupListeners(store.dispatch);

export * from "./thunks/createBoards";
export * from "./thunks/updateBoards";
export * from "./thunks/userLogin";
export {
  addListArray,
  closeModal,
  removeListArray,
  resetColumns,
  setActiveBoard,
  setForm,
  setListArray,
  setModal,
  store,
};
