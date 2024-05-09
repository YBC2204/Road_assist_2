import React, { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../Context/Modalcon';

const FuelAmount = () => {
    const { showmod, selcar, selcol, plate, setplate, setcol, showamt, showfuel, setamt } = useModalContext();

    const [showPlateModal, setShowPlateModal] = plate;
    const [showAmtModal, setAmtModal] = showamt;
    const[showFuelType, setFuelTypeModal]=showfuel;
    const [selectedamt, setselectedamt] = setamt;
    
    const [error, setError] = useState(""); // Define error state
    const nav = useNavigate();

    const handleConfirmAmt = () => {
        if (selectedamt.trim() === "") {
            setError("Please enter a fuel amount.");
            return;
        }

        setAmtModal(false);
        setFuelTypeModal(true);
        setError(""); // Clear error message
      
       
    };

    return (
        <div className="fixed inset-x-0 bottom-0 bg-black bg-opacity-50 h-[100vh] flex justify-center items-end ">
          <div className="w-[90%] h-[300px] bg-white rounded-t-[20px] rounded-b-none flex flex-col items-center">
                <div className='flex mt-5 mb-2 px-2 w-full'>
                    <button className="text-gray-600" onClick={() => { setAmtModal(false); setShowPlateModal(true); }}>
                        <ArrowBack />
                    </button>
                    <div className="h-8 text-black text-md font-bold  pt-1 w-full text-center pr-4">Enter Fuel Amount(Minimum Amount:₹300)(in ₹):</div>
                </div>
                <div className='mt-10 px-3'>
                    <input
                        className="bg-white rounded-lg border border-black border-opacity-50 p-4"
                        type="text" required
                        value={selectedamt}
                        onChange={(e) => setselectedamt(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className='relative mt-8 flex justify-center'>
                    <button className='bg-black text-white rounded-lg p-3 w-28 mr-3' onClick={handleConfirmAmt}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default FuelAmount;
