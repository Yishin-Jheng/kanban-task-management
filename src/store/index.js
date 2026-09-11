import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { boardsReducer, setActiveBoard } from "./slices/boardsSlice";
import { columnsReducer } from "./slices/columnsSlice";
import { closeModal, modalReducer, setModal } from "./slices/modalSlice";
import { usersReducer } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    modal: modalReducer,
  },
});

setupListeners(store.dispatch);

export * from "./thunks/createBoards";
export * from "./thunks/updateBoards";
export * from "./thunks/userLogin";
export { closeModal, setActiveBoard, setModal, store };
