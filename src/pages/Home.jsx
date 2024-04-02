import React, { useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import homepic from '../assets/homepic.png';
import { useEffect } from 'react';
import { ArrowBack } from '@mui/icons-material';
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useNavigate } from 'react-router-dom';




const Home = () => {
    const [currentLocation, setCurrentLocation] = useState("Choose Location");
    const [showColorModal, setShowColorModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [morecolorModal, setmorecolorModal] = useState(false);
    const [showPlateModal, setPlateModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [otherColor, setotherColor] = useState('');
    const [selectedColor, setSelectedColor] = useState(''); // Selected car type

    // Function to handle clicking the "Choose Location" button
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
                        console.log( data);
                        const locationName = data.display_name.split(' ')[0];
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
   
    useEffect(() => {
        setShowOverlay(true); // Show the overlay when the component mounts
    }, []);
    useEffect(() => {
        console.log('Selected car:', selectedCar);
    }, [selectedCar]);
    useEffect(() => {
        console.log('Selected color:', selectedColor);
    }, [selectedColor]);
    const handleConfirmCar = () => {
        setShowColorModal(true);
        setShowModal(false);
    };
    const handleColor=()=>{
        setPlateModal(true);
        setShowColorModal(false); 
    };
    const moreColor=()=>{
        setmorecolorModal(true); 
    };
    
const nav= useNavigate();

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
                    {showOverlay && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-[20px]"></div>}
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
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex  justify-center items-center ">
                    <div className="w-3/4 h-[265px]  bg-white rounded-[22px] flex flex-col ">
                       <div className='flex gap-7 mt-4'> 
                       <button className=" text-black pl-3 " onClick={() => setShowModal(false)}>
                            <ArrowBack />
                        </button>
                        <div className="  text-black text-lg font-semibold font-['IBM Plex Sans Thai Looped']">Select Car Type:</div>
                       </div> 
                       <div className='flex justify-center items-center h-1/2 mt-3'>
                        <input
                            className="bg-white rounded-lg border-[2px] border-black border-opacity-80 py-3 px-2"
                            type="text"
                            value={selectedCar}
                            onChange={(e) => setSelectedCar(e.target.value)}
                        />
                        </div>
                        <div className='flex justify-center'>
                        <button className='bg-black text-white rounded-lg p-3 w-28' onClick={handleConfirmCar}>Confirm</button>
                    </div>
                </div>
                </div>
            )}
             {showColorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="w-[80%] h-64  bg-white rounded-[22px] flex flex-col gap-5">
                       
                    <div className='flex  mt-4'> 
                       <button className=" text-black pl-3 w-min" onClick={() => {setShowModal(true);setShowColorModal(false);}}>
                            <ArrowBack />
                        </button>
                        <div className="flex justify-center w-full pr-4  text-black text-lg font-bold uppercase ">Select Colour</div>
                       </div> 
                       <div className='grid mt-8 px-5  grid-cols-4 gap-x-4 gap-y-4'>
                          <button onClick={handleColor} className='bg-black p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-zinc-500 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-slate-300 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-neutral-200 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-red-800 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-blue-700 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-yellow-300 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-green-500 p-6 rounded-xl'></button>
                       </div>
                    </div>
                </div>
                
            )}
            {showPlateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="w-3/4 h-[266px]  bg-white rounded-[20px] flex flex-col items-center">
                <div className='flex mt-5 mb-2 px-2  w-full'>
                    <button className=" text-gray-600 " onClick={() => { {setPlateModal(false);setShowColorModal(true);} }}>
                        <ArrowBack />
                    </button>
                    <div className=" h-8  text-black text-lg font-bold uppercase pt-1 w-full text-center pr-4">Plate Number:</div>
                </div> 
                  <div className='mt-10 px-3'>  <input
                        className=" bg-white rounded-lg border border-black border-opacity-50 p-4"
                        type="text"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                    />
                    </div>
                    <div className='mt-8 flex justify-center'>
                    <button className=' bg-black text-white rounded-lg p-3 w-28' onClick={()=>{setPlateModal(false);nav('/nearpumps')}}>Confirm</button>
                    </div>
                    </div>
            </div>
            )}
            {morecolorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center">
                <div className="w-[360px] h-[266px] relative bg-white rounded-[22px]">
                    <button onClick={() => { setShowColorModal(true); setmorecolorModal(false); }}  className="absolute top-[25px] left-[20px] text-gray-600" >
                        <ArrowBack />
                    </button>
                    <div className="w-[291px] h-8 left-[73px] top-[23px] absolute text-black text-lg font-normal font-['IBM Plex Sans Thai Looped']">Type Your Color:</div>
                    <input
                        className="w-[229px] h-[57px] left-[58px] top-[101px] absolute bg-white rounded-lg border border-black border-opacity-30"
                        type="text"
                        value={otherColor}
                        onChange={(e) => setotherColor(e.target.value)}
                    />
                    <button onClick={() => { setPlateModal(true); setmorecolorModal(false); }} className='absolute bottom-10 left-32 bg-black text-white rounded-lg p-3 w-28' >Confirm</button>
                </div>
            </div>
            )}
        </div>
        
        
        
       
    );
};

export default Home;
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