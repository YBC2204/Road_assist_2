import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../helper/SupaClient";
import { useStatusContext } from "../Context/StatusContext";
import { useModalContext } from "../Context/Modalcon";

import logo from '../assets/ASSIST2.png';

const Login = () => {
  const nav = useNavigate();
  const { stat } = useStatusContext();
  const { setmode, setmail, setloc } = useModalContext();
  const [status, setStatus] = stat;
  const [loc, setLoc] = setloc; // State to store the signed in status
  
  const [mailid, setmailid] = setmail; // State to store email ID
  const [userMode, setUserMode] = useState(null); // State to store the mode fetched from logintrial
  
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setStatus(event);

      if (event === "SIGNED_IN" && session?.user?.email) {
        // Store the user's email ID in state
        setmailid(session.user.email);
        setLoc(1); // Set loc to 1 when signed in
       
        
        // const { data: loginData, error: loginError } = await supabase
        //   .from("logintrial")
        //   .select("mode")
        //   .eq("email_id", session.user.email)
        //   .single();

        // if (loginError) {
        //   console.error("Error fetching mode:", loginError.message);
        //   return;
        // }

        // if (loginData) {
        //   setUserMode(loginData.mode); // Set the mode fetched from logintrial
        //   console.log("User mode:", loginData.mode);
        //   console.log("Selected mode:", selectedmode);
        //   if (loginData.mode !== selectedmode) {
        //     alert(`You are not the ${selectedmode} user.`)
        //     nav("/login"); // Navigate to login if the modes are not the same
        //     return;
        //   }
        // }

        nav("/mode");
      } else {
        setLoc(0); // Set loc to 0 when signed out
        nav("/login");
      }
    });
    console.log(loc);
  }, [mailid, nav, setmailid, setStatus,  setLoc]);

  return (


    <div className="p-5 bg-slate-950 h- flex flex-col justify-center">
        <div className="flex justify-center">
           <img className="w-2/4" src={logo} />
           </div>
      <div
        className="w-[80%] mx-auto bg-slate-200 bg-opacity-15 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg py-6 px-4"
      >
        


        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
          className="p-4"
        />
      </div>
    </div>
  );
};

export default Login;
