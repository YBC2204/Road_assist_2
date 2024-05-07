
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DescriptionIcon from '@mui/icons-material/Description';
import homepic from '../../assets/home.png';
import fuel from "../../assets/fuel.png"
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../Context/Modalcon';
import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import supabase from '../../helper/SupaClient';
const Petrolhome = () => {
  const {setmail} = useModalContext();
  const [mailid, setMailId] = setmail;
    const nav = useNavigate();
    const [enabled, setEnabled] = useState(false);

  

    const fetchIdFromLoginTrial = async () => {
      try {
          // Fetch the ID from the logintrial table based on the mailid
          const { data, error } = await supabase
              .from('logintrial')
              .select('id')
              .eq('email_id', mailid)
              .single();
    console.log(enabled);
          if (error) {
              console.error('Error fetching data from logintrial:', error.message);
              return null;
          }
  
          if (!data) {
              console.error('No data found in logintrial for the provided mailid.');
              return null;
          }
          console.log(data.id)
  
          const userId = data.id;
  
          // Check if the user's availability already exists in Pump_availability table
          const { data: existingData, error: fetchError } = await supabase
              .from('Pump_avail')
              .select('*')
              .eq('id', userId)
              .single();
  
          if (fetchError) {
              console.error('Error fetching data from Pump_availability:', fetchError.message);
              
          }
    const valueToUpdate = enabled ? false :true;
          // If the user's availability does not exist, insert a new row
          if (!existingData) {
            console.log("hi")
              const { insertError } = await supabase
                  .from('Pump_avail')
                  .insert([{ id: userId, Availability:valueToUpdate}]);
   
              if (insertError) {
                  console.error('Error inserting data into Pump_availability:', insertError.message);
                  return null;
              }
  
              console.log('New row inserted into Pump_availability.');
          } else {
              // If the user's availability exists, update the existing row
              const { updateError } = await supabase
                  .from('Pump_avail')
                  .update({ Availability: valueToUpdate })
                  .eq('id', userId);
  
              if (updateError) {
                  console.error('Error updating data in Pump_availability:', updateError.message);
                  return null;
              }
  
              console.log('Pump availability updated successfully.');
          }
  
          return userId;
      } catch (error) {
          console.error('Error fetching data from logintrial:', error.message);
          return null;
      }
  };
  
 



  return (
    <div className=' w-full  pb-5 bg-gradient-to-br from-gray-800  flex flex-col items-center '>
       
       <div className='flex justify-end w-full items-center mt-4 mr-2'>
       <div className='flex border px-3 py-2 items-center rounded-[25px] gap-2'>
      <p className='font-semibold text-[15px] uppercase text-slate-300'>Availability</p> <Switch
    checked={enabled}
    onChange={async (isChecked) => {
        setEnabled(isChecked);
        await fetchIdFromLoginTrial();
    }}
    className={`${
        enabled ? 'bg-green-600' : 'bg-gray-300 '
    } relative inline-flex h-6 w-11 items-center rounded-full`}
>

      
      <span
        className={`${
          enabled ? 'translate-x-6 bg-gray-300' : 'translate-x-1 bg-green-600'
        } inline-block h-4 w-4 transform rounded-full transition`}
      />
    </Switch>
       </div>
       </div>
      
    
    <div className='flex flex-col mt-8 w-full px-4 relative items-center'>
      <div className="relative w-[99%] rounded-[20px] overflow-hidden">
        <img className="w-full" src={homepic} alt="Home" />
        {true && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-[20px]"></div>}
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 text-xl font-black font-['Roboto'] text-center ">
          <p className='min-w-80 size-4  '>
            Ran out of fuel on roadside?<br /> We can refuel in 20 minutes
          </p>
        </div>
      </div>
    </div>
    
    <div className='flex flex-col items-center  text-black text-lg font-bold mt-8 gap-6 pb-5'>
    <button className='flex bg-slate-300 p-4 rounded-2xl w-64 text-center gap-5' onClick={()=> nav('/pumpsetup')}>
           <LocalGasStationIcon />
           <p className=''>Pump Setup</p>
       </button>
       <button  className='flex bg-slate-300 p-4 rounded-2xl w-64 gap-5' onClick={()=> nav('/pump_req')}>
          <img src={fuel} className='h-[1.5rem]'/>
          <p className=''>Fuel Requests</p>
       </button>
     
       <button className='flex bg-slate-300 p-4 rounded-2xl w-64 text-center gap-5'>
           <DescriptionIcon />
           <p className=''>Records</p>
        </button>
</div>
</div>
  )
}

export default Petrolhome