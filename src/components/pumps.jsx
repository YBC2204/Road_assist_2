import React from 'react';

const PetrolPumpCard = ({ name, address, company, phno }) => {
  return (
    <div className="w-[90%] h-[200px] bg-gray-400 rounded-t-[20px] rounded-b-[20px] flex flex-col items-center mb-4 shadow-md aspect-w-3 aspect-h-4 mt-4 px-12  relative">
<h2 className="text-gray-800 text-xl font-bold mt-1 text-center">{name.toUpperCase()}</h2>
      <p className="text-gray-800 text-l font-semibold">{company}</p>
      <p className="text-black-300 mt-2 text-center">{address}</p>
      <p className="text-blue-800 text-xl">{phno}</p>
    </div>
  );
};

export default PetrolPumpCard;
