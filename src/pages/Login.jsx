import { createClient } from "@supabase/supabase-js"
import { Auth} from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";


const supabase = createClient(
    "https://hxlkvldqxjraxxyrxbld.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bGt2bGRxeGpyYXh4eXJ4YmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNTY5MzEsImV4cCI6MjAyNDkzMjkzMX0.ZNCPfCUQj_Vqv-WCX2tj6GEuE7ZDGwMgFc69zLZKhgM"  
    );



const Login = () => {

   const nav = useNavigate();

    supabase.auth.onAuthStateChange(async (event) =>{

        if(event !== "SIGNED_IN")
        {
           nav("/")
        }
        else{
            nav("/mode")
        }
    })

  return (
    
    <div className="p-5   bg-gray-800 h-screen flex flex-col justify-center">
        <div>
        <Auth
            supabaseClient={supabase}
            appearance={{theme: ThemeSupa}}
            theme="dark"
            providers={["google"]}
        />
        </div>
    </div>
    
  )
}

export default Login