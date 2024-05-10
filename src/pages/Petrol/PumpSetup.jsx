import { Checkbox } from '@mui/material';
import logo from '../../assets/ASSIST2.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import supabase from '../../helper/SupaClient';
import { useStatusContext } from '../../Context/StatusContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PumpSetup = () => {

  var divclass = "relative z-0 w-full mb-5 group";
  var labelclass = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  var inputclass = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  var emailclass = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  
  const nav = useNavigate();

  const[name,setName] =useState('');
  const[company,setCompany] =useState('');
  const[reg,setReg] =useState('');
  const[owner,setOwner] =useState('');
  const[email,setEmail] =useState('');
  const[num,setNum] =useState('');
  const [addr,setAddr] = useState('');
  const [lat,setLat] = useState('');
  const [long,setLong] = useState('');
  const [del,setDel] = useState(true);
  const { logid } = useStatusContext();
  const [lid, setLid] = logid;

 
  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('Pump_det')
        .insert([
          {
            id: lid, // Ensure that lid contains the correct value
            Company: company,
            Reg_num: reg,
            Owner: owner,
            email: email,
            phno: num,
            Address: addr,
            latitude: lat,
            long: long,
            pump_name: name,
          },
        ]);
        
      if (error) {
        console.error('Error inserting data into Pump_det:', error.message);
        return;
      }
  
      console.log('Data inserted into Pump_det successfully:', data);
      nav('/petrol_home'); // Navigate after successful insertion
    } catch (error) {
      console.error('Error handling submit:', error.message);
    }
  };
  


  return (
    <div className='flex flex-col text-slate-300 bg-gradient-to-br from-gray-800 items-center relative'>
    <ArrowBackIcon className='absolute left-1 top-3' onClick={()=>nav('/petrol_home')}
    />
       <div > 
         <img src={logo} className='w-40 mt-5' onClick={()=> nav('/petrol_home')}/>
       </div>
       <div>
        <p className='text-2xl font-bold mt-4 text-white'>PUMP SETUP</p>
       </div>
       
      
   <div className='mt-4 px-4'>    
    <div className={divclass}>
        <input type="text"   className={inputclass} placeholder="" required value={name} onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="floating_first_name" className={labelclass}>Pump Name</label>
    </div>
   
    <div className={divclass}>
        <input type="text" name="floating_company" id="floating_company" className={inputclass} placeholder=" " required value={company} onChange={(e)=>setCompany(e.target.value)}/>
        <label htmlFor="floating_company" className={labelclass}>Company (Ex.Bharat Petroleum )</label>
    </div>
    
    <div className={divclass}>
        <input type="tel" pattern="[0-9]{2}/[0-9]{3}/[0-9]{6}" name="floating_phone" id="floating_phone" className={inputclass} placeholder=" " required value={reg} onChange={(e)=>setReg(e.target.value)}/>
        <label htmlFor="floating_phone" className={labelclass}>Reg. Number(XX/XXX/XXXXXX)</label>
    </div>

    <div className={divclass}>
        <input type="text" name="floating_last_name" id="floating_last_name" className={inputclass} placeholder=" " required value={owner} onChange={(e)=>setOwner(e.target.value)}/>
        <label htmlFor="floating_last_name" className={labelclass}>Owner name</label>
    </div>

  <div className={divclass}>
      <input type="email" name="floating_email" id="floating_email" className={inputclass} placeholder=" " required value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <label htmlFor="floating_email" className={emailclass}>Email address</label>
  </div>

  <div className={divclass}>
        <input type="tel" pattern="^\+91 [0-9]{10}$" name="floating_phone" id="floating_phone" className={inputclass} placeholder=" " required value={num} onChange={(e)=>setNum(e.target.value)}/>
        <label htmlFor="floating_phone" className={labelclass}>Phone number (+91 XXXXXXXXXX)</label>
  </div>

  <div className={divclass}>
        <input type="text" name="floating_last_name" id="floating_last_name" className={inputclass} placeholder=" " required value={addr} onChange={(e)=>setAddr(e.target.value)}/>
        <label htmlFor="floating_last_name" className={labelclass}>Address</label>
  </div>
  <div className="grid grid-cols-2 gap-2">
    <div className={divclass}>
        <input type="text" name="floating_first_name" id="floating_first_name" className={inputclass} placeholder=" " required value={lat} onChange={(e)=>setLat(e.target.value)}/>
        <label htmlFor="floating_first_name" className={labelclass}>Latitude</label>
    </div>
    <div className={divclass}>
        <input type="text" name="floating_last_name" id="floating_last_name" className={inputclass} placeholder=" " required value={long} onChange={(e)=>setLong(e.target.value)}/>
        <label htmlFor="floating_last_name" className={labelclass}>Longitude</label>
    </div>
  </div>

 <div className='text-gray-400 mb-2'>
 Will You Provide Delivery partner<Checkbox  defaultChecked onClick={()=>setDel(!del)}/>
 </div>

  {/* <div>
     
     <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-300 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
     <div className="mt-2 mb-4 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help"> Please upload a copy of your petrol pump license for verification  </div>
</div> */}

  
  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-8" onClick={handleSubmit}>Submit</button>

         
  </div>      
       
    </div>
  )
}

export default PumpSetup

