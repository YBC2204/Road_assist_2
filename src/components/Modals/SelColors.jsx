import { ArrowBack } from '@mui/icons-material';
import React from 'react'
import { useModalContext } from '../../Context/Modalcon';

const SelColors = () => {

    const { showmod ,selcar ,selcol,plate} = useModalContext();
  
   
  const [showModal, setShowModal] = showmod;
  const [showColorModal, setShowColorModal] = selcol;
  const [showPlateModal, setShowPlateModal] = plate;

    const handleColor=()=>{
        setShowColorModal(false);
        setShowPlateModal(true); 
    };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="w-[80%] h-64  bg-white rounded-[22px] flex flex-col gap-5">
                       
                    <div className='flex  mt-4'> 
                       <button className=" text-black pl-3 w-min" onClick={() => {setShowModal(true);setShowColorModal(false);}}>
                            <ArrowBack />
                        </button>
                        <div className="flex justify-center w-full pr-4  text-black text-lg font-bold uppercase ">Select Colour</div>
                       </div> 
                       <div className='grid mt-8 px-5  grid-cols-4 gap-x-4 gap-y-4'>
                          <button onClick={handleColor} className='bg-black p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-zinc-500 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-slate-300 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-neutral-200 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-red-800 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-blue-700 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-yellow-300 p-6 rounded-xl'></button>
                          <button onClick={handleColor} className='bg-green-500 p-6 rounded-xl'></button>
                       </div>
                    </div>
                </div>
  )
}

export default SelColors