import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { boardsReducer, setActiveBoard } from "./slices/boardsSlice";
import { columnsReducer } from "./slices/columnsSlice";
import { tasksReducer } from "./slices/tasksSlice";
import { subtasksReducer } from "./slices/subtasksSlice";
import { modalReducer, setModal, closeModal } from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
    subtasks: subtasksReducer,
    modal: modalReducer,
  },
});

setupListeners(store.dispatch);

export * from "./thunks/fetchBoards";
export * from "./thunks/fetchColumns";
export * from "./thunks/fetchTasks";
export * from "./thunks/fetchSubtasks";
export { store, setActiveBoard, setModal, closeModal };
