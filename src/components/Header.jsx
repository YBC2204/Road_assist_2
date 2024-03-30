import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const supabase = createClient(
  "https://hxlkvldqxjraxxyrxbld.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bGt2bGRxeGpyYXh4eXJ4YmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNTY5MzEsImV4cCI6MjAyNDkzMjkzMX0.ZNCPfCUQj_Vqv-WCX2tj6GEuE7ZDGwMgFc69zLZKhgM"  
);

const Header = () => {
  const [status, setStatus] = useState('');
  const curLocation = useLocation().pathname;

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const user = supabase.auth.user();
      if (user) {
        setStatus('Logout');
      } else {
        setStatus('Login');
      }
    };
    fetchAuthStatus();
  }, []);

  const isLoggedIn = status === 'Logout';

  return (
    <>
      {curLocation !== '/mode' && curLocation !== '/' &&(
        <div className='flex bg-white justify-between'>
          <div className='flex flex-col p-3'>
            <div className="text-black font-bold text-md">
              <p>Hello&nbsp;<span>Kamal</span></p>
            </div>
            <div className="text-gray-500 text-sm font-semibold">
              <p>Kollam, Kerala</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className='text-black '><AccountCircleIcon fontSize='large'/></div>
            <div className='p-2'>
              <button className='text-white bg-black px-3 py-2 rounded-xl font-semibold'>
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
