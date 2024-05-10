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
  
        // Check if the current location is not already /mode
        if (window.location.pathname == "/login" ) {
          nav("/mode"); // Navigate to /mode only if not already there
        }
      } else {
        setLoc(0); // Set loc to 0 when signed out
        nav("/login");
      }
    });
  }, [nav, setmailid, setStatus, setLoc]);
  

  return (
    <div className="p-5 bg-slate-950 h- flex flex-col justify-center h-[100vh] overflow-y-scroll">
      <div className="flex justify-center">
        <img className="w-2/4" src={logo} />
      </div>
      <div className="w-[80%] mx-auto bg-slate-200 bg-opacity-15 backdrop-blur-lg rounded-lg  shadow-lg py-6 px-4">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]} // Exclude all providers
          className="p-4"
        />
      </div>
    </div>
  );
};

export default Login;
