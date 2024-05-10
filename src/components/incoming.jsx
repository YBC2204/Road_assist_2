import { useState, useEffect } from 'react';
import supabase from '../helper/SupaClient';
import { useStatusContext } from '../Context/StatusContext';
import { useModalContext } from '../Context/Modalcon';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

const IncomingService = () => {
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
          .eq('user_id', lid);
  
        if (error) {
          throw error;
        }
  
        // Filter orderAssignData based on Confirmed === false
        const unconfirmedOrders = orderAssignData.filter(order => !order.Completed && order.Ongoing);
  
        if (unconfirmedOrders.length > 0) {
          setOrderCompleted(true);
        }
  
        // Extracting order IDs from unconfirmedOrders
        const ids = unconfirmedOrders.map(order => order.order_id);
        setOrderIds(ids);
        //  console.log(orderIds)
        // Extracting pump IDs from unconfirmedOrders
        const pumpIds = unconfirmedOrders.map(order => order.pump_id);
        // Fetching pump data for each pump ID
        const promises = pumpIds.map(async pumpId => {
          const { data: pumpData, error: pumpError } = await supabase
            .from('Pump_det')
            .select('*')
            .eq('id', pumpId)
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
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchOrderAssign();
  }, [lid]);
  

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
      fetchOrderAssign();
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };
  
  // Function to handle navigation

  return (
    <>
      {orderCompleted && orderIds.map((orderId, index) => (
        <div key={index} className='text-black w-[90%]  bg-slate-300 flex flex-col py-4 px-5 gap-3 rounded-[22px] mb-8 mt-5 ml-4'>
          <div className='flex flex-row  gap-2  justify-between items-center'>
           <p className='font-bold uppercase  text-xl '>{pumpData[index]?.pump_name}</p> 
           <p className='font-bold uppercase text-xs  text-blue-500'>{orderId}</p>
          </div>
          
          <div className='flex flex-col '>
              
              <p className='font-semibold  text-lg '>{pumpData[index]?.Company}</p>
              <p className='font-semibold '>{pumpData[index]?.Address}</p>
              
              <div className='flex justify-between pr-3 mt-2'>
                <p className='font-medium'>{orderData[index]?.Vehicle_name}</p>
                <p className='font-medium capitalize'>{orderData[index]?.car_color}</p>
              </div>
              
              <div className='flex justify-between pr-1 mt-2'>
                <p className='font-bold text-gray-800 '>Fuel Amount:{orderData[index]?.Fuel_amt}</p>
                <p className='font-bold text-gray-800'>Fuel Type:{orderData[index]?.Fuel_type}</p>
              </div>
              <p className='font-semibold  my-2'>{pumpData[index]?.phno}</p>
              
              <div className='w-full mt-3 flex justify-center'>
              <button className='bg-blue-500 rounded-md  p-2  font-semibold text-white ' onClick={() => handleOrderReceived(orderId)}>Order Received<CheckIcon className='ml-2'/></button>
              </div>
            </div>
          </div>
       
      ))}
    </>
  );
};

export default IncomingService;