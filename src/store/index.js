import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { boardsReducer } from "./slices/boardsSlice";
import { modalReducer, setModal, closeModal } from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    modal: modalReducer,
  },
});

setupListeners(store.dispatch);

export * from "./thunks/fetchBoards";
export { store, setModal, closeModal };
