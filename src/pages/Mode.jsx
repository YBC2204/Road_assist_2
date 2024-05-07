import logo from '../assets/ASSIST2.png';
import { useNavigate } from "react-router-dom";
import { useModalContext } from '../Context/Modalcon';

import supabase from '../helper/SupaClient';
import { useStatusContext } from '../Context/StatusContext';
const Mode = () => {
    const nav = useNavigate();
    const {setmode,setmail } = useModalContext();
    const{logid} = useStatusContext();
    const [selectedmode, setselectedmode] = setmode;
    const [mailid, setmailid] = setmail;
    const [lid,setlid] = logid; 
    
    const handleModeSelect = async (mode) => {
        setselectedmode(mode); // Update selected mode
        console.log("Selected Mode:", mode); // Log selected mode

        // mode === 'Client'? nav('/home'): nav('/petrol_home'); // Navigate to the appropriate page

          
        const { data: loginData, error: loginError } = await supabase
          .from("logintrial")
          .select("*")
          .eq("email_id", mailid)
          .single();

        if (loginError) {
          console.error("Error fetching mode:", loginError.message);
        if(mode=="Petrol Pump")
          nav('/petrol_home')
        else
          nav('/home');
        }

        if (loginData) {
        //   setUserMode(loginData.mode); // Set the mode fetched from logintrial
          setlid(loginData.id);
          console.log("User mode:", loginData.mode);
          console.log("Selected mode:", mode);
          if (loginData.mode !== mode) {
            nav("/mode"); 
            alert(`You are not the ${mode} user.`)
            // Navigate to login if the modes are not the same
            return;
          }
          if(mode=="Petrol Pump" && loginData)
          nav('/petrol_home')
        else
          nav('/home');
        }

    };

    return (
        <div className="w-full h- bg-slate-950">
            <div className='flex flex-col items-center '>
                <img className="w-3/5" src={logo} />
                <div className="text-slate-300 font-bold font-ibm leading-10 text-xl">How do you want to continue?</div>
            </div>

            <div className='flex flex-col items-center text-center gap-6 mt-10 text-white pb-10'>
                <button className="w-3/4 h-32 rounded-xl bg-gray-800 flex justify-center items-center font-semibold text-xl uppercase" onClick={() => handleModeSelect("Client")}>Client</button>
                <button className='w-3/4 h-32 rounded-xl bg-gray-800 flex justify-center items-center font-semibold text-xl uppercase' onClick={() => handleModeSelect("Petrol Pump")}>Petrol Pump</button>
                <button className='w-3/4 h-32 rounded-xl bg-gray-800 flex justify-center items-center font-semibold text-xl uppercase' onClick={() => handleModeSelect("Delivery Partner")}>Delivery Partner</button>
            </div>
        </div>
    );
}

export default Mode;
