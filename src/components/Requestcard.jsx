import { useState, useEffect } from 'react';
import supabase from '../helper/SupaClient';
import { useStatusContext } from '../Context/StatusContext';
import { useModalContext } from '../Context/Modalcon';
import { useNavigate } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Requestcard = () => {

  const { logid } = useStatusContext();
  const [lid] = logid;
  const [orderCompleted, setOrderCompleted] = useState(false); // State to track if the order is completed
  const [orderIds, setOrderIds] = useState([]); // State to store the array of order IDs
  const [pumpData, setPumpData] = useState([]); // State to store the array of pump data
  const [orderData, setOrderData] = useState([]); // State to store the array of order data
  const { openEditModal } = useModalContext(); // Assuming you have a function to open the edit modal
  const navigate = useNavigate(); // React Router's hook for navigation

  useEffect(() => {
    const fetchOrderAssign = async () => {
      try {
        const { data: orderAssignData, error } = await supabase
          .from('Order_assign')
          .select('*')
          .eq('pump_id', lid);
  
        if (error) {
          throw error;
        }
   
        // Filter orderAssignData based on Confirmed === false
        const unconfirmedOrders1 = orderAssignData.filter(order => !order.Completed  );
        const unconfirmedOrders = orderAssignData.filter(order => !order.Ongoing );
  console.log(unconfirmedOrders)
        if (unconfirmedOrders.length > 0) {
          setOrderCompleted(true);
        }
  
        // Extracting order IDs from unconfirmedOrders
        const ids = unconfirmedOrders.map(order => order.order_id);
        setOrderIds(ids);
        //  console.log(orderIds)
        // Extracting pump IDs from unconfirmedOrders
        const pumpIds = unconfirmedOrders.map(order => order.user_id);
        console.log(pumpIds);
        // Fetching pump data for each pump ID
        const promises = pumpIds.map(async pumpId => {
          const { data: pumpData, error: pumpError } = await supabase
            .from('user')
            .select('*')
            .eq('logintrial_id', pumpId)
            .single();
  
          if (pumpError) {
            throw pumpError;
          }
  
          return pumpData;
        });
  
        const pumpDataArray = await Promise.all(promises);
        setPumpData(pumpDataArray);
  
        // Fetching order data for each order ID
        const orderPromises = ids.map(async orderId => {
          const { data: orderData, error: orderError } = await supabase
            .from('order')
            .select('*')
            .eq('order_no', orderId)
            .single();
  
          if (orderError) {
            throw orderError;
          }
  
          return orderData;
        });
  
        const orderDataArray = await Promise.all(orderPromises);
        setOrderData(orderDataArray);
        
      } 
      catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchOrderAssign();
  }, [lid]);

 
  
  const handleOrderConfirm = async (orderId) => {
    try {
      // Update the 'Completed' status to true for the corresponding order ID
      await supabase
        .from('Order_assign')
        .update({ Ongoing: true })
        .eq('order_id', orderId);
      
      // After updating, refresh the data
      //fetchOrderAssign();
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };
  // Function to handle opening edit modal
  const handleOpenEditModal = () => {
    // Call the function to open the edit modal (openEditModal should be implemented in useModalContext)
    openEditModal();
  };
  const handleOrderReceived = async (orderId) => {
    try {
      // Update the 'Completed' status to true for the corresponding order ID
      await supabase
        .from('Order_assign')
        .update({ Completed: true })
        .eq('order_id', orderId);
      
      // After updating, refresh the data
      //fetchOrderAssign();
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };
  
  // Function to handle navigation

  return (
    <>
      {orderCompleted && orderIds.map((orderId, index) => (
        
        <div key={index} className='text-black w-[90%]  bg-slate-300 flex flex-col py-3 px-5 gap-3 rounded-[22px] my-6 '>
          <div className='flex flex-row gap-2 relative'>
            <p className='font-bold uppercase text-xs absolute right-0 text-blue-500'>{orderId}</p>
            <p className='font-bold uppercase text-center text-xl '>{pumpData[index]?.username}</p>
          </div> 
          <div className='flex flex-col'>
            <div className='flex justify-between pt-1'>
                <p className='font-medium capitalize'>{orderData[index]?.Vehicle_name}</p>
                <p className='capitalize font-medium'>{orderData[index]?.car_color}</p>
            </div>
            
                <p className='font-semibold text-gray-800 mt-2'>Fuel Amount:{orderData[index]?.Fuel_amt}</p>
                <p className='font-semibold text-gray-800 mb-2'>Fuel type:{orderData[index]?.Fuel_type}</p>
            
              <p className='font-medium  '>{pumpData[index]?.phno}</p>
              <div className='flex justify-center mt-3'>
                 <button className='bg-blue-500 rounded-md  flex justify-center px-3 py-1 font-semibold text-white' onClick={() => handleOrderConfirm(orderId)}>Confirm <ThumbUpOffAltIcon className='ml-2'/></button>
              </div>
            </div>
          </div>
        
      ))}
    </>
  );
};

export default Requestcard; 



// /* eslint-disable react/prop-types */
// import car from '../assets/car_def.png';
// import { useEffect, useState } from 'react';
// import supabase from '../helper/SupaClient';
// import EditModal from './Modals/EditModal';
// import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
// import BuildIcon from '@mui/icons-material/Build';
// import { ArrowBack } from '@mui/icons-material';
// import { useModalContext } from '../Context/Modalcon';
// import { useStatusContext } from '../Context/StatusContext';
// import { useNavigate } from 'react-router-dom';

// const Requestcard = ({order,uid,pump}) => {
//     const [confirmationOpen, setConfirmationOpen] = useState(false); // State to manage confirmation dialog
//     const { openEditModal } = useModalContext(); // Assuming you have a function to open the edit modal
//     const { deleteRequest } = useStatusContext(); // Assuming you have a function to delete the request
//     const navigate = useNavigate(); // React Router's hook for navigation
  
//     const[userdat,setUserdat] = useState([]);
//    useEffect(()=>{
    
//      const fetchdata = async()=>
//       {
//         const { data:userdata, error} = await supabase
//         .from('order')
//         .select('*')
//         .eq('user_id',uid)
//         .eq('order_no',order)
//         ;
        
//         setUserdat(userdata);
       
//       }
//       fetchdata();
//    },[]) 
   
//    console.log(userdat);
   
//     // Function to handle denial confirmation
//     const handleDenyConfirmation = () => {
//       setConfirmationOpen(true);
//     };
  
//     // Function to handle denial of request
//     const handleDenyRequest = () => {
//       // Perform deletion of request (you should have the implementation for this)
//       // For now, I'm assuming a function deleteRequest is available in useStatusContext
//       deleteRequest(); // You should implement this function
  
//       // Close confirmation dialog
//       setConfirmationOpen(false);
//     };
  
//     // Function to handle cancellation of denial
//     const handleCancelDeny = () => {
//       setConfirmationOpen(false);
//     };

  
// return (
//      <div className='text-black w-[90%] bg-slate-300 flex flex-col py-4 px-5 gap-3 rounded-[22px] mb-8 mt-5' >
   
      
//      <div className='flex flex-row gap-2 relative'>
//         <div className='flex flex-col '>
//         <p className='font-bold uppercase text-xs absolute right-0 text-blue-500'>{order}</p>
//           <p className='font-bold uppercase '>{}</p>
//           <p className='font-medium  '>Phone no:</p>
//           <p className='font-semibold '>{userdat.Plate_num}</p>
//           <div className='flex justify-between  pr-2 pt-1'>
//             <p>{userdat.Vehicle_name}</p>
//             <p className='absolute right-8'>{userdat.car_color}</p>
//           </div>
//           <div className='flex justify-between   pr-2 pt-1'>
//             <p>{userdat.Fuel_amt}</p>
//             <p className='absolute right-8'>{userdat.Fuel_type}</p>
            
//           </div>
          
//           <p className='font-medium  '>Location</p>
//         </div>
//         {/* <div className='w-1/2 h-3/4'>
//           <img src={car} className='w-full h-full object-cover rounded-lg' alt='Car' />
//         </div> */}
//       </div>
//       <div className='h-[1px] bg-black'></div>
//       <div className='flex w-full font-semibold'>
//       <button className='uppercase w-1/2 bg-gray-700 text-blue-400 rounded-s-lg p-[6px] border-r border-black' onClick={openEditModal}>Accept</button>
//         <button className='uppercase w-1/2 bg-gray-700 text-red-600 rounded-e-lg p-[6px]' onClick={handleDenyConfirmation}>Deny</button>
//       </div>
     
    

//     {/* {deleteError && (
//         <div className='text-red-500 mt-2 text-sm'>{deleteError}</div>
//       )}

//       {editModalOpen && (
//         <EditModal
//           vehicleData={{ name, plate, color, type }} // Pass the current vehicle's data
//           onClose={closeEditModal}
//         />
//       )} */}
//           {confirmationOpen && (
//         <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
//           <div className='bg-white p-4 rounded-lg'>
//             <p className='text-lg font-semibold'>Are you sure you want to deny the request?</p>
//             <div className='flex justify-end mt-4'>
//               <button className='bg-red-600 text-white px-4 py-2 rounded mr-2' onClick={handleDenyRequest}>Yes</button>
//               <button className='bg-gray-400 text-black px-4 py-2 rounded' onClick={handleCancelDeny}>No</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Requestcard;


// <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <LocalGasStationIcon />
//     <p className='px-8'>Fuel Delivery</p>
//         </button>
//         <button className='bg-[#E3FEF7] rounded-xl py-3 mx-5 font-semibold '>
//         <BuildIcon />
//     <p className='px-5'>Workshop Service</p>
//         </button>