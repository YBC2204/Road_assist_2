import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStatusContext } from '../Context/StatusContext';

const Footer = () => {
  const curLocation = useLocation().pathname;
  const nav = useNavigate();
  const style = 'text-gray-300';
  const { stat } = useStatusContext();
  const [status, setStatus] = stat;
  const isLoggedIn = status === 'SIGNED_IN';

  const handleNavigate = (path) => {
    if (isLoggedIn) {
      nav(path);
    } else {
      nav('/login');
    }
  };

  // Check if the current location is '/login' or '/'
  if (curLocation === '/login' || curLocation === '/') {
    return null; // Return null to hide the footer on the '/login' and '/' pages
  }

  return (
    <div className='bg-black'>
      <div className='flex w-full text-gray-500 justify-around font-semibold py-2 text-center'>
        <div className={curLocation === '/home' ? style : ''}>
          <button onClick={() => handleNavigate('/home')}>
            <HomeIcon sx={{ fontSize: 30 }} />
            <p>Home</p>
          </button>
        </div>
        <div className={curLocation === '/vehicles' ? style : ''}>
          <button onClick={() => handleNavigate('/vehicles')}>
            <DirectionsCarIcon sx={{ fontSize: 30 }} />
            <p>Vehicle</p>
          </button>
        </div>
        <div className={curLocation === '/records' ? style : ''}>
          <button onClick={() => handleNavigate('/records')}>
            <DescriptionIcon sx={{ fontSize: 30 }} />
            <p>Records</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
