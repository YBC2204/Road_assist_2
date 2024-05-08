import { useState, useEffect } from 'react';
import supabase from '../helper/SupaClient';
import { useStatusContext } from '../Context/StatusContext';
import { useModalContext } from '../Context/Modalcon';
import { useNavigate } from 'react-router-dom';

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

        // Filter orderAssignData based on Completed === false
        const completedOrders = orderAssignData.filter(order => !order.Completed);

        if (completedOrders.length > 0) {
          setOrderCompleted(true);
        }

        // Extracting order IDs from completedOrders
        const ids = completedOrders.map(order => order.order_id);
        setOrderIds(ids);

        // Extracting pump IDs from completedOrders
        const pumpIds = completedOrders.map(order => order.pump_id);
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

  // Function to handle navigation

  console.log("orderIds length:", orderIds.length);
  console.log("pumpData length:", pumpData.length);
  console.log("orderIds:", orderIds);
  console.log("pumpData:", pumpData);

  return (
    <>
      {orderCompleted && orderIds.map((orderId, index) => (
        <div key={index} className='text-black w-[90%]  bg-slate-300 flex flex-col py-3 px-5 gap-3 rounded-[22px] mb-8 mt-5 ml-4'>
          <div className='flex flex-row gap-2 relative'>
            <div className='flex flex-col '>
              <p className='font-bold uppercase text-xs absolute right-0 text-blue-500'>{orderId}</p>

              <p className='font-bold uppercase text-center text-xl '>{pumpData[index]?.pump_name}</p> {/* Displaying the retrieved pump name */}
              <p className='font-medium  '>{pumpData[index]?.Company}</p>
              <p className='font-semibold '>{pumpData[index]?.Address}</p>
              <div className='flex justify-between  pr-2 pt-1'>
                <p>{orderData[index]?.Vehicle_name}</p>
                <p className='absolute right-8'>{orderData[index]?.car_color}</p>
              </div>
              <div className='flex justify-between   pr-2 pt-1'>
                <p>Fuel Amount:{orderData[index]?.Fuel_amt}</p>
                <p className='absolute right-8'>Fuel type:{orderData[index]?.Fuel_type}</p>
              </div>
              <p className='font-medium  '>{pumpData[index]?.phno}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default IncomingService;
