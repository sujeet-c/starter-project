import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Intake from "./pages/Intake";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RequireRole from './components/RequireRole';
import RequireRegistration from './components/RequireRegistration';


function App() {
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/intake" element={<RequireRegistration><Intake /></RequireRegistration>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
