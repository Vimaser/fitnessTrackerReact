import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api";


const MyProfile = ({ token }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      console.log("Received token in MyProfile component:", token);
        const fetchUserData = async () => {
          try {
            const response = await fetch(`${BASE_URL}users/me`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });
    
            if (!response.ok) {
              const errorData = await response.json();
              setError(errorData.error || "An error occurred while fetching user data.");
            } else {
              const userData = await response.json();
              setUserData(userData);
            }
          } catch (error) {
            setError("An error occurred while fetching user data.");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchUserData();
      }, [token]);
    
      if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
    
      if (!userData) {
        return null; 
      }
    
      return (
        <div>
          <h2>User Profile</h2>
          <p>ID: {userData.id}</p>
          <p>Username: {userData.username}</p>
        </div>
      );
    };
    
    export default MyProfile;