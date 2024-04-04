import logo from '../assets/logoroadassist.png'
import { useNavigate } from "react-router-dom";


const Mode = () => {

    
    const nav = useNavigate();



    return (

    <div className="w-full h-[100vh]  bg-white">
       
       <div className='flex flex-col items-center mt-4 '>
       <img className="w-3/4" src={logo} />
       
       <div className=" text-black  font-bold font-ibm leading-10 text-xl">How do you want to continue?</div>
       
       
       </div>  

       <div className='flex flex-col items-center text-center gap-6 mt-10 text-white pb-10'>
       
       <button className="w-3/4 h-24 rounded-xl bg-gray-700 flex justify-center items-center font-semibold text-xl uppercase" onClick={()=>{nav('/home')}}>Client</button>
        <button className='w-3/4 h-24 rounded-xl bg-gray-700 flex justify-center items-center font-semibold text-xl uppercase' onClick={()=>{nav()}}>Petrol Pump</button>
        <button className='w-3/4 h-24 rounded-xl bg-gray-700 flex justify-center items-center font-semibold text-xl uppercase' onClick={()=>{nav()}}>Delivery Partner</button>
       </div> 
  </div>

      
    )
  }
  
  export default Mode