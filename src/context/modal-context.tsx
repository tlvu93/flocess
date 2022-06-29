import React, { createContext, useContext, useState } from "react";

export enum ModalType {
  AddTask = "AddTask",
  EditTask = "EditTask",
}

interface ModalContext {
  showAddModal: boolean;
  showEditModal: boolean;
  openModal: (type: ModalType) => void;
  closeModal: (type: ModalType) => void;
  toggleModal: (type: ModalType) => void;
}

const ModalContext = createContext<ModalContext>({} as ModalContext);
export const useModalContext = () => useContext(ModalContext);

const ModalState = ({ children }: React.PropsWithChildren) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(true);

  const openModal = (type: ModalType) => {
    switch (type) {
      case ModalType.AddTask:
        setShowAddModal(true);
        break;

      case ModalType.EditTask:
        setShowEditModal(true);
    }
  };

  const closeModal = (type: ModalType) => {
    switch (type) {
      case ModalType.AddTask:
        setShowAddModal(false);
        break;

      case ModalType.EditTask:
        setShowEditModal(false);
    }
  };

  const toggleModal = (type: ModalType) => {
    switch (type) {
      case ModalType.AddTask:
        setShowAddModal(!showAddModal);
        break;

      case ModalType.EditTask:
        setShowEditModal(!showEditModal);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        showAddModal,
        showEditModal,
        openModal,
        closeModal,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export default ModalState;
