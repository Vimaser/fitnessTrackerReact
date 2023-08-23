import React, { useState } from "react";
import { BASE_URL } from "../api";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegistration = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      console.log("Sending registration request...");
      const response = await fetch(`${BASE_URL}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log("Received response:", response);
      setUsername()

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        setError(errorData.error || "An error occurred during registration.");
      } else {
        const responseData = await response.json();
        console.log("Response data:", responseData);

        if (!responseData || typeof responseData.token !== "string") {
          setError("Unexpected response data received during registration.");
        } else {
          console.log("Registration successful");
          const newToken = responseData.token;
          console.log("Token:", newToken);

          console.log("Calling handleToken with new token:", newToken);
          handleToken(newToken);
          handleUsername(user.username);
        }
      }
    } catch (error) {
      console.log("Error during registration:", error);
      setError("An error occurred during registration. Please try again...");
    }

    setIsLoading(false);
  };  

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleRegistration}>
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
            required
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      {error && <p>{String(error)}</p>}
    </div>
  );
};

export default RegistrationPage;
