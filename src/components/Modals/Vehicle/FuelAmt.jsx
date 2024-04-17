import { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../Context/Modalcon';

const FuelAmount = () => {
    

    
    
    
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-3/4 h-[290px] bg-white rounded-[20px] flex flex-col items-center">
                <div className='flex mt-5 mb-2 px-2 w-full'>
                    <button className="text-gray-600" onClick={() => { setAmtModal(false); setShowPlateModal(true); }}>
                        <ArrowBack />
                    </button>
                    <div className="h-8 text-black text-md font-bold uppercase pt-1 w-full text-center pr-4">Enter Fuel Amount(in ₹):</div>
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
