import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReminderUpdate {
  title?: string;
  description?: string;
  reminder_date?: Date;
}

const updateReminder = async ({
  id,
  data,
}: {
  id: number;
  data: ReminderUpdate;
}) => {
  const response = await fetch(`/api/reminders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update reminder');
  }

  return response.json();
};

export const useUpdateReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
};
