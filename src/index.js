import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AuthProvider, AuthContext } from './authProvider';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
        <App />
        </AuthProvider>
    </React.StrictMode>,
    document.querySelector('.app') 
);
