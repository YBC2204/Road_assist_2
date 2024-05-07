/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import homepic from '../assets/home.png';
import { useModalContext } from '../Context/Modalcon.jsx';
import CarType from '../components/Modals/Cartype.jsx';
import SelColors from '../components/Modals/SelColors.jsx';
import Plate from '../components/Modals/Plate.jsx';
import { v4 as uuidv4 } from 'uuid';
import supabase from "../helper/SupaClient";
import FuelAmount from '../components/Modals/FuelAmount.jsx';
import FuelType from '../components/Modals/FuelType.jsx';
import { useStatusContext } from '../Context/StatusContext.jsx';


const Test = () => {  
  
  const [currentLocation, setCurrentLocation] = useState("Current Location");
  const { showmod, selcol, plate, showamt, showfuel,setmode, setmail,setloc } = useModalContext();
  const {stat,logid , locclick,long,lat} = useStatusContext();
  const [lid,setlid] = logid;
  const [latitud,setlat]=lat;
  const [longitud,setlong]=long;
  const [showModal, setShowModal] = showmod;
  const [showColorModal, setShowColorModal] = selcol;
  const [showPlateModal, setShowPlateModal] = plate;
  const [showAmtModal, setAmtModal] = showamt;
  const [showFuelType, setFuelTypeModal] = showfuel;
  const [mailid, setMailId] = setmail;
  const[selectedmode,setselectedmode]=setmode; 
  const[loc,setloca]=setloc;
  const [locationClicked, setLocationClicked] = locclick; 
  const [status, setStatus] = stat;
  const isLoggedIn = status === 'SIGNED_IN';
  
  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
         
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            if (!response.ok) {
              throw new Error('Failed to fetch location data');
            }
            const data = await response.json();
console.log(data);
            let locationName = data.address.suburb || data.address.city || data.address.town;
            if (!locationName) {
              throw new Error('Location data not available');
              
            }

            setCurrentLocation(locationName);
            setloca(locationName);
            setlat(latitude);
         
         setlong(longitude);
          } catch (error) {
            console.error('Error fetching location:', error);
            setCurrentLocation('Location data not available');
            setLocationClicked(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Location access denied');
          setLocationClicked(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
      setCurrentLocation('Geolocation not supported');
      setLocationClicked(false);
    }
    setLocationClicked(true);
    console.log(locationClicked)
  };
  
  // const handleChooseLocation = () => {
  //   const googleMapsUrl = 'https://www.google.com/maps/search/';
  //   window.open(googleMapsUrl, '_blank');
  // };

  // Function to add mailid to loginusertrial table
  const addMailIdToSupabase = async () => {
    try {
      const { data, error } = await supabase.from('logintrial').insert([{ email_id: mailid ,mode:selectedmode}]);
      if (error) {
        console.error('Error adding mailid to Supabase:', error.message);
        
      } else {
        console.log('Mailid added to Supabase:', data);
        console.log(selectedmode);
      }
    } catch (error) {
      console.error('Error adding mailid to Supabase:', error.message);
    }
  };
//    const fetchIdFromLoginTrial = async () => {
//     try {
//         // Fetch the ID from the logintrial table based on the mailid
//         const { data, error } = await supabase
//             .from('logintrial')
//             .select('id')
//             .eq('email_id', mailid)
//             .single();

//         if (error) {
//             console.error('Error fetching data from logintrial:', error.message);
//             return null;
//         }

//         if (!data) {
//             console.error('No data found in logintrial for the provided mailid.');
//             return null;
//         }

//         return data.id;
//     } catch (error) {
//         console.error('Error fetching data from logintrial:', error.message);
//         return null;
//     }

// };
const handleClick=()=>{
  if(isLoggedIn && locationClicked)
  setShowModal(true);
 else{
  if(!isLoggedIn)
   alert('Login to continue');
  else
  alert('Click Current Location to continue');
 }
}
  
  React.useEffect(() => {
    addMailIdToSupabase();
//     const loginid=fetchIdFromLoginTrial();
// setlid(loginid);
// console.log(lid);
  }, []);

  



  return (
    <div className=' w-full h-[95vh]  pb-5 bg-gradient-to-br from-gray-800  flex flex-col items-center '>
      <div className="flex justify-center pt-12">
        <button className="flex items-center bg-slate-300 px-6 py-4 rounded-xl font-['IBM Plex Sans Thai Looped'] text-black text-sm font-bold" onClick={handleLocationClick}>
          <PlaceIcon sx={{ fontSize: 25 }} />
          <p> {currentLocation}</p>
        </button>
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
  <button onClick={handleClick} className='flex bg-slate-300 p-4 rounded-2xl w-64 text-center'>
    <LocalGasStationIcon />
    <p className='px-8'>Fuel Delivery</p>
  </button>
  <button onClick={handleClick} className='flex bg-slate-300 p-4 rounded-2xl w-64 text-center'>
    <BuildIcon />
    <p className='px-5'>Workshop Service</p>
  </button>
</div>


      {showModal && <CarType />}
      {showColorModal && <SelColors />}
      {showPlateModal && <Plate />}
      {showAmtModal && <FuelAmount />}
      {showFuelType && <FuelType />}

    </div>
  );
};

export default Test;
