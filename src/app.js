import React, { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Activities from './components/Activities';
import Login from './components/Login';
import MyRoutines from './components/MyRoutines';
import Routines from './components/routines';
import RegistrationPage from './components/Register';
import MyProfile from './components/MyProfile';

const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const handleSetUsername = (newUsername) => {
    setUsername(newUsername);
    console.log("Received username:", newUsername);
  };

  const handleSetToken = (newToken) => {
    setToken(newToken);
    console.log("newToken:", newToken);
  };

    return (
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/activities">Activities</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/MyProfile">My Profile</Link>
            </li>
            <li>
              <Link to="/MyRoutines">My Routines</Link>
            </li>
            <li>
              <Link to="/routines">Routines</Link>
            </li>
            <li>
              <Link to="/RegistrationPage">Registration</Link>
            </li>
         
          </ul>
        </nav>
        <Routes>
        <Route path="/activities" element={<Activities username={username} token={token} />} />
        <Route path="/Login" element={<Login handleToken={handleSetToken} handleUsername={handleSetUsername} />} />
        <Route path="/MyProfile" element={<MyProfile username={username} token={token} />} />
        <Route path="/MyRoutines" element={<MyRoutines username={username} token={token} />} />
        <Route path="/routines" element={<Routines username={username} token={token} />} />
        <Route path="/RegistrationPage" element={<RegistrationPage username={username} token={token} />} />
      </Routes>
      </BrowserRouter>
    ); 
  };

  export default App;