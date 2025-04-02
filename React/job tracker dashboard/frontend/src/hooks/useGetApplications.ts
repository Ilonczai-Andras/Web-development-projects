import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from '@tanstack/react-query';

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

export const useApplications = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const query = useQuery({
        queryKey: ['applications'],
        enabled: isAuthenticated,
        queryFn: async () => {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:5000/api/applications", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Failed to fetch applications");
            return await response.json() as Application[];
        }
    });

    return query; // contains data, error, isLoading, refetch
}