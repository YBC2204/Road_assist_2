import React, { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../Context/Modalcon';

const FuelAmount = () => {
    const { showmod, selcar, selcol, plate, setplate, setcol, showamt, showfuel, setamt } = useModalContext();

    const [showPlateModal, setShowPlateModal] = plate;
    const [showAmtModal, setAmtModal] = showamt;
    const [selectedamt, setselectedamt] = setamt;
    const [error, setError] = useState(""); // Define error state
    const nav = useNavigate();

    const handleConfirmAmt = () => {
        if (selectedamt.trim() === "") {
            setError("Please enter a fuel amount.");
            return;
        }

        setAmtModal(false);
        setError(""); // Clear error message
        console.log(selectedamt);
        nav('/nearbypump');
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="w-[360px] h-[266px] relative bg-white rounded-[22px]">
                        <button className="absolute top-[25px] left-[20px] text-gray-600" onClick={() => { setShowPlateModal(true), setAmtModal(false) }}>
                            <ArrowBack />
                        </button>
                        <div className="w-[291px] h-8 left-[73px] top-[23px] absolute text-black text-lg font-normal font-['IBM Plex Sans Thai Looped']">Select Fuel Amount in Rupees:</div>
                        <input
                            className="w-[229px] h-[57px] left-[58px] top-[101px] absolute bg-white rounded-lg border border-black border-opacity-30 px-3"
                            type="text"
                            value={selectedamt}
                            onChange={(e) => { setselectedamt(e.target.value); setError(""); }}
                        />
                        {error && <p className="text-red-500 absolute left-[58px] top-[165px]">{error}</p>}
                        <button className='absolute bottom-5 left-24 bg-black text-white rounded-lg p-3 w-28' onClick={handleConfirmAmt}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FuelAmount;
