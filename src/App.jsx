import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Mode from "./pages/Mode";
import Records from "./pages/Records";
import Nearby from "./pages/Nearby";
import FuelAmount from "./components/Modals/FuelAmount";

import Vehicle from "./pages/Vehicle";

import Enterdetails from "./pages/Enterdetails";

import EditModal from "./components/Modals/EditModal";


import EditDetails from "./pages/Editdetails";
import Petrolhome from "./pages/Petrol/Petrolhome";
import PumpSetup from "./pages/Petrol/PumpSetup";
import Loc from "./pages/loc";
import Req from "./pages/Petrol/Pumprequests";
import Record from "./pages/Petrol/Record";
import OrderConfirmationPage from "./pages/Order";
import Loader from "./components/Loader";
function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black font-source">
      <BrowserRouter>
        <Header/>
        <Routes>
        <Route path='/mode' element={<Mode />} />
        <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path='/records' element={<Records />} />
          <Route path='/nearby' element={<Nearby />} />
          <Route path='/profile' element={<Enterdetails />} />

          <Route path='/vehicles/edit' element={<EditModal/>}/>
          <Route path='/order' element={<OrderConfirmationPage />} />

          <Route path='/editdet' element={<EditDetails />} />
          <Route path="/petrol_home" element={<Petrolhome/>}/>
          <Route path="/pumpsetup" element={<PumpSetup/>}/>
          <Route path="/loc" element={<Loc/>}/>
          <Route path="/pump_req" element={<Req/>}/>
          <Route path="/pump_rec" element={<Record/>}/>
          <Route path="/load" element={<Loader/>}/>
        </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;
