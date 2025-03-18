import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = createContext(undefined);

const UserContextProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (data) => {
        //set cookie
        Cookies.set('session', data.token, { expires: 7 })
        setAuthToken(data.token)
        //set user data
        setUser(data.user)

        setLoggedIn(true)
    }

    const logout = () => {
        Cookies.remove('session')
        setAuthToken(null)
        setUser(null)
        setLoggedIn(false)
    }

    const updateUserData = (data) => {
        setUser(data)
    }

    const contextValue = {
        loggedIn,
        authToken,
        user,
        login,
        logout,
        setAuthToken,
        updateUserData,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;