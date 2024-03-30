import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocation, useNavigate } from 'react-router-dom';
const Footer = () => {

  const curLocation = useLocation().pathname;
  const nav = useNavigate();
  const style = ' text-black'
  return (
    <>
    {curLocation !== '/mode' && curLocation !== '/login' && (
    <div className='flex  w-full text-gray-500 justify-around  font-semibold py-2 text-center '>
      <div className={curLocation === '/home' ? style:''}>
      <button onClick={()=>{nav('/home')}}> <HomeIcon sx={{ fontSize: 30 }}/>
        <p>Home</p></button>
      </div>
      <div className={curLocation === '/vehicles' ? style:''}>
        <button onClick={()=>{nav('/vehicles')}}><DirectionsCarIcon sx={{ fontSize: 30 }}/>
        <p>Vehicle</p></button>
      </div>
      <div className={curLocation === '/records' ? style:''}>
        <button onClick={()=>{nav('/records')}}><DescriptionIcon sx={{ fontSize: 30 }}/>
        <p>Records</p></button>
      </div>
    </div>)
    }
    </>
  )
}

export default Footer