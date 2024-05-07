import React, { useEffect, useState } from 'react';
import PetrolPumpCard from '../components/pumps'; 
import supabase from '../helper/SupaClient';

const Nearby = () => {
  const [fetcherr, setFetchErr] = useState(null);
  const [petrolPumps, setPetrolPumps] = useState([]);

  useEffect(() => {
    const fetchPetrolPumps = async () => {
      try {
        const dummyPetrolPumps = [
          {
            id: 1,
            name: 'ABC Petrol Pump',
            address: '123 Street, City',
            company: 'ABC Fuel Inc.',
          },
          {
            id: 2,
            name: 'XYZ Petrol Pump',
            address: '456 Road, Town',
            company: 'XYZ Oil Ltd.',
          },
        ];
        setPetrolPumps(dummyPetrolPumps);
      } catch (error) {
        console.error('Error fetching petrol pumps:', error);
        setFetchErr('Failed to fetch petrol pumps');
      }
    };

    fetchPetrolPumps();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-gray-800">
      <div className="flex flex-col h-[85vh] gap-2 items-center overflow-y-scroll">
        {petrolPumps && petrolPumps.length > 0 ? (
          <div className="w-full flex flex-col items-center">
            {petrolPumps.map(pump => (
              <PetrolPumpCard
                key={pump.id}
                name={pump.name}
                availability={pump.availability}
                address={pump.address}
                company={pump.company}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-300 mt-10 text-2xl">No Petrol pumps present</p>
        )}
      </div>
    </div>
  );
};

export default Nearby