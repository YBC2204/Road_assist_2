import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../helper/SupaClient";



const Login = () => {
  const nav = useNavigate();

  useEffect(()=>{
    supabase.auth.onAuthStateChange(async (event) =>{
      console.log(event);
            if(event !== "SIGNED_IN")
            {
               nav("/")
            }
            else{
                nav("/mode")
            }
        })
  },[nav])


  return (
    <div className="p-5   bg-gray-800 h-screen flex flex-col justify-center">
      <div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
        />
      </div>
    </div>
  );
};

export default Login;
