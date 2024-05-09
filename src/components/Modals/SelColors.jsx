import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { useModalContext } from '../../Context/Modalcon';

const SelColors = () => {
    const { showmod, selcar, selcol, plate, setplate, setcol } = useModalContext();
    const [selectedCar, setSelectedCar] = selcar;
    const [showModal, setShowModal] = showmod;
    const [showColorModal, setShowColorModal] = selcol;
    const [showPlateModal, setShowPlateModal] = plate;
    const [selectedColor, setSelectedColor] = setcol;

    const handleColor = (color) => {
        setSelectedColor(color); // Set the selected color
        setShowColorModal(false);
        setShowPlateModal(true); 
        console.log(selectedColor);
        console.log(selectedCar);
    };

    return (
        <div className="fixed inset-x-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-end ">
          <div className="w-[90%] h-[300px] bg-white rounded-t-[20px] rounded-b-none flex flex-col items-center">
          <div className='flex mt-5 mb-2 px-2 w-full'>
                    <button className="text-black pl-1 w-min" onClick={() => { setShowModal(true); setShowColorModal(false); }}>
                        <ArrowBack />
                    </button>
                    <div className="flex justify-center w-full pr-4 text-black text-lg font-bold ">Select Colour:</div>
                </div> 
                <div className='grid mt-8 px-5 grid-cols-4 gap-x-4 gap-y-4'>
                    <button onClick={() => handleColor("Black")} className='bg-black p-6 rounded-xl'></button>
                    <button onClick={() => handleColor("Silver")} className='bg-zinc-500 p-6 rounded-xl'></button>
                    <button onClick={() => handleColor("White")} className='bg-slate-300 p-6 rounded-xl'></button>
                    <button onClick={() => handleColor("Green")} className='bg-green-800 p-6 rounded-xl'></button>
                    <button onClick={() => handleColor("Red")} className='bg-red-800 p-6 rounded-xl'></button>
                    <button onClick={() => handleColor("Brown")} className='bg-amber-900 p-6 rounded-xl'></button>
                    <button onClick={() => handleColor("Blue")} className='bg-blue-800 p-6 rounded-xl'></button>
                    <button onClick={() => handleColor("Orange")} className='bg-amber-500 p-6 rounded-xl'></button>
                </div>
            </div>
        </div>
    );
}

export default SelColors;
