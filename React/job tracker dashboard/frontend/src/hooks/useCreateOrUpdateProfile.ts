import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const useCreateOrUpdateProfile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        const syncProfile = async () => {
            try {
                const token = await getAccessTokenSilently();

                // 1. Get existing profile
                const res = await fetch('http://localhost:5000/api/profiles', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.status === 404) {
                    // 2. Create profile if not found
                    console.log("[Profile] No profile found. Creating...");
                    await createOrUpdate(token);
                } else if (res.ok) {
                    const existing = await res.json();

                    // 3. Check if data differs
                    if (existing.name !== user.name || existing.email !== user.email || existing.picture !== user.picture) {
                        console.log("[Profile] Differences detected. Updating...");
                        await createOrUpdate(token);
                    } else {
                        console.log("[Profile] Profile is up to date.");
                    }
                }
            } catch (err) {
                console.error("Profile sync error:", err);
            }
        };

        const createOrUpdate = async (token: string) => {
            await fetch('http://localhost:5000/api/profiles', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                })
            });
        };

        syncProfile();
    }, [isAuthenticated, user, getAccessTokenSilently]);
};

export default useCreateOrUpdateProfile;
