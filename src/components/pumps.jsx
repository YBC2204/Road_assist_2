import React from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../helper/SupaClient';

const PetrolPumpCard = ({key, name, address, company, phone ,distance ,orderno ,uid,pid}) => {
  const nav=useNavigate();
  const Subm = async () => {
    // Show confirmation dialog before deleting the entry
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
   
    if (confirmDelete) {
     
     console.log("deleting ")

     handleConfirm()
     nav('/order')
     
    }
  };
  const  handleConfirm = async() =>{
    const {data , error } = await supabase
    .from('Order_assign')
    .insert([
      {
        order_id:orderno,
        user_id:uid,
        pump_id:pid
      }
    ])
    .select();

    if (error) {
      console.error('Error inserting data into trialvehicle:', error.message);
      return;
  }
  if(data)
    {
      console.log('success');
    }
  } 
  return (
    <div className="w-[85%] bg-slate-300 rounded-[20px] flex flex-col items-center my-4 shadow-md aspect-w-3 aspect-h-4  relative py-3 px-[10px]">
    <div className='font-bold uppercase text-[17px]  text-center'>{name}</div>
    <div className='font-semibold text-[17px] underline'>{company}</div>
    <div className='mt-2 font-semibold'>{phone}</div>
    <div className='font-semibold text-center'>{address}</div>
    <div className='font-semibold'>Approx.Dist -->{distance}</div>
    <button className='border-[5px] px-2 py-1 font-[500] uppercase mt-3 border-gray-800 rounded-xl bg-gray-700 text-slate-200' onClick={Subm}>Select</button>
    </div>
  );
};

export default PetrolPumpCard;
