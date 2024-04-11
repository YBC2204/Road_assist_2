import { useState } from 'react';

const Service = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    // Logic for confirming cancel action goes here
    setShowModal(false);
  };

  const handleCancelModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className="w-[px] h-[250px] top-[85px] relative">
        <div className="w-[328px] h-[212px] relative bg-white rounded-lg shadow">
          <div className="left-[16px] top-[20px] relative text-zinc-700 text-base font-bold font-['Roboto']">Basic Service</div>
          <div className="left-[16px] top-[60px] relative text-zinc-700 text-base font-bold font-['Roboto']">General Motors</div>
          <div className="left-[16px] top-[0px] relative text-neutral-500 text-sm font-normal font-['Roboto']">Booking ID: 123456789</div>
          <div className="left-[16px] top-[50px] relative text-neutral-500 text-xs font-bold font-['Roboto']">DATE</div>
          <div className="left-[219px] top-[36px] relative text-neutral-500 text-xs font-bold font-['Roboto']">PICK-UP TIME</div>
          <div className="left-[16px] top-[34px] relative text-neutral-500 text-xs font-normal font-['Roboto']">21st Sept 2021, Monday</div>
          <div className="left-[219px] top-[17px] relative text-neutral-500 text-xs font-normal font-['Roboto']">9:00-9:30am</div>
          <div className="px-[4px] py-px left-[245px] top-[-116px] relative bg-emerald-500 bg-opacity-10 rounded border border-green-600 justify-start items-start gap-2.5 inline-flex">
            <div className="text-green-600 text-[10px] font-bold font-['Roboto']">CONFIRMED</div>
          </div>
          <hr className="mt-1" /> 
          <div>
            <button className="left-[50px] top-[15px] relative text-green-500 text-sm font-bold font-['Roboto']" onClick={() => console.log('Call button clicked')}>CALL</button>
            <button className="left-[190px] top-[16px] relative text-red-500 text-sm font-bold font-['Roboto']" onClick={handleCancel}>CANCEL</button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center top-[-350px] left-[-190px]">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50"></div>
          <div className="bg-black p-6 rounded-lg z-10">
            <p>Are you sure you want to cancel?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleConfirmCancel}>Yes, Cancel</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleCancelModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;
