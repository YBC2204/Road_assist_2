/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { ArrowBack } from '@mui/icons-material';
import supabase from '../../helper/SupaClient';
import { useModalContext } from '../../Context/Modalcon';
import { useStatusContext } from '../../Context/StatusContext';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const FuelType = () => {
    const nav = useNavigate();
    const { showmod, selcar, selcol, plate, setplate, setdet , setcol, showamt, showfuel, setamt, settype,setmode,setmail,setloc } = useModalContext();
    const { logid } = useStatusContext();
    const [lid,setlid] = logid;
    const {long,lat} = useStatusContext();
    const [longitud,setlong]=long;
    const [latitud,setlat]=lat;
    const [showPlateModal, setShowPlateModal] = plate;
    const [showAmtModal, setAmtModal] = showamt;
    const [showFuelType, setFuelTypeModal] = showfuel;
    const [selectedamt, setselectedamt] = setamt;
    const [selectedtype, setselectedtype] = settype;
    const [selectedColor, setselectedcolor] = setcol;
    const [selectedCar, setSelectedCar] = selcar;
    const [plateNumber, setPlateNumber] = setplate;
    const [mailid, setMailId] = setmail;
    const[loc,setloca]=setloc;
    // Function to fetch the ID from logintrial table based on mailid
    const fetchIdFromLoginTrial = async () => {
        try {
            // Fetch the ID from the logintrial table based on the mailid
            const { data, error } = await supabase
                .from('logintrial')
                .select('id')
                .eq('email_id', mailid)
                .single();

            if (error) {
                console.error('Error fetching data from logintrial:', error.message);
                return null;
            }

            if (!data) {
                console.error('No data found in logintrial for the provided mailid.');
                return null;
            }

            return data.id;
        } catch (error) {
            console.error('Error fetching data from logintrial:', error.message);
            return null;
        }
       
    };

    const handleConfirmType = async (fuelType) => {
        setFuelTypeModal(false);
        setselectedtype(fuelType);
        console.log(loc);
        try {
            // Fetch the ID from logintrial table based on mailid
            const loginTrialId = await fetchIdFromLoginTrial();
            setlid(loginTrialId);
            if (!loginTrialId) {
                console.error('Unable to fetch login trial ID.');
                return;
            }

            // Insert data into the 'trialvehicle' table
            const { data, error } = await supabase
                .from('order')
                .insert([
                    {
                        Vehicle_name: selectedCar,
                        Plate_num: plateNumber,
                        car_color: selectedColor,
                        Fuel_type: fuelType,
                        user_id: loginTrialId,
                        Fuel_amt:selectedamt,
                        Location:loc,
                        Latitude:latitud,
                        Longitude:longitud

                    }
                ]);

            if (error) {
                console.error('Error inserting data into trialvehicle:', error.message);
                return;
            }

            // Close the fuel type modal
           

            // Log the selected values
            console.log(selectedCar);
            console.log(selectedColor);
            console.log(plateNumber);
            console.log(selectedamt);
            console.log(fuelType);
        } catch (error) {
            console.error('Error handling fuel type confirmation:', error.message);
        }
        nav('/nearby')
    };

    return (
        <div className="fixed inset-x-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-end ">
          <div className="w-[90%] h-[300px] bg-white rounded-t-[20px] rounded-b-none flex flex-col items-center">
                <div className='flex mt-5 mb-2 px-2 w-full'>
                    <button className="text-gray-600" onClick={() => { setFuelTypeModal(false); setAmtModal(true); }}>
                        <ArrowBack />
                    </button>
                    <div className="h-8 text-black text-md font-bold  pt-1 w-full text-center pr-4">Select Fuel Type :</div>
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
