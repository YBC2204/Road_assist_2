import React from 'react';
import tickMark from '../assets/tick_mark.png'; 

const OrderConfirmationPage = () => {
  return (
    <div className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src={tickMark}
          alt="Tick Mark"
          className="mb-4"
          style={{ width: '130px', height: '130px' }} 
        />

        <h1 className="text-white text-3xl font-semibold mb-3">Your order is on the way!</h1>

        <p className="text-white text-lg mb-8">
          Estimated delivery time: <strong>10 minutes</strong>
        </p>

        <div className="flex flex-col items-center gap-6">
          {/* <button className="bg-green-500 hover:bg-green-700 text-white font py-2 px-6 rounded">
            Track My Order
          </button> */}

          <button className="bg-gray-500 hover:bg-gray-700 text-white font py-2 px-8 rounded">
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;


