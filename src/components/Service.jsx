import React, { useState } from 'react';

const Service = ({ onCancel }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleCall = () => {
    // Function logic for the CALL button
  };

  const handleCancelModal = () => {
    setIsCancelModalOpen(true); // Open the cancel modal
  };

  const handleCancelConfirm = () => {
    // Function logic for confirming cancel action
    setIsCancelModalOpen(false); // Close the cancel modal after confirming
    onCancel(); // Call the onCancel callback
  };

  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false); // Close the cancel modal without confirming
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[328px] bg-white rounded-lg shadow p-5 mr-auto">
        {/* Service content */}
        <div className="text-center mb-4">
          <div className="text-zinc-700 text-base font-bold font-['Roboto']">Basic Service</div>
          <div className="text-zinc-700 text-base font-bold font-['Roboto']">General Motors</div>
        </div>
        <div className="text-neutral-500 text-sm font-normal font-['Roboto'] mb-4">
          <span className="mr-2">Booking ID:</span>
        </div>
        <div className="flex justify-between text-neutral-500 text-xs font-bold font-['Roboto'] mb-4">
          <span>DATE:</span>
        </div>
        <div className="flex justify-between text-neutral-500 text-xs font-bold font-['Roboto'] mb-4">
          <span>PICK-UP TIME:</span>
        </div>
        <div className="text-black-600 text-[15px] font-bold font-['Roboto'] mb-4">CONFIRMED</div>
        <div className="flex justify-between">
          <div>
            <button className="text-green-600 text-sm font-bold font-['Roboto'] mr-20" onClick={handleCall}>CALL</button>
            <button className="text-gray-500 text-sm font-bold font-['Roboto'] ml-12" onClick={handleCancelModal}>CANCEL</button>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4">
            <div className="text-lg mb-2">Are you sure you want to cancel this?</div>
            <div className="flex justify-end">
              <button className="text-gray-600 text-sm font-bold font-['Roboto'] mr-3" onClick={handleCancelModalClose}>No</button>
              <button className="text-green-600 text-sm font-bold font-['Roboto']" onClick={handleCancelConfirm}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;

