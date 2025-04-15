import {ReminderCreateInput} from "./types";
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReminder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReminderCreateInput) => {
      const token = await getAccessTokenSilently();

      const response = await fetch("http://localhost:5000/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create reminder");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
};

export default useCreateReminder;
