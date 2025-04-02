import { useAuth0 } from "@auth0/auth0-react";

export type ApplicationData = {
    title: string;
    description: string;
    company: string;
    status: "todo" | "inprogress" | "interview" | "done";
    link: string;
    deadline: string;
};

export const useCreateApplication = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createApplication = async (data: ApplicationData) => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch("http://localhost:5000/api/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to create application");
            }

            const result = await response.json();
            console.log("[API] Application created:", result);
            return result;
        } catch (error) {
            console.error("[API] Error creating application:", error);
            throw error;
        }
    };

    return createApplication;
};

export default useCreateApplication;
