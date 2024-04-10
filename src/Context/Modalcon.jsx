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

  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [showColorModal, setShowColorModal] = useState(false);
  const [showPlateModal, setShowPlateModal] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [detail,setDetails] = useState(false);
  return (
    <ModalContext.Provider value={
      {
        showmod:[showModal, setShowModal],
        selcar:[selectedCar,setSelectedCar],
        selcol:[showColorModal,setShowColorModal],
        plate:[showPlateModal, setShowPlateModal],
        setplate:[plateNumber, setPlateNumber],
        setdet:[detail,setDetails]
      }
    }>
      {children}
    </ModalContext.Provider>
  );
};


  