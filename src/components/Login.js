import React, { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../api";

const Login = ({ handleToken, handleUsername }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("username");
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
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          {user && (
            <div className="mt-4">
              <p className="text-success">
                Welcome back {user.username}! Let's get FIT!
              </p>
            </div>
          )}
          {error && <p className="mt-2 text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
