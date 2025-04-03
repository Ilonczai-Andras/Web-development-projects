import { useAuth0 } from "@auth0/auth0-react";
import { Application } from "../hooks/useGetApplications";

export const useUpdateApplication = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateApplication = async (application: Application) => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch(`http://localhost:5000/api/applications/${application.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(application),
            });

            if (!response.ok) {
                throw new Error("Failed to update application");
            }

            const result = await response.json();
            console.log("[API] Application updated:", result);
            return result;
        } catch (error) {
            console.error("[API] Error updating application:", error);
            throw error;
        }
    };

    return updateApplication;
};

export default useUpdateApplication;
