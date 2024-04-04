import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../helper/SupaClient";

import { useStatusContext } from "../Context/StatusContext"



const Login = () => {
  
 // useEffect(()=>{
    const nav = useNavigate();
 // }) 
   
  const {stat} = useStatusContext();


  const [status,setStatus] = stat;
  
    supabase.auth.onAuthStateChange(async (event) =>{
     
      setStatus(event);
            if(event !== "SIGNED_IN")
            {
               nav("/login")
            }
            else{
                nav("/home")
            }
        })
 



  return (
    <div className="p-5 bg-white-gradient h-screen flex flex-col justify-center">
      <div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={["google"]}
        />
      </div>
    </div>
  );
};

export default Login;
