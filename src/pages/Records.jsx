import React, { useState } from 'react';
import PastService from '../components/PastService';
import IncomingService from '../components/incoming';
function Records() {
  const [state, setState] = useState('');
  const [showService, setShowService] = useState(true);

  // const handleCancelService = () => {
  //   setShowService(false); // Hide the Service component
  // };

  return (


    <div className=' bg-gradient-to-br from-gray-800 flex flex-col  h-[85vh]'>
      
      <div className='flex bg-black mt-6 mx-8 py-1 rounded-lg border border-black border-opacity-50 font-semibold text-gray-500'>
        <button className='w-1/2 border-r-2 border-r-gray-500 focus:text-white' onClick={()=>{setState('upcoming')}}>UPCOMING</button>
        <button className='w-1/2 focus:text-white' onClick={()=>{setState('past');}}>PAST</button>
    
      </div>
      
      {state === 'past' && <PastService />}
      {state === 'upcoming' && <IncomingService/>}
      {/* <div className="flex justify-center items-center">
        {showService && <Service onCancel={handleCancelService} />}
      </div> */}
    </div>
   
  );
  
}

export default Records;
