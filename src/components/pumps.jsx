import React from 'react';

const PetrolPumpCard = ({ name, address, company, phone }) => {
  return (
    <div className="w-[90%] h-[130px] bg-gray-400 rounded-t-[20px] rounded-b-[20px] flex flex-col items-center mb-4 shadow-md aspect-w-3 aspect-h-4 mt-4 relative">
      <h2 className="text-black text-xl font-semibold mt-1">{name}</h2> 
      <p className="text-black-300 mt-2">Address: {address}</p>
      <p className="text-black-300">Company: {company}</p>
      <p className="text-black-300">Phone: {phone}</p>
    </div>
  );
};

export default PetrolPumpCard;
