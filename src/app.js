import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Activities from "./components/Activities";
import Login from "./components/Login";
import MyRoutines from "./components/MyRoutines";
import Routines from "./components/routines";
import RegistrationPage from "./components/Register";
import MyProfile from "./components/MyProfile";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  const handleSetUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const handleSetToken = (newToken) => {
    setToken(newToken);
  };

  return (
<Router>
  <nav className="navbar navbar-expand-lg navbar-dark bg-secondary justify-content-between">
    <Link className="navbar-brand text-white" to="/register">FitnessTrackr</Link>

    <div className="d-flex gap-3">
      <Link className="btn btn-outline-light" to="/activities">Activities</Link>
      <Link className="btn btn-outline-light" to="/login">Login</Link>
      <Link className="btn btn-outline-light" to="/my-profile">My Profile</Link>
      <Link className="btn btn-outline-light" to="/my-routines">My Routines</Link>
      <Link className="btn btn-outline-light" to="/routines">Routines</Link>
      <Link className="btn btn-outline-light" to="/register">Register</Link>
    </div>
  </nav>

      <Routes>
        <Route
          path="/"
          element={<Activities username={username} token={token} />}
        />
        <Route
          path="/activities"
          element={<Activities username={username} token={token} />}
        />
        <Route
          path="/login"
          element={
            <Login
              handleToken={handleSetToken}
              handleUsername={handleSetUsername}
            />
          }
        />
        <Route
          path="/my-profile"
          element={<MyProfile username={username} token={token} />}
        />
        <Route
          path="/my-routines"
          element={<MyRoutines username={username} token={token} />}
        />
        <Route
          path="/routines"
          element={<Routines username={username} token={token} />}
        />
        <Route
          path="/register"
          element={<RegistrationPage username={username} token={token} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
