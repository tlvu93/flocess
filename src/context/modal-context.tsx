import React, { createContext, useContext, useState } from "react";

export enum ModalType {
  AddTask = "AddTask",
  EditTask = "EditTask",
  EditTaskNode = "EditTaskNode",
}

interface ModalContext {
  modals: {
    showAddTaskModal: boolean;
    showEditTaskModal: boolean;
    showEditTaskNodeModal: boolean;
  };

  openModal: (type: ModalType) => void;
  closeModal: (type: ModalType) => void;
  toggleModal: (type: ModalType) => void;
}

const ModalContext = createContext<ModalContext>({} as ModalContext);
export const useModal = () => useContext(ModalContext);

const ModalState = ({ children }: React.PropsWithChildren) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const [showEditTaskNodeModal, setShowEditTaskNodeModal] =
    useState<boolean>(false);

  const openModal = (type: ModalType) => {
    switch (type) {
      case ModalType.AddTask:
        setShowAddTaskModal(true);
        break;

      case ModalType.EditTask:
        setShowEditTaskModal(true);
        break;

      case ModalType.EditTaskNode:
        setShowEditTaskNodeModal(true);
        break;
    }
  };

  const closeModal = (type: ModalType) => {
    switch (type) {
      case ModalType.AddTask:
        setShowAddTaskModal(false);
        break;

      case ModalType.EditTask:
        setShowEditTaskModal(false);
        break;

      case ModalType.EditTaskNode:
        setShowEditTaskNodeModal(false);
        break;
    }
  };

  const toggleModal = (type: ModalType) => {
    switch (type) {
      case ModalType.AddTask:
        setShowAddTaskModal(!showAddTaskModal);
        break;

      case ModalType.EditTask:
        setShowEditTaskModal(!showEditTaskModal);
        break;

      case ModalType.EditTaskNode:
        setShowEditTaskNodeModal(!showEditTaskModal);
        break;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        modals: {
          showAddTaskModal,
          showEditTaskModal,
          showEditTaskNodeModal,
        },

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
