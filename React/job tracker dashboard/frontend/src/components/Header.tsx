import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export const Header = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) return;

        const createOrUpdateProfile = async () => {
            try {
                const token = await getAccessTokenSilently();
                console.log(user?.email);
                

                // Check if user data exists (e.g., name, email, picture)
                if (user) {
                    // Send the JWT and user info to the backend
                    const response = await fetch('http://localhost:5000/api/profiles', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                            picture: user.picture,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to create/update profile');
                    }

                    const profile = await response.json();
                    console.log('Profile created/updated:', profile);
                }
            } catch (err) {
                console.error('Error creating/updating profile:', err);
            }
        };

        createOrUpdateProfile(); // Call the function to create or update the profile
    }, [isAuthenticated, user, getAccessTokenSilently]);

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
            <h2 className="text-[1.3rem]">Job Tracker Dashboard</h2>
            <div className="flex items-center gap-4">
                {isAuthenticated && user && <span>👤 {user.name}</span>}
                <LoginButton />
                <LogoutButton />
            </div>
        </header>
    );
};
