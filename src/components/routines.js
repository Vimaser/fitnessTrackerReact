import React, { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../api";

const Routines = ({ token, username }) => {
  const [routines, setRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    console.log("Token in Routines component:", token);
    fetchPublicRoutines();
  }, [token]);

  const fetchPublicRoutines = async () => {
    try {
      const response = await fetch(`${BASE_URL}routines`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch routines");
      }
      const data = await response.json();
      setRoutines(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateRoutine = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to create routine: ${responseData.message}`);
      }

      fetchPublicRoutines();

      setName("");
      setGoal("");
      setIsPublic(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Routines</h2>
      <form onSubmit={handleCreateRoutine} className="mb-4">
        <div className="form-group">
          <label htmlFor="routineName">Routine Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="routineName"
            placeholder="Enter routine name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="routineGoal">Routine Goal:</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="form-control"
            id="routineGoal"
            placeholder="Enter routine goal"
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="form-check-input"
            id="publicRoutineCheck"
          />
          <label className="form-check-label" htmlFor="publicRoutineCheck">
            Public Routine
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Create Routine
        </button>
      </form>

      {routines.length === 0 ? (
        <p>No public routines found.</p>
      ) : (
        routines.map((routine) => (
          <div key={routine.id} className="mb-5">
            <h3>{routine.name}</h3>
            <p>{routine.goal}</p>
            <p>
              <strong>Creator:</strong> {routine.creatorName}
            </p>
            <p>
              <strong>Activities:</strong>
            </p>
            <ul>
              {routine.activity &&
                routine.activity.map((act) => (
                  <li key={act.id}>
                    {act.name} - {act.description} (Duration: {act.duration}{" "}
                    minutes, Count: {act.count})
                  </li>
                ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Routines;
