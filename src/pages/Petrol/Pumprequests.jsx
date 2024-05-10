import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Requestcard from '../../components/Requestcard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import supabase from '../../helper/SupaClient';
import { useStatusContext } from '../../Context/StatusContext';
import { useState } from 'react';
import datapic from '../../assets/no_data.png'

const Req = () => {
  
  const navigate = useNavigate();
  
  const {logid} = useStatusContext();
  const[lid,setlid] = logid;
  const[request,setRequest] = useState([]);
  const[pumpdat,setPumpDat] = useState([]);
  
  useEffect(()=>{
    console.log(lid);
    const fetchdata = async() =>
      {
        const{data,error} = await supabase
        .from('Order_assign').select('*')
        .eq('pump_id',lid);
        setRequest(data);

        const{data:pumpdata , error:perror} = await supabase
        .from('Pump_det')
        .select('*')
        .eq('id',data[0].pump_id);
        setPumpDat(pumpdata);
      }
      fetchdata();
      
  },[lid]);

  

  const handleBackButtonClick = () => {
    navigate('/petrol_home');
  };

  return (
    <div className='relative bg-gradient-to-br from-gray-800 h-[100vh]'>
      <div className='flex flex-col h-[85vh] gap-2 items-center overflow-y-scroll'>
        <div className='absolute left-2 top-3 text-white' onClick={handleBackButtonClick}>
          <ArrowBackIcon sx={{ fontSize: 35 }} />
        </div>
        <p className='text-[28px] ml-4 mt-2 font-bold  text-white'>FUEL REQUESTS</p>
    <div className='h-[4px] w-full bg-slate-400'></div>
       {/* {request ? (request.map((req,i) =>
        (
          <Requestcard 
          key={i}
          order={req.order_id}
          uid={req.user_id}
          pump={req.pump_id}  
          />
          ))):
          
          <div>
          <img src={datapic}></img>
          </div>
          
          } */}
          <Requestcard></Requestcard>
      </div>
    </div>
  );
};

export default Req;
