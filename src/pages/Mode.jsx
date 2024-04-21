import logo from '../assets/ASSIST2.png';
import { useNavigate } from "react-router-dom";
import { useModalContext } from '../Context/Modalcon';

const Mode = () => {
    const nav = useNavigate();
    const { showmod, selcar, selcol, plate, setplate, setcol, showamt, showfuel, setamt, settype, setmode } = useModalContext();
    const [selectedmode, setselectedmode] = setmode;

    const handleModeSelect = (mode) => {
        setselectedmode(mode); // Update selected mode
        console.log("Selected Mode:", mode); // Log selected mode
        mode === 'Client'? nav('/home'): nav('/petrol_home'); // Navigate to the appropriate page
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
