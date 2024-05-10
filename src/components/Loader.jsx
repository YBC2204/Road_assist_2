import { useEffect } from 'react';
import { useStatusContext } from '../Context/StatusContext';
import load from '../assets/pumpani.gif'
import supabase from '../helper/SupaClient';
import { useNavigate } from 'react-router-dom';
const Loader = () => {

    const {oid} = useStatusContext();
    const[orderid,setOrderid] = oid;
    const nav = useNavigate();
    
    useEffect(() =>
    {
        console.log(orderid);
      const fetchorder = async() =>{
        const{data , error} = await supabase
        .from('Order_assign')
        .select('Ongoing')
        .eq('order_id',orderid);

       if(data && data.length > 0 && data[0].Ongoing)
        {
          console.log(data[0].Ongoing);
          nav('/order');
        } 
      }
fetchorder();

const interval = setInterval(fetchorder, 15000);

        // Cleanup function
        return () => clearInterval(interval);
     
    },[nav,orderid] );
  
    


  return (
    <div className='text-white h-[100vh] bg-gradient-to-br from-gray-800 '>
  <div className='w-full flex flex-col justify-center h-full '>
    <img src={load} className='h-[120px] w-[120px] mx-auto'/>
    <div className="marquee">
  <div className="marquee__inner ">
    <p className="marquee__line text-blue-300">Please Wait while the pump is confirming your order......</p>
    <p className="marquee__line text-blue-300">Please Wait while the pump is confirming your order......</p>
  </div>
</div>
  </div>
    </div>
  )
}

export default Loader