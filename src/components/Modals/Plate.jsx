import React, { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useModalContext } from '../../Context/Modalcon';

const Plate = () => {
    const { showmod, selcar, selcol, plate, setplate, setcol, showamt } = useModalContext();

    const [showColorModal, setShowColorModal] = selcol;
    const [showPlateModal, setShowPlateModal] = plate;
    const [plateNumber, setPlateNumber] = setplate;
    const [showAmtModal, setAmtModal] = showamt;

    const handleConfirmPlate = () => {
        // Regular expression for validating Indian car plate numbers
        const plateRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;

        if (!plateRegex.test(plateNumber.trim())) {
            alert("Invalid plate number. Please enter a valid plate number.");
            return;
        }

        setShowPlateModal(false); // Hide the plate modal
        setAmtModal(true); // Show the fuel amount modal
        // You can navigate to the fuel amount page directly here if needed
        // Navigate to the fuel amount page
    };

    return (
        <div className="fixed inset-x-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-end h-[100vh]">
          <div className="w-[90%] h-[300px] bg-white rounded-t-[20px] rounded-b-none flex flex-col items-center">
                <div className='flex mt-5 mb-2 px-2 w-full'>
                    <button className="text-gray-600" onClick={() => { setShowPlateModal(false); setShowColorModal(true); }}>
                        <ArrowBack />
                    </button>
                    <div className="h-8 text-black text-lg font-bold  pt-1 w-full text-center pr-4">Plate Number(In capital letter and without space):</div>
                </div>
                <div className='mt-10 px-3'>
                    <input
                        className="bg-white rounded-lg border border-black border-opacity-50 p-4"
                        type="text"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                    />
                </div>
                <div className='mt-8 flex justify-center'>
                    <button className='bg-black text-white rounded-lg p-3 w-28' onClick={handleConfirmPlate}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default Plate;
