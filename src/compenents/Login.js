import React, { useState, useEffect, useContext } from 'react';
import { AuthProvider, AuthContext } from '../authProvider';
import { BASE_URL } from '../api';

const Login = () => {
    return (
        <div>
            <h2>Login</h2>
        </div>
    )
}
/* 
const Login = () => {
    const token = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState("");
    const [error, setError] = useState(null);

    const login = useContext(token, username);
    
    const setToken = (token) => { 
        setLocalToken(authContext);
        localStorage.setItem('token', token)
    };

    const loginUser = async (username, password) => {
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    `Content-Type`: 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username,
                        password,
                    },
                }),
            });
            const result = await response.json();
            if (response.ok) {
                login(result.data.token);
                fetchUserData(result.data.token);
                set
            }
        } catch (error) {
            
        }
    }
    return (
        <div>
            <h2>Login</h2>
        </div>
    )
}; */

export default Login;