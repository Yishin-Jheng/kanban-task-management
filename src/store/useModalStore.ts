import { create } from "zustand";
import { devtools } from "zustand/middleware";

// TODO: 之後task的型別應該搬去api/tasks
interface Task {
  id: number;
  columnId: number;
  title: string;
  description: string;
  totalSubNum: number;
  finishedSubNum: number;
}

type ModalState =
  | { modalType: null }
  | { modalType: "taskDetail"; task: Task }
  | { modalType: "taskForm"; isAddNew: true }
  | { modalType: "taskForm"; isAddNew: false; task: Task }
  | { modalType: "boardForm"; isAddNew: boolean }
  | {
      modalType: "delete";
      deleteType: "task" | "board";
      target: { id: number; title: string };
    }
  | { modalType: "success" }
  | { modalType: "error"; errorTitle?: string; errorMsg: string };

interface ModalStore {
  modalState: ModalState;
  setModal: (modalInfo: ModalState) => void;
  closeModal: () => void;
}

const defaultModalState = { modalState: { modalType: null } };

export const useModalStore = create<ModalStore>()(
  devtools(
    (set) => ({
      ...defaultModalState,
      setModal: (modalInfo) => {
        set(() => ({ modalState: modalInfo }), false, "setModal");
      },
      closeModal: () => {
        set(() => defaultModalState, false, "closeModal");
      },
    }),
    { name: "ModalStore" },
  ),
);
