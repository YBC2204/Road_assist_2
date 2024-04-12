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
  // const [showConfirm, setConfirmModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [showColorModal, setShowColorModal] = useState(false);
  const [showPlateModal, setShowPlateModal] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [selectedColor,setselectedcolor]=useState('');
  const [showAmtModal, setAmtModal] = useState(false);
  const [showFuelType, setFuelTypeModal] = useState(false);
  const [selectedamt,setselectedamt]=useState('');
  const [selectedtype,setselectedtype]=useState('');
  const[selectedmode,setselectedmode]=useState('');
  const[mailid,setmailid]=useState('');
  const [detail,setDetails] = useState(false);

  const[loc,setloca]=useState('');

  return (
    <ModalContext.Provider value={
      {
        showmod:[showModal, setShowModal],
        selcar:[selectedCar,setSelectedCar],
        selcol:[showColorModal,setShowColorModal],
        plate:[showPlateModal, setShowPlateModal],
        setplate:[plateNumber, setPlateNumber],
        setdet:[detail,setDetails],
        setcol:[selectedColor,setselectedcolor],
        showamt:[showAmtModal, setAmtModal],
        showfuel:[showFuelType, setFuelTypeModal],
        setamt:[selectedamt,setselectedamt],
        settype:[selectedtype,setselectedtype],
        setmode:[selectedmode,setselectedmode],
        setmail:[mailid,setmailid],
        setloc:[loc,setloca]

      }
    }>
      {children}
    </ModalContext.Provider>
  );
};


  