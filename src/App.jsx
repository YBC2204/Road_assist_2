import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Mode from "./pages/Mode";
import Records from "./pages/Records";
import Nearby from "./pages/Nearby";

import Vehicle from "./pages/Vehicle";

import Enterdetails from "./pages/Enterdetails";


function App() {
  return (
    <div className="min-h-screen w-fullflex flex-col bg-white text-black font-source">
      <BrowserRouter>
        <Header/>
        <Routes>

        <Route path='/' element={<Mode />} />
          <Route path='/login' element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path='/records' element={<Records />} />
          <Route path='/nearpumps' element={<Nearby />} />
          <Route path='/enterdetails' element={<Enterdetails />} />
        </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;
