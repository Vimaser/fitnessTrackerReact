import React, { useState, useContext } from "react";
import { AuthContext } from "../authProvider";
import { BASE_URL } from "../api";


const RegistrationPage = () => {
  const { login } = useContext(AuthContext); // Use only the login function from the AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegistration = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });

      const result = await response.json();
      console.log(result);

      setIsLoading(false); // Reset loading state after successful response

      if (response.ok) {
        // If registration is successful, use the login function to set the token in the AuthContext
        login(result.data.token);
        // Optionally, you can perform additional actions upon successful registration.
        // For example, redirect the user to another page.
      } else {
        setError(result.error.message || "An error occurred during registration.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during registration."); // Set error message in state
      setIsLoading(false); // Reset loading state after error
    }
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



/* const RegistrationPage = () => {
  const { token, login, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegistration = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          }
        }),
      });

      const result = await response.json();
      console.log(result);
      setIsLoading(false); // Reset loading state after successful response
      // Handle successful registration here, e.g., redirect to a new page, update context, etc.
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during registration."); // Set error message in state
      setIsLoading(false); // Reset loading state after error
    }
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
}; */

/* const RegistrationPage = () => {
  const authContext = useContext(AuthContext);
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
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authContext.token}`, // Include the Bearer token in the 'Authorization' header
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      console.log("Received response:", response);

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
          // You can also store the token in the state or local storage for further use.
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
};  */


/* const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleRegistration = async (e) => {
      e.preventDefault();
  
      try {
        const data = await registerUser(username, password);
        setMessage(data.message); // Assuming the response has a "message" property
        // You can also store the token in the state or local storage for further use.
      } catch (error) {
        setMessage(error.message);
      }
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
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    );
  }; */
          

/*   const registerUser = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: 'superman27',
            password: 'krypt0n0rbust'
          }
        })
      });
      const result = await response.json();
      // As written below you can log your result
      // to check what data came back from the above code.
      console.log(result)
      return result
    } catch (err) {
      console.error(err);
    }
  } */

export default RegistrationPage;
