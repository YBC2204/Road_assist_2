import React from 'react';
import { useNavigate } from 'react-router-dom';
import Requestcard from '../../components/Requestcard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Req = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/petrol_home');
  };

  return (
    <div className='relative bg-gradient-to-br from-gray-800 h-[100vh]'>
      <div className='flex flex-col h-[85vh] gap-2 items-center overflow-y-scroll'>
        <div className='absolute left-4 top-3 text-white' onClick={handleBackButtonClick}>
          <ArrowBackIcon sx={{ fontSize: 35 }} />
        </div>
        <p className='text-[28px] ml-4 mt-2 font-bold  text-white'>PUMP RECORDS</p>
    <div className='h-[4px] w-full bg-white'></div>
        <Requestcard />
      </div>
    </div>
  );
};

export default Req;
