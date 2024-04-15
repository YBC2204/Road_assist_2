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


function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black font-source">
      <BrowserRouter>
        <Header/>
        <Routes>

        <Route path='/' element={<Mode />} />
          <Route path='/login' element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path='/records' element={<Records />} />
          <Route path='/nearpumps' element={<Nearby />} />
          <Route path='/profile' element={<Enterdetails />} />
          <Route path='/vehicles/edit' element={<EditModal/>}/>
        </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;
