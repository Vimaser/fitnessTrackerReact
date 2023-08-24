import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api";

const Activities = () => {
  const storedUsername = localStorage.getItem("username");
  const storedToken = localStorage.getItem("token");
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${BASE_URL}/activities`, {
          headers: {
            "Content-Type": "application/json",
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
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setActivities([...activities, result]);
        setActivityName("");
        setActivityDescription("");
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
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setActivities(
          activities.map((activity) =>
            activity.id === activityId ? result : activity
          )
        );
        setActivityName("");
        setActivityDescription("");
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
      const response = await fetch(
        `${BASE_URL}/activities/${activityId}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(result);
      } else {
        setErrorMessage(
          result.error || "Failed to fetch routines for the activity."
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "An error occurred while fetching routines for the activity."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Profile</h1>
      <h2 className="mb-3">Welcome, {storedUsername}!</h2>

      <h2 className="mb-3">Activities</h2>
      {activities.map((activity) => (
        <div key={activity.id} className="mb-4">
          <h3>{activity.name}</h3>
          <p>{activity.description}</p>
          <button
            className="btn btn-info mr-2"
            onClick={() => handleViewRoutines(activity.id)}
          >
            View Routines
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleUpdateActivity(activity.id)}
          >
            Update
          </button>
        </div>
      ))}

      <h2 className="mb-3">Create New Activity</h2>
      <div className="form-group">
        <input
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Activity Name"
          className="form-control mb-2"
        />
        <input
          value={activityDescription}
          onChange={(e) => setActivityDescription(e.target.value)}
          placeholder="Activity Description"
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={handleCreateActivity}>
          Create Activity
        </button>
      </div>

      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
    </div>
  );
};

export default Activities;
