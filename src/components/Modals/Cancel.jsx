import React from 'react';

const Cancel = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-8">
            <div className="text-lg mb-4">Are you sure you want to cancel this?</div>
            <div className="flex justify-end">
              <button className="text-gray-500 text-sm font-bold font-['Roboto'] mr-4" onClick={onClose}>No</button>
              <button className="text-red-600 text-sm font-bold font-['Roboto']" onClick={onConfirm}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cancel;
