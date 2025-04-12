import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reminder } from "./useGetReminders";
import { useAuth0 } from '@auth0/auth0-react';

const useUpdateReminder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reminder: Reminder) => {
      const token = await getAccessTokenSilently();

      const res = await fetch(
        `http://localhost:5000/api/reminders/${reminder.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reminder),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update application");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
};

export default useUpdateReminder;
