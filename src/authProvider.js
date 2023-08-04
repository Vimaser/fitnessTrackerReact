/* import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token)
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token')
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }; */

// authProvider.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (token) => {
        console.log('Setting token:', token); 
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        console.log('Clearing token'); 
        setToken(null);
        localStorage.removeItem('token');
    };

    console.log('Current token:', token); 

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };


