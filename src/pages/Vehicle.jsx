/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DetailModal from '../components/Modals/DetailModal';
import { useModalContext } from '../Context/Modalcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Vehicle = () => {

   
    const { showmod,selcar ,selcol ,plate,setplate , setdet} = useModalContext();
    const[detail,setDetails]=setdet
    
  return (


    <div className='bg-gradient-to-b from-gray-800 '>

    <div className='flex flex-col h-[85vh] gap-2 items-center '>
        <button className='mt-4 flex gap-2 items-center text-black font-semibold text-xl border-2 border-black rounded-xl px-3 py-2 active:bg-gray-500 active:text-white bg-white' onClick={()=>setDetails(true)}>ADD A VEHICLE <AddCircleIcon/></button>
       {detail && <DetailModal/>}
    </div></div>
  )
}

export default Vehicle