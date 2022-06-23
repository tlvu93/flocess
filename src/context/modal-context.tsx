import React, { createContext, useContext, useState } from 'react';

interface ModalContext {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const ModalContext = createContext<ModalContext>({} as ModalContext);
export const useModalContext = () => useContext(ModalContext);

const ModalState = ({ children }: React.PropsWithChildren) => {
  const [showModal, setShowModal] = useState<boolean>(true);

  const openModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <ModalContext.Provider
      value={{ showModal, openModal, closeModal, toggleModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export default ModalState;
