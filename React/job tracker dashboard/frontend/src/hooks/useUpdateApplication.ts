import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Application } from "./useGetApplications";

const useUpdateApplication = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: Application) => {
      const token = await getAccessTokenSilently();

      const res = await fetch(
        `http://localhost:5000/api/applications/${application.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(application),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update application");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export default useUpdateApplication;
