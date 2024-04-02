
import { useContext, useState } from 'react';
import { useModalContext } from '../../Context/Modalcon.jsx'
import { ArrowBack } from '@mui/icons-material';

const CarType = () => {
  
  const { showmod ,selcar ,selcol} = useModalContext();
  
  const [selectedCar,setSelectedCar] = selcar; 
  const [showModal, setShowModal] = showmod;
  const [showColorModal, setShowColorModal] = selcol;
 
  const handleConfirmCar = () => {
   setShowModal(false);
  setShowColorModal(true);
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center">
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="w-[360px] h-[266px] relative bg-white rounded-[22px]">
                        <button className="absolute top-[25px] left-[20px] text-gray-600" onClick={() => setShowModal(false)}>
                            <ArrowBack />
                        </button>
                        <div className="w-[291px] h-8 left-[73px] top-[23px] absolute text-black text-lg font-normal font-['IBM Plex Sans Thai Looped']">Select Car Type:</div>
                        <input
                            className="w-[229px] h-[57px] left-[58px] top-[101px] absolute bg-white rounded-lg border border-black border-opacity-30 px-3"
                            type="text"
                            value={selectedCar}
                            onChange={(e)=>{setSelectedCar(e.target.value)}}
                        />
                        <button className='absolute bottom-10 left-32 bg-black text-white rounded-lg p-3 w-28' onClick={handleConfirmCar}>Confirm</button>
                    </div>
                </div>
    </div>
  );
};

export default CarType;