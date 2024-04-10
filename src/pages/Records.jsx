import React, { useState } from 'react';
import Service from '../components/Service';

function Records() {
  const [state, setState] = useState('upcoming');
  const [showService, setShowService] = useState(true);

  const handleCancelService = () => {
    setShowService(false); // Hide the Service component
  };

  return (
    <div className='h-[85vh] bg-neutral-300 flex flex-col'>
      <div className='flex bg-white mt-6 mx-8 py-1 rounded-lg border border-black border-opacity-50 font-semibold text-gray-500'>
        <button
          className={`w-1/2 border-r-2 border-r-gray-500 ${state === 'upcoming' ? 'active:text-blue-600' : ''}`}
          onClick={() => { setState('upcoming'); setShowService(true); }}
        >
          UPCOMING
        </button>
        <button
          className={`w-1/2 focus:text-blue-600 ${state === 'past' ? 'active:text-blue-600' : ''}`}
          onClick={() => { setState('past'); setShowService(true); }}
        >
          PAST
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
        {showService && <Service onCancel={handleCancelService} />}
      </div>
    </div>
  );
}

export default Records;
