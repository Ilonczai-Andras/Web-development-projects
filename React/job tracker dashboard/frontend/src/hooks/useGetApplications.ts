import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

// Types
export interface Application {
    id: number;
    title: string;
    description: string;
    company: string;
    status: "todo" | "inprogress" | "interview" | "done";
    link: string;
    deadline: string;
    created_at: string;
    updated_at: string;
}

export const useGetApplications = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchApplications = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = await getAccessTokenSilently();

                const response = await fetch("http://localhost:5000/api/applications", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch applications");
                }

                const data = await response.json();
                setApplications(data);

            } catch (err: any) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [isAuthenticated, getAccessTokenSilently]);

    return { applications, loading, error };
};
