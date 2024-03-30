import  { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [showColorModal, setShowColorModal] = useState(false);
  const [showPlateModal, setShowPlateModal] = useState(false);
  const [moreColorModal, setMoreColorModal] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [otherColor, setOtherColor] = useState('');

  const contextValue = {
    showColorModal,
    setShowColorModal,
    showPlateModal,
    setShowPlateModal,
    moreColorModal,
    setMoreColorModal,
    plateNumber,
    setPlateNumber,
    otherColor,
    setOtherColor,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};