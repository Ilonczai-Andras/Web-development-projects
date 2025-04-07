import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";

const createOrUpdateProfile = async (token: string) => {
    const res = await fetch('http://localhost:5000/api/profiles', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

  if (!res.ok) {
    throw new Error("Failed to create or update profile");
  }

  return res.json();
};

const useCreateOrUpdateProfile = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently();
      return createOrUpdateProfile(token);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      mutation.mutate();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return mutation;
};

export default useCreateOrUpdateProfile;
