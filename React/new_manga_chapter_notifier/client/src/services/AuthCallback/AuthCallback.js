import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            console.log('Authorization Code:', code);
            // Optionally, proceed to exchange the code for an access token
            // and navigate to the desired page.
        } else {
            console.error('Authorization code not found');
        }

        // Navigate to the homepage or another page after handling the code
        navigate('/');
    }, [navigate]);

    return (
        <div>
            <h1>Processing Authorization...</h1>
        </div>
    );
}

export default AuthCallback;
