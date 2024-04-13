/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DetailModal from '../components/Modals/DetailModal';
import { useModalContext } from '../Context/Modalcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Vehiclecard from '../components/Vehiclecard';
import supabase from '../helper/SupaClient';
import { useStatusContext } from '../Context/StatusContext';

const Vehicle = () => {

   
    const { showmod, selcar, selcol, plate, setplate, setdet , setcol, showamt, showfuel, setamt, settype,setmode,setmail,setloc } = useModalContext();
    const {stat,logid} = useStatusContext();
    const [lid,setlid] = logid;
    const[detail,setDetails]=setdet
    const [mailid,setMailId] = setmail
    const[vehicles,setVehicles] = useState(null);
    const[fetcherr,setfetcherr] = useState(null);
    
  useEffect(()=> {
    const fetchIdFromLoginTrial = async () => {
      try {
          // Fetch the ID from the logintrial table based on the mailid
          const { data, error } = await supabase
              .from('logintrial')
              .select('id')
              .eq('email_id', mailid)
              .single();
              
          if (error) {
              console.error('Error fetching data from logintrial:', error.message);
              return null;
          }

          if (!data) {
              console.error('No data found in logintrial for the provided mailid.');
              return null;
          }

          return data.id;
      } catch (error) {
          console.error('Error fetching data from logintrial:', error.message);
          return null;
      }
      
  };
  
    const fetchVehicles = async () =>
    {
      const loginId = await fetchIdFromLoginTrial();
      setlid(loginId);
      const { data, error } = await supabase
      .from('Vehicle_det')
      .select()
      .eq('user_id', loginId);

      if(error)
      {
        setfetcherr('Could not fetch details')
        console.log(fetcherr);
        setVehicles(null);
      }
      if(data)
      {
        setVehicles(data);
        setfetcherr(null)
      }
    }
  fetchVehicles()
  },[])
  


  return (



    <div className='bg-gradient-to-br from-gray-800'>


    <div className='flex flex-col h-[85vh] gap-2 items-center overflow-y-scroll'>
        <button className='bg-slate-300  mt-4 flex gap-2 items-center text-black font-semibold text-xl border-2 border-[#E3FEF7] rounded-xl px-3 py-2  active:bg-gray-500 active:text-white ' onClick={()=>setDetails(true)}>ADD A VEHICLE <AddCircleIcon/></button>
       {detail && <DetailModal/>}
       
       {
        fetcherr && (<p>{fetcherr}</p>)
       }
       {
        vehicles && (
          <div className='w-full flex flex-col items-center'>
          {vehicles.map(vehicle =>(
            <Vehiclecard key={vehicle.user_id} id={vehicle.user_id} name={vehicle.vehicle_name}
              plate={vehicle.plate_num} color={vehicle.color} type={vehicle.fuel_type}
            />
          ))
          }
          </div>
       )}
    </div>
    
    </div>
  )
}

export default Vehicle