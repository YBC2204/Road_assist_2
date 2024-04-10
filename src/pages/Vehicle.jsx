/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DetailModal from '../components/Modals/DetailModal';
import { useModalContext } from '../Context/Modalcon';

const Vehicle = () => {

   
    const { showmod,selcar ,selcol ,plate,setplate , setdet} = useModalContext();
    const[detail,setDetails]=setdet
    
  return (
    <div className='flex flex-col h-[85vh] gap-2 items-center bg-neutral-300'>
        <button className='mt-4  font-semibold text-xl border-2 border-black rounded-xl px-3 py-2 active:bg-gray-500 active:text-white bg-white' onClick={()=>setDetails(true)}>ADD A VEHICLE +</button>
       {detail && <DetailModal/>}
    </div>
  )
}

export default Vehicle