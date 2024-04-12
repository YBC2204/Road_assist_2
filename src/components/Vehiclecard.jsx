/* eslint-disable react/prop-types */
import car from '../assets/car_def.png';
import { useState } from 'react';
import supabase from '../helper/SupaClient';

const Vehiclecard = ({ id, name, plate, color, type }) => {
  const [deleteError, setDeleteError] = useState(null);
  console.log(id);

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

  return (
    <div className='text-black w-[90%] bg-slate-300 flex flex-col py-4 px-5 gap-3 rounded-[22px] my-3'>
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
        <button className='uppercase w-1/2 bg-neutral-100 rounded-s-lg p-[6px] border-r border-black'>edit details</button>
        <button className='uppercase w-1/2 bg-neutral-100 rounded-e-lg p-[6px]' onClick={deleteEntry}>delete entry</button>
      </div>

      {deleteError && (
        <div className='text-red-500 mt-2 text-sm'>{deleteError}</div>
      )}
    </div>
  );
};

export default Vehiclecard;
