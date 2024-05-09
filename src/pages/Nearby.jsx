import React, { useEffect, useState } from 'react';
import PetrolPumpCard from '../components/pumps'; 
import supabase from '../helper/SupaClient';
import { useStatusContext } from '../Context/StatusContext';

const Nearby = () => {
  const [fetcherr, setFetchErr] = useState(null);
  const [petrolPumps, setPetrolPumps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPumps, setFilteredPumps] = useState([]);

  useEffect(() => {
    console.log(lid);
    const fetchPetrolPumps = async () => {
      try {
        const { data: pumpData, error: pumpError } = await supabase
          .from('Pump_det')
          .select('*');

        const { data: orderData, error: orderError } = await supabase
          .from('order')
          .select('*');

        if (pumpError || orderError) {
          throw pumpError || orderError;
        }

        // Calculate distance for each petrol pump
        const pumpsWithDistance = pumpData.map(pump => {
          // Find the user's coordinates from the order data
          const userLat = orderData.find(order => order.user_id === 474)?.Latitude;
          const userLong = orderData.find(order => order.user_id === 474)?.Longitude;
          
          // Function to calculate distance using Haversine formula
          const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2 - lat1);  // deg2rad below
            const dLon = deg2rad(lon2 - lon1);
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = (R * c)+ 0.75; // Distance in km
            return distance;
          }
        
          const deg2rad = (deg) => {
            return deg * (Math.PI / 180);
          }

          // Calculate distance using Haversine formula
          const distance = calculateDistance(
            pump.latitude,
            pump.long,
            userLat,
            userLong
          );

          return { ...pump, distance };
        });

        setPetrolPumps(pumpsWithDistance);
        console.log('Petrol Pumps with Distance:', pumpsWithDistance);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchPetrolPumps();
  }, []);

  const handleSearch = () => {
    console.log('Search Term:', searchTerm);
    const filtered = petrolPumps.filter(pump =>
      pump.pump_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Filtered Pumps:', filtered);
    setFilteredPumps(filtered);
  };
  

  return (
    <div className="relative bg-gradient-to-br from-gray-800">
    <div className='text-white text-center my-6 text-2xl font-bold'>NEARBY PUMPS</div>
      <div className="flex flex-col h-[85vh] gap-2 items-center overflow-y-scroll">
      <input
  type="text"
  placeholder="Search for a pump..."
  value={searchTerm}
  onChange={e => {
    setSearchTerm(e.target.value);
    console.log('Search Term:', e.target.value);
  }}
  className="p-2 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:border-gray-300 px-6 mt-3"
   />

        <button
          onClick={() => {
            handleSearch();
            console.log('Search Button Clicked');
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-300"
        >
          Search
        </button>
        {searchTerm ? (
          filteredPumps.length > 0 ? (
            filteredPumps.map(pump => (
              <PetrolPumpCard
                key={pump.id}
                name={pump.pump_name}
                availability={true}
                address={pump.Address}
                company={pump.Company}
                phno={pump.phno}
                distance={pump.distance}
              />
            ))
          ) : (
            <p className="text-slate-300 mt-10 text-2xl">No matching pumps found</p>
          )
        ) : (
          petrolPumps.map(pump => (
            <PetrolPumpCard
              key={pump.id}
              name={pump.pump_name}
              availability={true}
              address={pump.Address}
              company={pump.Company}
              phno={pump.phno}
              distance={pump.distance}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Nearby;

