import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import supabase from '../../helper/SupaClient';
import { useModalContext } from '../../Context/Modalcon';
import { v4 as uuidv4 } from 'uuid';

const FuelType = () => {
    const { showmod, selcar, selcol, plate, setplate, setcol, showamt, showfuel, setamt, settype } = useModalContext();

    const [showPlateModal, setShowPlateModal] = plate;
    const [showAmtModal, setAmtModal] = showamt;
    const [showFuelType, setFuelTypeModal] = showfuel;
    const [selectedamt, setselectedamt] = setamt;
    const [selectedtype, setselectedtype] = settype;
    const [selectedColor, setselectedcolor] = setcol;
    const [selectedCar, setSelectedCar] = selcar;
    const [plateNumber, setPlateNumber] = setplate;

    const handleConfirmType = async (fuelType) => {
        // Generate a UUID for User_id
        const userId = uuidv4();

        // Insert data into the 'trialvehicle' table
        const { data, error } = await supabase
            .from('trialvehicle')
            .insert([{ Vehicle_name:selectedCar, Plate_num: plateNumber, car_color: selectedColor, Fuel_type:selectedtype }]);

        if (error) {
            console.error('Error inserting data:', error);
            // Handle error (e.g., display error message)
            return;
        }

        // Close the fuel type modal
        setFuelTypeModal(false);

        // Log the selected values
        console.log(selectedCar);
        console.log(selectedColor);
        console.log(plateNumber);
        console.log(selectedamt);
        console.log(fuelType);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-3/4 pb-16 bg-white rounded-[20px] flex flex-col items-center">
                <div className='flex mt-5 mb-2 px-2 w-full'>
                    <button className="text-gray-600" onClick={() => { setFuelTypeModal(false); setAmtModal(true); }}>
                        <ArrowBack />
                    </button>
                    <div className="h-8 text-black text-md font-bold uppercase pt-1 w-full text-center pr-4">Select Fuel Type :</div>
                </div>
                <div className='mt-10 px-3 flex flex-col gap-4 text-lg'>
                    <button onClick={() => handleConfirmType("Petrol")} className='bg-neutral-300 px-10 py-3 rounded-xl font-semibold '>Petrol</button>
                    <button onClick={() => handleConfirmType("Diesel")} className='bg-neutral-300 px-10 py-3 rounded-xl font-semibold '>Diesel</button>
                </div>
            </div>
        </div>
    );
}

export default FuelType;
