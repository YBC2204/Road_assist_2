import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../helper/SupaClient';
import { useNavigate } from 'react-router-dom';
import { useStatusContext } from '../Context/StatusContext';

const PetrolPumpCard = ({ key, name, address, company, phone, distance, orderno, uid, pid }) => {
  const [availability, setAvailability] = useState(true); // State to track availability
  const navigate = useNavigate();


  const {oid} = useStatusContext();
  const[orderid,setOrderid] = oid;
  const nav = useNavigate();

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data, error } = await supabase
          .from('Pump_avail')
          .select('Availability')
          .eq('id', pid)
          .single();


        if (error) {
          throw error;
        }

        if (data) {
          setAvailability(data.Availability); // Update availability based on fetched data
        }
      } catch (error) {
        console.error('Error fetching availability:', error.message);
      }
    };

    fetchAvailability();
  }, [pid]);

  const handleSubmit = async () => {
    // If availability is false, don't proceed
    if (!availability) {
      alert('This pump is currently unavailable.');
      return;

  }
  if(data)
    {
      setOrderid(orderno);
      console.log('success');
      nav('/load')

    }

    // Show confirmation dialog before proceeding
    const confirmSelect = window.confirm('Are you sure you want to select this pump?');

    if (confirmSelect) {
      try {
        // Insert data into Order_assign table
        const { data, error } = await supabase.from('Order_assign').insert([
          {
            order_id: orderno,
            user_id: uid,
            pump_id: pid
          }
        ]);

        if (error) {
          throw error;
        }

        if (data) {
          console.log('Order assigned successfully:', data);
          navigate('/order');
        }
      } catch (error) {
        console.error('Error assigning order:', error.message);
      }
    }
  };

  if (!availability) {
    return null; // If pump is unavailable, don't render the card
  }

  return (
    <div className="w-[85%] bg-slate-300 rounded-[20px] flex flex-col items-center my-4 shadow-md aspect-w-3 aspect-h-4 relative py-3 px-[10px]">
      <div className="font-bold uppercase text-[17px]  text-center">{name}</div>
      <div className="font-semibold text-[17px] underline">{company}</div>
      <div className="mt-2 font-semibold">{phone}</div>
      <div className="font-semibold text-center">{address}</div>
      <div className="font-semibold">Approx. Dist -->{distance}</div>
      <button className="border-[5px] px-2 py-1 font-[500] uppercase mt-3 border-gray-800 rounded-xl bg-gray-700 text-slate-200" onClick={handleSubmit}>Select</button>
    </div>
  );
};

export default PetrolPumpCard;
