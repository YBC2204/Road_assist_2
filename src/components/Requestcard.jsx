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

const Requestcard = () => {
    const [confirmationOpen, setConfirmationOpen] = useState(false); // State to manage confirmation dialog
    const { openEditModal } = useModalContext(); // Assuming you have a function to open the edit modal
    const { deleteRequest } = useStatusContext(); // Assuming you have a function to delete the request
    const navigate = useNavigate(); // React Router's hook for navigation
  
    // Function to handle denial confirmation
    const handleDenyConfirmation = () => {
      setConfirmationOpen(true);
    };
  
    // Function to handle denial of request
    const handleDenyRequest = () => {
      // Perform deletion of request (you should have the implementation for this)
      // For now, I'm assuming a function deleteRequest is available in useStatusContext
      deleteRequest(); // You should implement this function
  
      // Close confirmation dialog
      setConfirmationOpen(false);
    };
  
    // Function to handle cancellation of denial
    const handleCancelDeny = () => {
      setConfirmationOpen(false);
    };

  
 
 

 

 






  


  // Clear error message

 


  return (
     <div className='text-black w-[90%] bg-slate-300 flex flex-col py-4 px-5 gap-3 rounded-[22px] my-3' >
   
      
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
      <div className='h-[1px] bg-black'></div>
      <div className='flex w-full font-semibold'>
      <button className='uppercase w-1/2 bg-gray-700 text-blue-400 rounded-s-lg p-[6px] border-r border-black' onClick={openEditModal}>Accept</button>
        <button className='uppercase w-1/2 bg-gray-700 text-red-600 rounded-e-lg p-[6px]' onClick={handleDenyConfirmation}>Deny</button>
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
          {confirmationOpen && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
          <div className='bg-white p-4 rounded-lg'>
            <p className='text-lg font-semibold'>Are you sure you want to deny the request?</p>
            <div className='flex justify-end mt-4'>
              <button className='bg-red-600 text-white px-4 py-2 rounded mr-2' onClick={handleDenyRequest}>Yes</button>
              <button className='bg-gray-400 text-black px-4 py-2 rounded' onClick={handleCancelDeny}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requestcard;


// <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <LocalGasStationIcon />
//     <p className='px-8'>Fuel Delivery</p>
//         </button>
//         <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <BuildIcon />
//     <p className='px-5'>Workshop Service</p>
//         </button>
