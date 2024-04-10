import React, { useState } from 'react';
import { useModalContext } from '../../Context/Modalcon.jsx';
import { ArrowBack } from '@mui/icons-material';

const CarType = () => {
    const { showmod, selcar, selcol } = useModalContext();

    const [selectedCar, setSelectedCar] = selcar;
    const [showModal, setShowModal] = showmod;
    const [showColorModal, setShowColorModal] = selcol;
    const [error, setError] = useState(""); // Define error state

    const handleConfirmCar = () => {
        if (selectedCar.trim() === "") {
            setError("Please select a car type.");
            return;
        }

        setShowModal(false);
        setShowColorModal(true);
        setError(""); // Clear error message
        console.log(selectedCar);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-3/4 h-[290px] bg-white rounded-[20px] flex flex-col items-center">
              <div className='flex mt-5 mb-2 px-2 w-full'>
                  <button className="text-gray-600" onClick={() => { setShowModal(false); }}>
                      <ArrowBack />
                  </button>
                  <div className="h-8 text-black text-md font-bold uppercase pt-1 w-full text-center pr-4">Enter Car Make:</div>
              </div>
              <div className='mt-10 px-3'>
                  <input
                      className="bg-white rounded-lg border border-black border-opacity-50 p-4"
                      type="text" required
                      value={selectedCar}
                      onChange={(e) => setSelectedCar(e.target.value)}
                  />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className='relative mt-8 flex justify-center'>
                  <button className='bg-black text-white rounded-lg p-3 w-28 mr-3' onClick={handleConfirmCar}>Confirm</button>
              </div>
          </div>
      </div>
  );
};

export default CarType;
