import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Task } from "@/api/tasks";

export type DeleteTargetInfo = { id: number; title: string };

type ModalState =
  | { modalType: null }
  | { modalType: "taskDetail"; task: Task }
  | { modalType: "taskForm"; isAddNew: true }
  | { modalType: "taskForm"; isAddNew: false; task: Task }
  | { modalType: "boardForm"; isAddNew: boolean }
  | {
      modalType: "delete";
      deleteType: "board" | "task";
      target: DeleteTargetInfo;
      onDeleteSuccess?: () => void;
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
