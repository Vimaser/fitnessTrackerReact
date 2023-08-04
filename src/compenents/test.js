import React, { useState, useEffect, useContext } from "react";
//import axios from "axios";
import { BASE_URL } from "../api"; 
import { AuthContext } from "../authProvider";

function RegisterUserTest() {
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    // Function for making authenticated API requests
    const makeAuthenticatedRequest = async (url, requestData) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authContext.token}`, // Include the Bearer token in the 'Authorization' header
          },
          body: JSON.stringify(requestData),
        });
        
        if (!response.ok) {
          // Handle non-200 status codes (e.g., 401 Unauthorized)
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        // Process the response data
        console.log("RegToken:", authContext.token);
        return data;
      } catch (error) {
        // Handle any errors that occurred during the API call
        throw error;
      }
    };
  
    const handleRegistration = async () => {
      try {
        const registrationData = {
          username: username,
          password: password,
        };
  
        // Make an authenticated API call using the token from the AuthContext
        const response = await makeAuthenticatedRequest(
          "http://fitnesstrac-kr.herokuapp.com/api/users/register",
          registrationData
        );
  
        // Handle the response data if needed
        const token = response.token;
        const message = response.message;
        setMessage(message);
        console.log("Token:", token);
        console.log("mesage:", message)
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error("Error:", error.message);
        setMessage("Error occurred during registration.");
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegistration}>Register</button>
        <p>{message}</p>
      </div>
    );
  }
  
/* 
const RegisterUserTest = () => {
  const [registrationResult, setRegistrationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRegisterClick = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        user: {
          username: "superman27",
          password: "krypt0n0rbust",
        },
      });

      const result = response.data;
      console.log("Registration Result:", result);
      setRegistrationResult(result);
    } catch (error) {
      console.error("Error during registration:", error.message);
      setError("An error occurred during registration.");
    }
  };

  return (
    <div>
      <h1>Test RegisterUser Function</h1>
      <button onClick={handleRegisterClick}>Register User</button>
      {registrationResult && (
        <div>
          <p>Registration Result:</p>
          <pre>{JSON.stringify(registrationResult, null, 2)}</pre>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}; */

export default RegisterUserTest;
