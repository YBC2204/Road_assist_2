/* eslint-disable react/prop-types */
import car from '../assets/car_def.png';
import { useState } from 'react';
import supabase from '../helper/SupaClient';
import EditModal from './Modals/EditModal';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import { ArrowBack } from '@mui/icons-material';
import { useModalContext } from '../Context/Modalcon';
import { useStatusContext } from '../Context/StatusContext';
import { useNavigate } from 'react-router-dom';

const Recordpump = () => {
    const [confirmationOpen, setConfirmationOpen] = useState(false); // State to manage confirmation dialog
    const { openEditModal } = useModalContext(); // Assuming you have a function to open the edit modal
    const { deleteRequest } = useStatusContext(); // Assuming you have a function to delete the request
    const navigate = useNavigate(); // React Router's hook for navigation
  
    // Function to handle denial confirmation

return (
     <div className='text-black w-[90%] bg-slate-300 flex flex-col py-4 px-5 gap-3 rounded-[22px] mb-8 mt-5' >
   
      
     <div className='flex flex-row gap-2 relative'>
        <div className='flex flex-col '>
        <p className='font-bold uppercase text-xs absolute right-0 text-blue-500'>Order_id:</p>
          <p className='font-bold uppercase '>Name </p>
          <p className='font-medium  '>Phone no:</p>
          <p className='font-semibold '>Plate Number:</p>
          <div className='flex justify-between  pr-2 pt-1'>
            <p>Car Make</p>
            <p className='absolute right-8'>Car color</p>
          </div>
          <div className='flex justify-between   pr-2 pt-1'>
            <p>Fuel Amount</p>
            <p className='absolute right-8'>Fuel Type</p>
            
          </div>
          
          <p className='font-medium  '>Location</p>
        </div>
        {/* <div className='w-1/2 h-3/4'>
          <img src={car} className='w-full h-full object-cover rounded-lg' alt='Car' />
        </div> */}
      </div>
 
     
     
    

    {/* {deleteError && (
        <div className='text-red-500 mt-2 text-sm'>{deleteError}</div>
      )}

      {editModalOpen && (
        <EditModal
          vehicleData={{ name, plate, color, type }} // Pass the current vehicle's data
          onClose={closeEditModal}
        />
      )} */}
       
    </div>
  );
};

export default Recordpump;


// <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <LocalGasStationIcon />
//     <p className='px-8'>Fuel Delivery</p>
//         </button>
//         <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <BuildIcon />
//     <p className='px-5'>Workshop Service</p>
//         </button>
