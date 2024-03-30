import logo from '../assets/logoroadassist.png'
import { createClient } from "@supabase/supabase-js"
import { Auth} from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';


const supabase = createClient(
    "https://hxlkvldqxjraxxyrxbld.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bGt2bGRxeGpyYXh4eXJ4YmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNTY5MzEsImV4cCI6MjAyNDkzMjkzMX0.ZNCPfCUQj_Vqv-WCX2tj6GEuE7ZDGwMgFc69zLZKhgM"  
    );

const Mode = () => {

    const[user,setUser]= useState({});
    const nav = useNavigate();

    useEffect(() =>{
        async function getuserData()
        {
            await supabase.auth.getUser().then((value) =>{
                
                if(value.data?.user)
                {
                   console.log(value.data.user);
                    setUser(value.data.user);
                }
            })
        }
        getuserData();
    },[]);


    return (

    <div className="w-full h-[100vh]  bg-white">
       
       <div className='flex flex-col items-center mt-4'>
       <img className="w-3/4" src={logo} />
       
       <div className=" text-black  font-bold font-ibm leading-10 text-xl">How do you want to continue?</div>
       
       
       </div>  

       <div className='flex flex-col items-center text-center gap-8 mt-10 text-white'>
       
       <button className="w-3/4 h-24 rounded-xl bg-gray-700 flex justify-center items-center font-semibold text-xl uppercase" onClick={()=>{nav('/home')}}>Client</button>
        <button className='w-3/4 h-24 rounded-xl bg-gray-700 flex justify-center items-center font-semibold text-xl uppercase' onClick={()=>{nav()}}>Petrol Pump</button>
        <button className='w-3/4 h-24 rounded-xl bg-gray-700 flex justify-center items-center font-semibold text-xl uppercase' onClick={()=>{nav()}}>Delivery Partner</button>
       </div> 
  </div>

      
    )
  }
  
  export default Mode