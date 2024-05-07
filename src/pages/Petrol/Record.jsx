import React from 'react';
import { useNavigate } from 'react-router-dom';
import Recordpump from '../../components/Recordpump';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Record = () => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
      navigate('/petrol_home');
    };
  return (
    <div className='relative bg-gradient-to-br from-gray-800'>
    <div className='flex flex-col h-[85vh] gap-2 items-center overflow-y-scroll'>
    <p className='text-[28px] ml-4 mt-2 font-bold  text-white'>PUMP RECORDS</p>
    <div className='h-[4px] w-full bg-white'></div>
 
      <div className='absolute left-4 top-3 text-white' onClick={handleBackButtonClick}>
        <ArrowBackIcon sx={{ fontSize: 35 }} />
      </div>
      <Recordpump />
    </div>
  </div>

  )
}

export default Record
