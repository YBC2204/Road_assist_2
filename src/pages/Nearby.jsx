import React, { useEffect, useState } from 'react';
import PetrolPumpCard from '../components/pumps'; 
import supabase from '../helper/SupaClient';
import { useStatusContext } from '../Context/StatusContext';

const Nearby = () => {
  const [fetcherr, setFetchErr] = useState(null);
  const [petrolPumps, setPetrolPumps] = useState([]);
  const {logid} =  useStatusContext();
  const [lid,setlid] =  logid;
  const[maxValue,setmaxValue] = useState(0);

  useEffect(() => {
    console.log(lid);
    const fetchPetrolPumps = async () => {
      try {
        const { data: pumpData, error: pumpError } = await supabase
          .from('Pump_det')
          .select('*');

        const { data: orderData, error: orderError } = await supabase
          .from('order')
          .select('*').eq('user_id',lid);

        if (pumpError || orderError) {
          throw pumpError || orderError;
        }

       
        const maxValue = orderData.reduce((max, current) => {
          return current.order_no > max ? current.order_no : max;
        }, -Infinity);
        setmaxValue(maxValue);
        // Calculate distance for each petrol pump
        const pumpsWithDistance = pumpData.map(pump => {
          // Find the user's coordinates from the order data
          const userLat = orderData.find(order => order.order_no === maxValue)?.Latitude;
          const userLong = orderData.find(order => order.order_no === maxValue)?.Longitude;
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
        console.log(pumpsWithDistance);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchPetrolPumps();
  }, []);


  return (
    <div className="relative bg-gradient-to-br from-gray-800">
    <div className='text-white text-center my-6 text-2xl font-bold'>NEARBY PUMPS</div>
      <button className="flex flex-col h-[85vh] gap-2 items-center overflow-y-scroll">
        {petrolPumps && petrolPumps.length > 0 ? (
          <div className="w-full flex flex-col items-center pb-5">
            {petrolPumps.map((pump,i) => (
              <PetrolPumpCard
                key={i}
                pid={pump.id}
                name={pump.pump_name}
                availability={true}
                address={pump.Address}
                company={pump.Company}
                distance={pump.distance.toFixed(2)}
                phone={pump.phno}
                orderno={maxValue}
                uid= {lid}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-300 mt-10 text-2xl">No Petrol pumps present</p>
        )}
      </button>
    </div>
  );
};

export default Nearby;
