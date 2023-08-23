import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api";

const Activities = () => {
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    const [activities, setActivities] = useState([]);
    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${BASE_URL}/activities`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setActivities(data);
            } catch (err) {
                console.error(err);
                setErrorMessage("Failed to fetch activities");
            }
        };

        fetchActivities();
    }, []);

    const handleCreateActivity = async () => {
      try {
          const response = await fetch(`${BASE_URL}/activities`, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${storedToken}`
              },
              body: JSON.stringify({
                  name: activityName,
                  description: activityDescription
              })
          });
  
          const result = await response.json();
  
          if (response.ok) {
              setActivities([...activities, result]);
              setActivityName(''); 
              setActivityDescription('');
          } else {
              setErrorMessage(result.error || "Failed to create the activity.");
          }
      } catch (err) {
          console.error(err);
          setErrorMessage("An error occurred while creating the activity.");
      }
  };
  
  const handleUpdateActivity = async (activityId) => {
      try {
          const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${storedToken}`
              },
              body: JSON.stringify({
                  name: activityName, 
                  description: activityDescription 
              })
          });
  
          const result = await response.json();
  
          if (response.ok) {
              setActivities(activities.map(activity => activity.id === activityId ? result : activity));
              setActivityName('');
              setActivityDescription('');
          } else {
              setErrorMessage(result.error || "Failed to update the activity.");
          }
      } catch (err) {
          console.error(err);
          setErrorMessage("An error occurred while updating the activity.");
      }
  };
  
  const handleViewRoutines = async (activityId) => {
      try {
          const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          const result = await response.json();
  
          if (response.ok) {
              console.log(result);
          } else {
              setErrorMessage(result.error || "Failed to fetch routines for the activity.");
          }
      } catch (err) {
          console.error(err);
          setErrorMessage("An error occurred while fetching routines for the activity.");
      }
  };
  
    return (
        <div>
            <h1>My Profile</h1>
            <h2>Welcome, {storedUsername}!</h2>
            <h2>Activities</h2>
            {activities.map(activity => (
                <div key={activity.id}>
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                    <button onClick={() => handleViewRoutines(activity.id)}>View Routines</button>
                    <button onClick={() => handleUpdateActivity(activity.id)}>Update</button>
                </div>
            ))}

            <h2>Create New Activity</h2>
            <input
                value={activityName}
                onChange={e => setActivityName(e.target.value)}
                placeholder="Activity Name"
            />
            <input
                value={activityDescription}
                onChange={e => setActivityDescription(e.target.value)}
                placeholder="Activity Description"
            />
            <button onClick={handleCreateActivity}>Create Activity</button>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Activities;

  