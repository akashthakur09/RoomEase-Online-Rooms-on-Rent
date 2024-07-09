import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


import React from 'react';
import '../src/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginLandlord from './components/Auth/Login/landlord';
import Homepage from './components/Pages/homePage';
// import LoginUser from './components/Auth/Login/tenant';
import LoginPage from './components/Auth/Login/Login';
import RegisterUser from './components/Auth/Register/Register'; 
// import RegisterLandlord from './components/Auth/Register/landlordRegister';
import RoomSearch from './components/Pages/RoomSearch'
import UserProfile from './components/Auth/Profile/tenantProfile';
import LandlordDashboard from './components/Auth/Profile/landlordProfile';
import UpdateRoom from './components/Pages/updateRoom';
import RoomRequests from './components/Pages/roomRequests.jsx';
import AddRoom from './components/Pages/addRoom.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/signup" element={<RegisterUser />} /> 

        {/* Protected Routes */}
        <Route path="/tenantProfile" element={<UserProfile />} />
        <Route path="/landlordProfile" element={<LandlordDashboard />} />
        <Route path="/search" element={<RoomSearch />} />
        <Route path="/updateRoom" element={<UpdateRoom />} />
        <Route path="/roomRequests" element={<RoomRequests />} />
        <Route path="/addRoom" element={<AddRoom />} />
        {/* 654fd173ab76d6a714ad8527 */}
        
      </Routes>
    </Router>
  );
}

export default App;
