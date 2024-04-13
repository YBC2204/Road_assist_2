/* eslint-disable react/prop-types */
import car from '../assets/car_def.png';
import { useState } from 'react';
import supabase from '../helper/SupaClient';
import EditModal from './Modals/EditModal';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';


const Vehiclecard = ({ id, name, plate, color, type }) => {
  const [deleteError, setDeleteError] = useState(null);
  console.log(id);
  const [editModalOpen, setEditModalOpen] = useState(false);
  


  const deleteEntry = async () => {
    try {
      const { error } = await supabase.from('Vehicle_det').delete().eq('user_id', id).eq('plate_num', plate); 

      if (error) {
        console.error('Delete error:', error.message);
        setDeleteError('Error deleting entry');
      } else {
        
        console.log('Entry deleted successfully');
      }
    } catch (error) {
      console.error('Delete error:', error.message);
      setDeleteError('Error deleting entry');
    }
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
     <div className='text-black w-[90%] bg-slate-300 flex flex-col py-4 px-5 gap-3 rounded-[22px] my-3' >
   
      
     <div className='flex flex-row gap-2'>
        <div className='flex flex-col w-1/2 '>
          <p className='font-bold uppercase '>{name}</p>
          <p className='font-semibold '>{plate}</p>
          <div className='flex justify-between pr-2 pt-1'>
            <p>{color}</p>
            <p>{type}</p>
          </div>
        </div>
        <div className='w-1/2'>
          <img src={car} className='w-full h-full object-cover rounded-lg' alt='Car' />
        </div>
      </div>
      <div className='h-[1px] bg-black'></div>
      <div className='flex w-full font-semibold'>
        <button className='uppercase w-1/2 bg-gray-700 text-blue-400 rounded-s-lg p-[6px] border-r border-black' onClick={openEditModal}>edit entry</button>
        <button className='uppercase w-1/2 bg-gray-700 text-red-600 rounded-e-lg p-[6px]' onClick={deleteEntry}>delete entry</button>
      </div>

    {deleteError && (
        <div className='text-red-500 mt-2 text-sm'>{deleteError}</div>
      )}

      {editModalOpen && (
        <EditModal
          vehicleData={{ name, plate, color, type }} // Pass the current vehicle's data
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default Vehiclecard;


// <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <LocalGasStationIcon />
//     <p className='px-8'>Fuel Delivery</p>
//         </button>
//         <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <BuildIcon />
//     <p className='px-5'>Workshop Service</p>
//         </button>