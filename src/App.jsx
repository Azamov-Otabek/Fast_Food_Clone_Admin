import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Verification from "./components/Auth/Verification/Verification";
import Workers from "./pages/Workers/Workers";

const App = () => {
  return (
    <div className="main__container">
      <div className="main__sidebar">
      </div>
      <div className="main__section">
        <Routes>
          <Route path="/" element={<Auth/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="workers" element={<Workers/>}/>
          <Route path="verify" element={<Verification/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
