import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Callback() {
    const location = useLocation();
    const navigate = useNavigate();

    // Generate or retrieve the stored code verifier
    const codeVerifier = localStorage.getItem('code_verifier');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const authorizationCode = queryParams.get('code');
    
        if (authorizationCode) {
            axios.post('http://localhost:8080/api/token', {
                authorizationCode,
                codeVerifier
            })
            .then(response => {
                const { access_token, expires_in , refresh_token, token_type } = response.data;
                //access_token
                if(localStorage.getItem('access_token') == null)
                {
                    localStorage.setItem('access_token', access_token)
                }
                //expires_in
                if (localStorage.getItem('expires_in') == null) {
                    const today = new Date();
                    
                    const expirationDate = new Date(today.setDate(today.getDate() + 30));
                    
                    localStorage.setItem('expires_in', expirationDate.toISOString());
                }
                //refresh_token
                if(localStorage.getItem('refresh_token') == null)
                {
                    localStorage.setItem('refresh_token', refresh_token)
                }
                //token_type
                localStorage.setItem('token_type', token_type);
                
                window.opener.postMessage(access_token, window.location.origin);
                window.close();  // Close the AuthCallback window
            })
            .catch(error => {
                console.error('Error generating token:', error.response ? error.response.data : error.message);
            });
        }
        navigate('/');
    }, [location, navigate]);
    

    return <div>Authenticating...</div>;
}

export default Callback;
