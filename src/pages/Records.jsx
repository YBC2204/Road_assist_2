
import { useState } from 'react';
import Service from '../components/Service';

function Records() {

const [state,setState] = useState('upcoming')

  return (

    <div className='h-[85vh] bg-neutral-300 flex flex-col'>
      
      <div className='flex bg-white mt-6 mx-8 py-1 rounded-lg border border-black border-opacity-50 font-semibold text-gray-500'>
        <button className='w-1/2 border-r-2 border-r-gray-500 focus:text-blue-600' onClick={()=>{setState('upcoming')}}>UPCOMING</button>
        <button className='w-1/2 focus:text-blue-600' onClick={()=>{setState('past');
        }}>PAST</button>
      </div>
     
      <div className='overflow-y-auto'>
         <div><Service></Service></div>
      <div><Service></Service></div>
      <div><Service></Service></div>
      </div>

    </div>
  );
}

export default Records;
