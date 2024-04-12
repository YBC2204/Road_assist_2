/* eslint-disable no-unused-vars */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStatusContext } from '../Context/StatusContext';
import { Login } from '@mui/icons-material';
import supabase from '../helper/SupaClient';
import { useModalContext } from '../Context/Modalcon';

const Header = () => {
  
  const { showmod, selcar, selcol, plate, setplate, setdet , setcol, showamt, showfuel, setamt, settype,setmode,setmail } = useModalContext();
  const curLocation = useLocation().pathname;
 const {stat} = useStatusContext();
 const [status,setStatus] = stat;
  const nav= useNavigate();
console.log(status);
  const isLoggedIn = status === 'SIGNED_IN';
 
  const[mailid,setmailid] = setmail;
  async function signOut()
  {
    const { error } = await supabase.auth.signOut();
    setmailid(null);
    nav("/");
  }
  const handlelog = ()=>
  {
    
   if(isLoggedIn )
   {
     signOut(); 
  }
   else{
   
     nav('/login')
   }
  }

  return (
    <>
      {curLocation !== '/' && curLocation !== '/login' &&(
        <div className='flex bg-black justify-between'>
          <div className='flex flex-col p-3'>
            <div className="text-gray-300 font-bold text-md">
              <p>Hello&nbsp;<span>Kamal</span></p>
            </div>
            <div className="text-gray-500 text-sm font-semibold">
              <p>Kollam, Kerala</p>
            </div>
          </div>
          <div className="flex items-center">

            <div className='text-slate-300' onClick={()=>nav('/profile')}><AccountCircleIcon fontSize='large'/></div>

            <div className='p-2 '>
              <button className=' border-slate-300 border-2 text-gray-300 bg-black px-3 py-2 rounded-xl font-semibold' onClick={handlelog}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
