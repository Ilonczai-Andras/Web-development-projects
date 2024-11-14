import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from '../../services/AuthContext/AuthContext'

function AuthorisationComponent() {
    const { user, loginUser, logoutUser} = useAuth();

    useEffect(() => {

        console.log('AuthorisationComponent Init');

        checkTokenAndFetchUserInfo();
    }, []);

    const checkTokenAndFetchUserInfo = async () => {
        const expires_in = localStorage.getItem('expires_in');
        const refreshToken = localStorage.getItem('refresh_token');

        if (expires_in && refreshToken) 
        {
            const currentTime = new Date().toISOString();

            if (currentTime >= parseInt(expires_in, 10)) 
            {
                console.log('Access token expired. Refreshing...');
                try {
                    //TODO refresh access_token
                    refreshAccessToken()
                } catch (error) {
                    console.error("Failed to refresh access token:", error);
                    return;
                }                
            } 
            else 
            {
                const token = localStorage.getItem('access_token');
                if (token) 
                {
                    console.log('Access token is valid. Fetching user info...');
                    
                    const profile = await gettingUserProfile(token);
                    loginUser(profile);
                }
            }
        }
    };

    async function gettingUserProfile(accessToken) {
        try {
            const response = await axios.post('http://localhost:8080/api/myanimelist/user', { accessToken });
            return response.data; // Return the data here
        } catch (error) {
            console.error('Error getting user profile:', error.response ? error.response.data : error.message);
            throw error; // Re-throw the error so the caller can handle it
        }
    }
    
    function getNewCodeVerifier() {
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    
    //refresh access_token
    function refreshAccessToken()
    {
        //TODO
        //loginUser(profile);
    }

    //OpenAuthCallback
    function OpenAuthCallback(codeChallenge) {
        const clientID = process.env.REACT_APP_CLIENT_ID;
    
        const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientID}&code_challenge=${codeChallenge}`;
        const authWindow = window.open(url, '_blank', 'width=700,height=700');

        window.addEventListener('message', (event) => {
            if (event.origin === window.location.origin) {
                const token = event.data;
                if (token) {
                    authWindow.close();
                }
            }
        });
    }

    //login
    const handleLogin = async () => {
        const codeVerifier = getNewCodeVerifier();
        localStorage.setItem('code_verifier', codeVerifier);
        const codeChallenge = codeVerifier;
    
        OpenAuthCallback(codeChallenge);
    
        window.addEventListener('message', async (event) => {
            if (event.origin === window.location.origin) {
                const token = event.data; // Assuming token is returned
                if (token) {
                    localStorage.setItem('access_token', token);
    
                    try {
                        const profile = await gettingUserProfile(token); // Fetch user profile
                        loginUser(profile); // Update context
                    } catch (error) {
                        console.error('Error logging in:', error);
                    }
                }
            }
        });
    };
    
    //logout
    const handleLogout = () => 
    {
        //TODO
        logoutUser();
    };

    return (
        <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white z-10">
            <div className="flex items-center space-x-2">
                <img
                    src={user ? user.picture : "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div className="text-lg font-semibold">
                    {user ? user.name : 'Guest'}
                </div>
            </div>
            <div className="text-lg font-semibold cursor-pointer hover:text-gray-300" onClick={user ? handleLogout : handleLogin}>
                {user ? 'Logout' : 'Login'}
            </div>
        </header>
    );
}

export default AuthorisationComponent;
