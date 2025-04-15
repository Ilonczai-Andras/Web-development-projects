import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { Application } from "./types";

const fetchApplications = async (token: string): Promise<Application[]> => {
  const res = await fetch("http://localhost:5000/api/applications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }

  return res.json();
};

export const useApplications = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return await fetchApplications(token);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
