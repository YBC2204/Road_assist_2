import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Mode from "./pages/Mode";
import Test from "./pages/Test";
import Records from "./pages/Records";
import Nearby from "./pages/Nearby";

function App() {

  
  
   
   
   // const isModeRoute = location.pathname === "/mode";
  
 

  return (
    <div className="min-h-screen w-fullflex flex-col bg-white text-black font-source">
      <BrowserRouter>
       
        
        <Header/>
        <Routes>
        
          <Route path='/' element={<Login />} />
          <Route path="/mode" element={<Mode />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home_test' element={<Test />} />
          <Route path='/records' element={<Records />} />
          <Route path='/nearpumps' element={<Nearby />} />
        </Routes>
        
       <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
