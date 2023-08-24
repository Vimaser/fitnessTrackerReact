import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api";

const MyRoutines = ({ username, token }) => {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newRoutine, setNewRoutine] = useState({
    name: "",
    goal: "",
    isPublic: true,
  });

  useEffect(() => {
    fetchMyRoutines();
  }, [username, token]);

  const fetchMyRoutines = async () => {
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.error || "An error occurred while fetching routines."
        );
        return;
      }

      const routinesData = await response.json();
      setRoutines(routinesData);
    } catch (error) {
      setError("An error occurred while fetching routines.");
    } finally {
      setIsLoading(false);
    }
  };

  const createRoutine = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRoutine),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error);
        return;
      }
      setRoutines([...routines, result]);
      setNewRoutine({ name: "", goal: "", isPublic: true }); // Reset form
    } catch (err) {
      setError(err.message || "An error occurred while creating a routine.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoutine((prevState) => ({ ...prevState, [name]: value }));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div><h2>Please login!</h2>
  <p>Error: {error}</p>;</div>;

  return (
    <div className="container mt-5">
      <h2>Routines for {username}</h2>

      <h3 className="mt-4">Create a New Routine</h3>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Routine Name"
          name="name"
          value={newRoutine.name}
          onChange={handleInputChange}
          className="form-control mt-2"
        />
        <input
          type="text"
          placeholder="Routine Goal"
          name="goal"
          value={newRoutine.goal}
          onChange={handleInputChange}
          className="form-control mt-2"
        />
        <button onClick={createRoutine} className="btn btn-primary mt-2">
          Create Routine
        </button>
      </div>

      {routines.map((routine) => (
        <div key={routine.id} className="card mt-4">
          <div className="card-header">
            <h3>{routine.name}</h3>
          </div>
          <div className="card-body">
            <p>{routine.goal}</p>
            <ul>
              {routine.activity.map((activity) => (
                <li key={activity.id}>
                  {activity.name} - {activity.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRoutines;
