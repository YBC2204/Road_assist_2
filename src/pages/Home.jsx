import  {  useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import homepic from '../assets/homepic.png';
import {  useModalContext } from '../Context/Modalcon.jsx';
import CarType from '../components/Modals/Cartype.jsx';
import SelColors from '../components/Modals/SelColors.jsx';
import  Plate  from '../components/Modals/Plate.jsx';
import { v4 as uuidv4 } from 'uuid';
import supabase from "../helper/SupaClient";
import FuelAmount from '../components/Modals/FuelAmount.jsx';


const Test = () => {
    
const [currentLocation, setCurrentLocation] = useState("Choose Location");
    
const {showmod,selcar,selcol, plate,setplate,setcol,showamt} = useModalContext();

const [showModal, setShowModal] = showmod;
const [showColorModal, setShowColorModal] = selcol;
const[showPlateModal, setShowPlateModal] = plate;
const [showAmtModal, setAmtModal] = showamt;  
   
const handleLocationClick = () => {
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
                         console.log('Location data:', data);
                         const locationName = data.address.suburb;
                         setCurrentLocation(locationName);
                     } catch (error) {
                         console.error('Error fetching location:', error);
                         setCurrentLocation('Location data not available');
                     }
                 },
                 (error) => {
                     console.error('Error getting location:', error);
                     setCurrentLocation('Location access denied');
                 }
             );
         } else {
             console.error('Geolocation is not supported by your browser');
             setCurrentLocation('Geolocation not supported');
         }
         return loca===locationName;
     };

    
     return (
       
        
        <div className='w-full pb-5 bg-neutral-300 flex flex-col items-center '>
        
            <div className="flex justify-center pt-12">
                <button className="flex items-center bg-white px-6 py-4 rounded-xl font-['IBM Plex Sans Thai Looped'] text-black text-sm font-bold" onClick={handleLocationClick}>
                    <PlaceIcon sx={{ fontSize: 25 }} />
                    <p > {currentLocation}</p>
                </button>
            </div>
            <div className='flex flex-col mt-8 w-full px-4 relative items-center'>
                <div className="relative w-[99%] rounded-[20px] overflow-hidden">
                    <img className="w-full" src={homepic} alt="Home" />
                    {true && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-[20px]"></div>}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-black font-['Roboto'] text-center ">
                        <p className='min-w-96 size-4  '>
                            Ran out of fuel on roadside?<br /> We can refuel in 20 minutes
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center text-black font-bold mt-8 gap-6 pb-5'>
                <button onClick={() => setShowModal(true)} className='flex bg-white p-4 rounded-2xl w-52 justify-evenly'>
                    <LocalGasStationIcon />
                    <p>Fuel Delivery</p>
                </button>
                <button onClick={() => setShowModal(true)} className='flex bg-white p-4 rounded-2xl w-52 justify-evenly'>
                    <BuildIcon />
                    <p>Workshop Service</p>
                </button>
            </div>
           
                {showModal && <CarType/>}
                {showColorModal && <SelColors/>}
                {showPlateModal && <Plate/>}
                {showAmtModal && <FuelAmount/>}
                
    
    </div> 

        );
};

export default Test;

// const[user,setUser]= useState({});
// const supabase = createClient(
//     "https://hxlkvldqxjraxxyrxbld.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bGt2bGRxeGpyYXh4eXJ4YmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNTY5MzEsImV4cCI6MjAyNDkzMjkzMX0.ZNCPfCUQj_Vqv-WCX2tj6GEuE7ZDGwMgFc69zLZKhgM"  
//     );

// useEffect(() =>{
//     async function getuserData()
//     {
//         await supabase.auth.getUser().then((value) =>{
            
//             if(value.data?.user)
//             {
//                console.log(value.data.user);
//                 setUser(value.data.user);
//             }
//         })
//     }
//     getuserData();
// },[]);