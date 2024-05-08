/* eslint-disable react/prop-types */
import car from '../assets/car_def.png';
import { useState } from 'react';
import supabase from '../helper/SupaClient';
import EditModal from './Modals/EditModal';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import { ArrowBack } from '@mui/icons-material';
import { useModalContext } from '../Context/Modalcon';
import { useStatusContext } from '../Context/StatusContext';
import { useNavigate } from 'react-router-dom';

const Vehiclecard = ({ id, name, plate, color, type }) => {
  const {long,lat} = useStatusContext();
  const nav = useNavigate();
 
  const [longitud,setlong]=long;
  const [latitud,setlat]=lat;
  const [deleteError, setDeleteError] = useState(null);
  console.log(id);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [service,setService] = useState(false);
  const [fuelmodal,setfuelModal] = useState(false);
  const [selectedamt,setSelectedamt] = useState('');
  const [error,setError] = useState('');

  const {setloc} = useModalContext();

  const[loc,setloca] = setloc;

  const deleteEntry = async () => {
    // Show confirmation dialog before deleting the entry
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
  
    if (confirmDelete) {
      try {
        const { error } = await supabase.from('Vehicle_det').delete().eq('user_id', id).eq('plate_num', plate); 
  
        if (error) {
          console.error('Delete error:', error.message);
          setDeleteError('Error deleting entry');
        } else {
          console.log('Entry deleted successfully');
        }
      } catch (error) {
        console.error('Delete error:', error.message);
        setDeleteError('Error deleting entry');
      }
    }
  };
  
  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };
console.log(service);
console.log(loc);
const handleService = async () => {
  if(loc!=1)
 setService(true);
else
{
  alert("Choose current location");
  nav('/home');
}

 
};

const handleConfirmAmt = async () => {
  if (selectedamt.trim() === "") {
      setError("Please enter a fuel amount.");
      return;
  }

  const {data, errors} = await supabase
  .from('order')
  .insert([
    {
      Vehicle_name: name,
      Plate_num: plate,
      car_color: color,
      Fuel_type: type,
      user_id: id,
      Fuel_amt:selectedamt,
      Location:loc,
      Latitude:latitud,
      Longitude:longitud
    }
  ]);

  if (errors) {
    console.error('Error inserting data into trialvehicle:', errors.message);
    return;
}


  setfuelModal(false);
 
  setError(""); // Clear error message
  nav('/nearby')
 
};

  return (
     <div className='text-black w-[90%] bg-slate-300 flex flex-col py-4 px-5 gap-3 rounded-[22px] my-3' >
   
      
     <div className='flex flex-row gap-2'>
        <div className='flex flex-col w-1/2 '>
          <p className='font-bold uppercase '>{name}</p>
          <p className='font-semibold '>{plate}</p>
          <div className='flex justify-between pr-2 pt-1'>
            <p>{color}</p>
            <p>{type}</p>
          </div>
        </div>
        <div className='w-1/2'>
          <img src={car} className='w-full h-full object-cover rounded-lg' alt='Car' />
        </div>
      </div>
      <div className='h-[1px] bg-black'></div>
      <div className='flex w-full font-semibold'>
        <button className='uppercase w-1/2 bg-gray-700 text-blue-400 rounded-s-lg p-[6px] border-r border-black' onClick={openEditModal}>edit entry</button>
        <button className='uppercase w-1/2 bg-gray-700 text-red-600 rounded-e-lg p-[6px]' onClick={deleteEntry}>delete entry</button>
      </div>
     
      {!service ? (
        <div className='flex justify-center -mb-2'>
          <button
            className={`bg-slate-900 text-white font-semibold px-3 py-2 rounded-md `}
            onClick={handleService}
          >
            BOOK A SERVICE
          </button>
        </div>
      ) : (
        <div>
        <div className='flex justify-center -mb-2 gap-2'>
          <button className={`bg-[#ffffff] rounded-xl px-3 py-1 font-semibold flex items-center w-1/2 `} onClick={()=> setfuelModal(true)}>
            <LocalGasStationIcon />
            <p className='mx-1'>Fuel Delivery</p>
          </button>
          <button className={`bg-[#ffffff] rounded-xl px-3 py-1 font-semibold flex items-center w-1/2 `}>
            <BuildIcon />
            <p className=''>Workshop Service</p>
          </button>
        </div>
        {fuelmodal &&
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-3/4 pb-5 bg-white rounded-[20px] flex flex-col items-center">
                <div className='flex mt-5 mb-2 px-2 w-full'>
                    <button className="text-gray-600" onClick={()=>setfuelModal(false)}>
                        <ArrowBack />
                    </button>
                    <div className="text-black text-md font-bold uppercase pt-1 w-full text-center pr-4">Enter Fuel Amount(in ₹):</div>
                </div>
                <div className='mt-5 px-3'>
                    <input
                        className="bg-white rounded-lg border border-black border-opacity-50 p-4"
                        type="text" required
                        value={selectedamt}
                        onChange={(e) => setSelectedamt(e.target.value)}
                      />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className='relative mt-4 flex justify-center'>
                    <button className='bg-black text-white rounded-lg p-3 w-28 mr-3' onClick={handleConfirmAmt}>Confirm</button>
                </div>
            </div>
        </div>}
        
        </div>  
      )}

    {deleteError && (
        <div className='text-red-500 mt-2 text-sm'>{deleteError}</div>
      )}

      {editModalOpen && (
        <EditModal
          vehicleData={{ name, plate, color, type }} // Pass the current vehicle's data
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default Vehiclecard;


// <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <LocalGasStationIcon />
//     <p className='px-8'>Fuel Delivery</p>
//         </button>
//         <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <BuildIcon />
//     <p className='px-5'>Workshop Service</p>
//         </button>
