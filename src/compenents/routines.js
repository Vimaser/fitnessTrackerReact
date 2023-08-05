import React, { useState, useEffect } from 'react';
import { AuthContext } from "../authProvider";
import { BASE_URL } from "../api";


const Routines = () => {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        fetchPublicRoutines();
    }, []);

    const fetchPublicRoutines = async () => {
        try {
            const response = await fetch(`${BASE_URL}/routines`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch routines')
            }
      const data = await response.json();
      setRoutines(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
        <h2>Routines</h2>
        {routines.length === 0 ? (
  <p>No public routines found.</p>
) : (
  routines.map((routine) => (
    <div key={routine.id}>
      <h3>{routine.name}</h3>
      <p>{routine.goal}</p>
      <p>Creator: {routine.creatorName}</p>
      <p>Activities:</p>
      <ul>
        {routine.activity && routine.activity.map((act) => ( // Add a check for routine.activity
          <li key={act.id}>
            {act.name} - {act.description} (Duration: {act.duration} minutes, Count: {act.count})
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