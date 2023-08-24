import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Activities from './components/Activities';
import Login from './components/Login';
import MyRoutines from './components/MyRoutines';
import Routines from './components/routines';
import RegistrationPage from './components/Register';
import MyProfile from './components/MyProfile';

const App = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState("");

  const handleSetUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const handleSetToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">App Name</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/my-profile">My Profile</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/my-routines">My Routines</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/routines">Routines</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/activities" element={<Activities username={username} token={token} />} />
        <Route path="/login" element={<Login handleToken={handleSetToken} handleUsername={handleSetUsername} />} />
        <Route path="/my-profile" element={<MyProfile username={username} token={token} />} />
        <Route path="/my-routines" element={<MyRoutines username={username} token={token} />} />
        <Route path="/routines" element={<Routines username={username} token={token} />} />
        <Route path="/register" element={<RegistrationPage username={username} token={token} />} />
      </Routes>
    </Router>
  ); 
};

export default App;
