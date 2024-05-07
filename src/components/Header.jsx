import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../helper/SupaClient';
import { useStatusContext } from '../Context/StatusContext';
import { useModalContext } from '../Context/Modalcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {

  const { showmod, selcar, selcol, plate, setplate, setdet, setcol, showamt, showfuel, setamt, settype, setmode, setmail, setloc, setusername } = useModalContext();

  const curLocation = useLocation().pathname;
  const [loc, setLoc] = setloc;
  const { stat,logid,user } = useStatusContext();
  const [status, setStatus] = stat;
  const nav = useNavigate();
  const[name1,setname]=user;
  const isLoggedIn = status === 'SIGNED_IN';
  const [mailid, setMailId] = setmail;

  const [selectedmode, setSelectedMode] = setmode;
  const [username, setUsername] = useState(''); // State to store the username
  const [name, setName] = setusername;
  const [refreshCount, setRefreshCount] = useState(0);
  
  useEffect(() => {
    console.log(loc);
    async function fetchUserData() {
      try {
        const { data, error } = await supabase
          .from('user')
          .select('username')
          .eq('email', mailid)
          .single();
        if (error) {
          setUsername(''); // Set the username if found
          setName(''); 
          throw error;
          
        }
        if (data) {
          setUsername(data.username); // Set the username if found
          setName(data.username); // Also set the username to update the UI
        }
        else
        {
          setUsername(''); // Set the username if found
          setName(''); 
        }
         
      } catch (error) {
        console.error('Error fetching user data:', error.message);

      }
    }

    if (isLoggedIn) {
      fetchUserData();
      fetchUserData();  // Fetch user data if logged in
    } else {
      setUsername(''); // Reset username if logged out
      setName(''); // Reset name if logged out
    }
  }, [isLoggedIn, mailid, refreshCount]); // Fetch user data when login status, mailid, or refreshCount changes

  useEffect(() => {
    // Call the refreshHeaderTwice function when the component mounts
    refreshHeaderTwice();
  }, []); // Empty dependency array to run once when component mounts

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setMailId(null);

    setUsername(''); // Reset username on logout

    setName(''); // Reset name on logout
    setname(null);
    nav("/");
  }

  const handleLog = () => {
    if (isLoggedIn) {

      signOut(); 

    } else {
      nav('/login');
    }
  }
  
  // Function to refresh the header twice
  const refreshHeaderTwice = () => {
    setRefreshCount(refreshCount + 1);
    setRefreshCount(refreshCount + 1);
  };
  if (curLocation === '/login' || curLocation === '/mode') {
    return null; // Return null to hide the footer on the '/login' and '/' pages
  }
  return (
    <>
      {curLocation !== '/' && curLocation !== '/login' && curLocation !=='/pump_rec' && curLocation !=='/pump_req' && curLocation !=='/pumpsetup' && (
        <div className='flex bg-black justify-between'>
          <div className='flex flex-col p-3'>
            <div className="text-gray-300 font-bold text-md" onClick={() => nav('/profile')}>
              <p>{isLoggedIn && name1 ? `Hello, ${name1.split(' ')[0]}` : username ? `Hello, ${username.split(' ')[0]}` : 'Add Your Profile'}</p>
            </div>

            <div className="text-gray-500 text-sm font-semibold">
              <p>{selectedmode}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className='text-slate-300' onClick={() => nav('/editdet')}><AccountCircleIcon fontSize='large' /></div>
            <div className='p-2 '>
              <button className=' border-slate-300 border-2 text-gray-300 bg-black px-3 py-2 rounded-xl font-semibold' onClick={handleLog}>

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
