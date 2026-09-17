import { create } from "zustand";
import { devtools } from "zustand/middleware";

const defaultModalInfo = {
  isOpen: false,
  isAddNew: false,
  modalType: "",
  deleteType: "",
  detailObj: {},
  errorTitle: "",
  errorMsg: "",
};

export const useModalStore = create(
  devtools(
    (set) => ({
      ...defaultModalInfo,
      setModal: (modalInfo = {}) => {
        set(
          () => ({
            ...defaultModalInfo,
            ...modalInfo,
          }),
          false,
          "setModal",
        );
      },
      closeModal: () => {
        set(() => defaultModalInfo, false, "closeModal");
      },
    }),
    { name: "ModalStore" },
  ),
);
