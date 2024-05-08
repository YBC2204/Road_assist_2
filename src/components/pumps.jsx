import React from 'react';

const PetrolPumpCard = ({key, name, address, company, phone ,distance}) => {
  return (
    <div className="w-[85%] bg-slate-300 rounded-[20px] flex flex-col items-center my-4 shadow-md aspect-w-3 aspect-h-4  relative py-3 px-[10px]">
    <div className='font-bold uppercase text-[17px]  text-center'>{name}</div>
    <div className='font-semibold text-[17px] underline'>{company}</div>
    <div className='mt-2 font-semibold'>{phone}</div>
    <div className='font-semibold text-center'>{address}</div>
    <div className='font-semibold'>Approx.Dist -->{distance}</div>
    <button className='border-[5px] px-2 py-1 font-[500] uppercase mt-3 border-gray-800 rounded-xl bg-gray-700 text-slate-200'>Select</button>
    </div>
  );
};

export default PetrolPumpCard;
