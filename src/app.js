import React from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Activities from './compenents/Activities';
import Login from './compenents/Login';
import MyRoutines from './compenents/myRoutines';
import Routines from './compenents/routines';


const App = () => {
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
              <Link to="/myRoutines">My Routines</Link>
            </li>
            <li>
              <Link to="/routines">Routines</Link>
            </li>
         
          </ul>
        </nav>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/myRoutines" element={<MyRoutines />} />
          <Route path="/routines" element={<Routines  />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default App;