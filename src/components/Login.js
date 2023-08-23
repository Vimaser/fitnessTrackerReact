import React, { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../api";

const Login = ({ handleToken, handleUsername }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState('username');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        setError(null);
        console.log("Token:", data.token);
        console.log("User:", data.user.username);
        
        if (user) {
          console.log("User:", user.username);
          console.log("UserID", user.id);
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.user.username);
          handleToken(data.token);
          handleUsername(data.user.username);
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
        setToken("");
        setUser(null);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
      setToken("");
      setUser(null);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {user && (
        <div>
          <p>Welcome back {user.username}! Let's get FIT!</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
    