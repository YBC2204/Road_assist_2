import { ArrowBack } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../Context/Modalcon';

export const Plate = () => {

    const nav = useNavigate();
    const { showmod ,selcar ,selcol,plate,setplate} = useModalContext();
  
   const [showColorModal, setShowColorModal] = selcol;
   const [showPlateModal, setShowPlateModal] = plate;
   const[plateNumber, setPlateNumber]=setplate;
 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="w-3/4 h-[266px]  bg-white rounded-[20px] flex flex-col items-center">
    <div className='flex mt-5 mb-2 px-2  w-full'>
        <button className=" text-gray-600 " onClick={() => { {setShowPlateModal(false);setShowColorModal(true);} }}>
            <ArrowBack />
        </button>
        <div className=" h-8  text-black text-lg font-bold uppercase pt-1 w-full text-center pr-4">Plate Number:</div>
    </div> 
      <div className='mt-10 px-3'>  <input
            className=" bg-white rounded-lg border border-black border-opacity-50 p-4"
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
        />
        </div>
        <div className='mt-8 flex justify-center'>
        <button className=' bg-black text-white rounded-lg p-3 w-28' onClick={()=>{setShowPlateModal(false);nav('/nearpumps')}}>Confirm</button>
        </div>
        </div>
</div>
  )
}
