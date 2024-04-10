import React, { useEffect, useState } from 'react'
import DetailModal from '../components/Modals/DetailModal';

const Vehicle = () => {

   
const [detail,setDetails] = useState(false);
    
  return (
    <div className='bg-gradient-to-br from-gray-800 '>
    <div className='flex flex-col h-[85vh] gap-2 items-center '>
        <button className='mt-4  font-semibold text-xl border-2 border-black rounded-xl px-3 py-2 active:bg-gray-500 active:text-white' onClick={()=>setDetails(true)}>ADD A VEHICLE +</button>
       {true && <DetailModal/>}
    </div></div>
  )
}

export default Vehicle