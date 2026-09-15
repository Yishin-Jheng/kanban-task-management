import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { boardsReducer, setActiveBoard } from "./slices/boardsSlice";
import { closeModal, modalReducer, setModal } from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    modal: modalReducer,
  },
});

setupListeners(store.dispatch);

export { closeModal, setActiveBoard, setModal, store };
