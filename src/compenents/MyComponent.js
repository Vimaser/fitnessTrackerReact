import React, { useState, useEffect, useContext } from 'react';
import { AuthProvider, AuthContext } from '../authProvider';


const MyComponent = () => {
    const { token } = useContext(AuthContext);

    useEffect((() => {
        someFunction(token);
    }, [token]))

    return (
        <div>
            <p>MyComponent content</p>
        </div>
    )
}

export default MyComponent;