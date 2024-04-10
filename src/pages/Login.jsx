import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../helper/SupaClient";
import { useStatusContext } from "../Context/StatusContext";
import { useModalContext } from "../Context/Modalcon";
import logo from '../assets/logo.png'

const Login = () => {
  const nav = useNavigate();
  const { stat } = useStatusContext();
  const { setmode, setmail } = useModalContext();
  const [status, setStatus] = stat;
  const [selectedmode, setselectedmode] = setmode;
  const [mailid, setmailid] = setmail; // State to store email ID

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setStatus(event);

      if (event === "SIGNED_IN" && session?.user?.email) {
        // Store the user's email ID in state
        setmailid(session.user.email);
        console.log(mailid); // This might show the previous value due to closure
        nav("/home");
      }

      if (event !== "SIGNED_IN") {
        nav("/login");
      }
    });
  }, [mailid,nav,setmailid,setStatus]);

  return (
    <div className="p-5 bg-gray-800 h-screen flex flex-col justify-center">
    <div className="flex w-full justify-center"><img src={logo}/></div>
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
